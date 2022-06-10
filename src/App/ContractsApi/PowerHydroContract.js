import Power from './PowerContract';

class PowerHydro extends Power {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      'Hydro',
      'HUMAN',
    );
  }
}

export default PowerHydro;
