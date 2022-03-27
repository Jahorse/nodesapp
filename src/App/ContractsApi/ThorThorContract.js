import Thor from './ThorContract';

class ThorThor extends Thor {
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

export default ThorThor;
