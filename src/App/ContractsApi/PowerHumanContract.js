import PowerContract from './PowerContract';

class PowerHumanContract extends PowerContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x928a833b65d967fb0b785ecdce6ccf1a867f3c28',
      'Human',
    );
  }
}

export default PowerHumanContract;
