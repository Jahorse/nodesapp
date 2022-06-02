import Thor from './ThorContract';

class ThorOdin extends Thor {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x9c0200f3e9673bcfe6d80076aa976f446d74758a',
      'Odin',
    );
  }
}

export default ThorOdin;
