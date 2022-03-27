import Power from './PowerContract';

class PowerWind extends Power {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0xFb717Be387F0FAB42A55772ef5CC55B4c324DabD',
      'Wind',
    );
  }

  async claimAll() {
    Power.prototype.claimAllTier.call(this, 'FLATVERSAL');
  }
}

export default PowerWind;
