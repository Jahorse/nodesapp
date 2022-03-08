import PowerContract from './PowerContract';

class PowerWindContract extends PowerContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0xFb717Be387F0FAB42A55772ef5CC55B4c324DabD',
      'Wind',
    );
  }

  async claimAll() {
    PowerContract.prototype.claimAllTier.call(this, 'FLATVERSAL');
  }
}

export default PowerWindContract;
