import ThorContract from './ThorContract';

class ThorThorContract extends ThorContract {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x37da69aa9b436d3bf6cc7530e11ef98a5a052441',
      'Thor',
      87,
    );
  }
}

export default ThorThorContract;
