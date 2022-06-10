import Power from './PowerContract';

class PowerNuclear extends Power {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      'Nuclear',
      'SUPERHUMAN',
    );
  }
}

export default PowerNuclear;
