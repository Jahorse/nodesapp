import * as ethers from 'ethers';
import { emitCustomEvent } from 'react-custom-events';
import axios from 'axios';

import abi from './abi/louverture';
import Contract from './Contract';
import { getPriceCg } from '../Utils/pricing';

class Louverture extends Contract {
  metadata = {
    name: 'Louverture',
    symbol: 'LVT',
    networkName: 'Avalanche',
    decimals: 4,
    claimSupport: true,
    hasCompound: true,
    appLink: 'https://www.louverture.finance/blackhole',
    chartLink: 'https://dexscreener.com/avalanche/0xb16471a1c2e24c325151eaceb5543747787cd811',
    swapLink: 'https://traderjoexyz.com/trade?outputCurrency=0xd641e62525e830e98cb9d7d033a538a1f092ff34#/',
  };
  elementTypes = {
    0: "Meteorite",
    1: "Titanium",
    2: "Dark Matter",
    3: "Cobalt",
    4: "Blackhole",
    5: "Orb"
  };
  contractAddress = '0xDb01eCA08E4cA5e7023Ea207d7727Dcb618eF1ee';

  constructor(provider, walletAddresses) {
    super(provider, walletAddresses, 'Avalanche');

    this.fetchPromise = this.fetchNodes().then(n => this.nodes = n);
  }

  async getPriceUsd() {
    return await getPriceCg('louverture');
  }

  getTotalRewards(nodes, compounding) {
    let rewards = 0;
    for (const node of nodes) {
        rewards += parseFloat(node['rewards']);
    }

    return rewards;
  }

  async compoundAll() {
    if (!this.signer) {
      console.error('Tried calling LouvertureContract.compoundAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.compound(this.nodes.map(n => n.id));
  }

  async claimAll() {
    if (!this.signer) {
      console.error('Tried calling LouvertureContract.claimAll() without a valid signer.');
      return null;
    }
    const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
    return contract.claim(this.nodes.map(n => n.id));
  }

  async fetchNodes() {
    const contract = new ethers.Contract(this.contractAddress, abi, this.jsonRpcProvider);

    const nodes = [];
    for (const walletAddress of this.walletAddresses) {
      const url = `https://deep-index.moralis.io/api/v2/${walletAddress}/nft?chain=avalanche&format=decimal&token_addresses=0x023a1EafC590d790FaBD1D00872881C2a9E3C74A`
      try {
        const resp = await axios.get(url, {headers: {'x-api-key': '4hW8gnEfM0sDiVMUWZ4r0MJWKvLJ4pxgC4oEJL9h2Wb8kXIVkDUdOkxSvtJdMmeI'}})
          .then(r => r.data.result);

        for (const nodeRaw of resp) {
          const tokenId = parseInt(nodeRaw.token_id);
          const metadata = await contract.getMeta(tokenId);

          const createTime = await this.jsonRpcProvider.getBlock(parseInt(nodeRaw.block_number_minted)).then(b => b.timestamp);
          const lastProcessingTime = new Date(parseInt(metadata.lastClaimTime.toHexString(), 16) * 1000);
          const nextProcessingTime = new Date(lastProcessingTime * 1000);
          nextProcessingTime.setHours(nextProcessingTime.getHours() + 24);

          const reward = await contract.getPendingReward(tokenId);
          const compound = await contract.getCompound(tokenId);
          const metadataRaw = JSON.parse(nodeRaw.metadata);

          nodes.push({
            id: tokenId,
            name: metadata.name,
            rewards: +reward / 1e18,
            creationTime: new Date(createTime * 1000),
            lastProcessingTime,
            nextProcessingTime: nextProcessingTime.getTime() / 1000,
            description: metadataRaw.description,
            amount: parseInt(metadata.amount.toHexString()) / 1e18,
            tier: parseInt(metadata.tier.toHexString()),
            compound: parseInt(metadata.compound.toHexString()),
            rarity: metadata.rarity,
            tokenType: this.elementTypes[metadata.tokenType],
            tax: parseInt(compound._tax.toHexString(), 16) / 1e18,
          });
        }
      } catch (e) {
        console.log('ERR', e);
      }
    }

    if (nodes.length > 0) {
      emitCustomEvent('avalanche-node', undefined);
    }
    return nodes;
  }
}

export default Louverture;
