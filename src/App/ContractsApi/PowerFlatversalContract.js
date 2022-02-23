import PowerContract from './PowerContract';

class PowerFlatversalContract extends PowerContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x0033FA9888028dD4BC5905241cbf312a8d0b21B3',
      'Flatversal',
    );
  }
}

export default PowerFlatversalContract;
