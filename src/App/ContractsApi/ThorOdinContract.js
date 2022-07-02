import Thor from './ThorContract';

class ThorOdin extends Thor {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x769fc7a85437AdA05dE2C4bDa6220D18ce1F7549',
      'Odin',
    );
  }
}

export default ThorOdin;
