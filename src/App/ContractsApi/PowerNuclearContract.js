import Power from './PowerContract';

class PowerNuclear extends Power {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0xC8007751603bB3E45834A59af64190Bb618b4a83',
      'Nuclear',
    );
  }

  async claimAll() {
    Power.prototype.claimAllTier.call(this, 'SUPERHUMAN');
  }
}

export default PowerNuclear;
