import ThorContract from './ThorContract';

class ThorFreyaContract extends ThorContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x79190a9c108f6cc1ce956ea8f7ba03cd4e3260b9',
      'Freya'
    );
  }
}

export default ThorFreyaContract;
