import Thor from './ThorContract';

class ThorHeimdall extends Thor {
  constructor(provider, walletAddresses) {
    super(
      provider,
      walletAddresses,
      '0x7694D6b76D64bB89920b3Cb7156c7dE2b00b0c79',
      'Heimdall',
    );
  }
}

export default ThorHeimdall;
