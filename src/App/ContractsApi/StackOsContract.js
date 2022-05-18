import * as ethers from 'ethers';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

import { royaltiesAbi, subscriptionAbi } from './abi/stack-os';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

const firebaseConfig = {
  apiKey: "AIzaSyB6cYfL05ziJ1WZLLVojKOr_eSdHRlAWk8",
  appId: "1:8712672313:web:daaacfbdf50245ce16e9e8",
  authDomain: "stackos-nft-mainnet.firebaseapp.com",
  messagingSenderId: "8712672313",
  projectId: "stackos-nft-mainnet",
  storageBucket: "stackos-nft-mainnet.appspot.com",
};

class StackOs extends Contract {
  metadata = {
    name: 'StackOS',
    symbol: 'STACK',
    networkName: 'Polygon',
    decimals: 2,
    claimSupport: false,
    hasCompound: false,
    appLink: 'https://www.home.stackos.io/nodes',
    chartLink: 'https://dexscreener.com/polygon/0x9ae7cbe16ba387101048b6da1f2b11604a4ab253',
    swapLink: 'https://exchange.dfyn.network/#/swap?outputCurrency=0x980111ae1b84e50222c8843e3a7a038f36fecd2b',
  };
  subscription0Contract = '0xD9A26c042b51eC5D54222e17629e4c4b4Be6A8DD';
  subscription1PlusContract = '0x58e49a747afCF7fb6d551AAb06EF592485e3E01d';
  royaltiesContractAddress = '0x5b9E5461313881518B62800d58D59C4f3B3d0ce7';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Polygon');

    this.initNodes();
  }

  async getPriceUsd() {
    return await getPriceCg('stackos');
  }

  getTotalRewards() {
    let rewards = 0;
    for (const node of this.nodes) {
      rewards += node.rewards;
      rewards += node.bonus;
      rewards += node.royalties;
    }

    return rewards;
  }

  async compoundAll() {
    console.error('StackOs has no compoundAll().');
    return null;
  }

  async claimAll() {
    console.error('StackOs has no claimAll().');
    return null;
  }

  async fetchNodes() {
    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const collectionRef = collection(db, 'generation');
        const q = query(collectionRef);
        const querySnap = await getDocs(q);
        const generationList = querySnap.docs.map(d => d.data());
        const genTokenAddressToId = Object.fromEntries(generationList
          .map(g => [g.genAddress, g.genId]));

        const url = 'https://upnhjiwrcp2x.usemoralis.com:2053/server/functions/getNFTs_old';

        const nodesRaw = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            address: walletAddress,
            chain: 'matic',
            _ApplicationId: '8RIlQgep1V8Z4K4QGRB8Zpwn2ocvKDXigRYfIcng',
            _ClientVersion: 'js1.4.0',
          }),
        }).then(r => r.json());

        for(const nodeRaw of nodesRaw.result) {
          const genId = genTokenAddressToId[nodeRaw.token_address];
          if (genId === undefined) {
            continue;
          }
          const tokenId = parseInt(nodeRaw.token_id);

          const contractAddress = genId === 0 ? this.subscription0Contract : this.subscription1PlusContract;
          const subscriptionContract = new ethers.Contract(contractAddress, subscriptionAbi, this.jsonRpcProvider);
          const royaltiesContract = new ethers.Contract(this.royaltiesContractAddress, royaltiesAbi, this.jsonRpcProvider);

          const rewards = parseInt((await subscriptionContract.pendingReward(genId, [tokenId])).toHexString(), 16) / 1e18;
          const bonus = await subscriptionContract.pendingBonus(genId, tokenId);
          let royalties;
          try {
            royalties = parseInt((await royaltiesContract.pendingRoyalty(genId, [tokenId])).toHexString(), 16) / 1e18;
          } catch (e) {
            if (!e.reason.includes('Still first cycle')) {
              throw e;
            }
            royalties = 0;
          }
          nodes.push({
            id: tokenId,
            name: nodeRaw.name,
            nextProcessingTime: Date.now(),
            rewards,
            bonus: parseInt(bonus.unlocked.toHexString(), 16) / 1e18,
            royalties,
          });
        }
      } catch (e) {
        console.log('ERR', e);
      }
    }

    return nodes;
  }
}

export default StackOs;
