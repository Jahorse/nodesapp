import Thor from './ThorContract';

class ThorFreya extends Thor {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x05e946Cc06Cd49b5957Ea2096cb57353313E3F0D',
      'Freya',
    );
  }
}

export default ThorFreya;
