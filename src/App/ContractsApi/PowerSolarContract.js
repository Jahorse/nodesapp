import Power from './PowerContract';

class PowerSolar extends Power {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x0033FA9888028dD4BC5905241cbf312a8d0b21B3',
      'Solar',
    );
  }

  async claimAll() {
    Power.prototype.claimAllTier.call(this, 'MICROSCOPIC');
  }
}

export default PowerSolar;
