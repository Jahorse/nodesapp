import PowerContract from './PowerContract';

class PowerSuperhumanContract extends PowerContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0xC8007751603bB3E45834A59af64190Bb618b4a83',
      'Superhuman'
    );
  }
}

export default PowerSuperhumanContract;
