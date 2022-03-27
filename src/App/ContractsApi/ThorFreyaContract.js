import Thor from './ThorContract';

class ThorFreya extends Thor {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x79190a9c108f6cc1ce956ea8f7ba03cd4e3260b9',
      'Freya',
      125,
    );
  }
}

export default ThorFreya;
