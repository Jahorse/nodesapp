import PowerContract from './PowerContract';

class PowerMicroscopicContract extends PowerContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0xFb717Be387F0FAB42A55772ef5CC55B4c324DabD',
      'Flatversal'
    );
  }
}

export default PowerMicroscopicContract;
