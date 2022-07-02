import Thor from './ThorContract';

class ThorThor extends Thor {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x349Cb36d6E3de4E9Ce7FbF9949c003974eb556CA',
      'Thor',
    );
  }
}

export default ThorThor;
