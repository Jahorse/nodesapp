import PowerContract from './PowerContract';

class PowerHydroContract extends PowerContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x928a833b65d967fb0b785ecdce6ccf1a867f3c28',
      'Hydro',
    );
  }

  async claimAll() {
    PowerContract.prototype.claimAllTier.call(this, 'HUMAN');
  }
}

export default PowerHydroContract;
