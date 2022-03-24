import { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import $ from 'jquery';

const WalletAddressModal = (props) => {
  const cookies = props.cookies;
  const setCookie = props.setCookie;
  const profileName = props.profileName;
  const profile = cookies.profiles[profileName];
  const [modalOpen, setToggleModal] = useState(false);
  const [addressInput, setAddressInput] = useState('');
  const [networkInput, setNetworkInput] = useState({
    'Avalanche': false,
    'Cronos': false,
    'Ethereum': false,
    'Fantom': false,
    'Polygon': false,
  });

  if (!cookies.profiles) {
    setCookie('profiles', []);
  }

  const toggleModal = () => {
    setAddressInput('');
    setNetworkInput({
      Avalanche: false,
      Cronos: false,
      Ethereum: false,
      Fantom: false,
      Polygon: false,
    });
    setToggleModal(!modalOpen);
  }

  const addWalletAddress = () => {
    if (!addressInput.startsWith('0x') && addressInput.length < 42) {
      return;
    }
    if (!Object.values(networkInput).some((n) => n === true)) {
      return;
    }

    if (networkInput.Avalanche && !profile.walletAddresses.avalanche.includes(addressInput)) {
      profile.walletAddresses.avalanche.push(addressInput);
    }
    if (networkInput.Cronos && !profile.walletAddresses.cronos.includes(addressInput)) {
      profile.walletAddresses.cronos.push(addressInput);
    }
    if (networkInput.Ethereum && !profile.walletAddresses.ethereum.includes(addressInput)) {
      profile.walletAddresses.ethereum.push(addressInput);
    }
    if (networkInput.Fantom && !profile.walletAddresses.fantom.includes(addressInput)) {
      profile.walletAddresses.fantom.push(addressInput);
    }
    if (networkInput.Polygon && !profile.walletAddresses.polygon.includes(addressInput)) {
      profile.walletAddresses.polygon.push(addressInput);
    }
    cookies.profiles[profileName] = profile;
    setCookie('profiles', cookies.profiles);
    toggleModal();
  }

  const toggleAvalanche = () => {
    setNetworkInput({
      ...networkInput,
      Avalanche: !networkInput.Avalanche,
    });
  };
  const toggleCronos = () => {
    setNetworkInput({
      ...networkInput,
      Cronos: !networkInput.Cronos,
    });
  };
  const toggleEthereum = () => {
    setNetworkInput({
      ...networkInput,
      Ethereum: !networkInput.Ethereum,
    });
  };
  const toggleFantom = () => {
    setNetworkInput({
      ...networkInput,
      Fantom: !networkInput.Fantom,
    });
  };
  const togglePolygon = () => {
    setNetworkInput({
      ...networkInput,
      Polygon: !networkInput.Polygon,
    });
  };
  const toggleAll = () => {
    const isChecked =  $('#select-all-checkbox').prop('checked')
    $('#avalanche-checkbox').prop('checked', isChecked);
    $('#cronos-checkbox').prop('checked', isChecked);
    $('#ethereum-checkbox').prop('checked', isChecked);
    $('#fantom-checkbox').prop('checked', isChecked);
    $('#polygon-checkbox').prop('checked', isChecked);
    setNetworkInput({
      Avalanche: isChecked,
      Cronos: isChecked,
      Ethereum: isChecked,
      Fantom: isChecked,
      Polygon: isChecked,
    });
  };

  return (
    <>
      <Button onClick={toggleModal}>Add Wallet Address</Button>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>
          Add Address
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="walletAddress" sm={2}>Address</Label>
              <Col sm={10}>
                <Input
                  id="walletAddress"
                  name="walletAddress"
                  placeholder='0x'
                  value={addressInput}
                  onInput={e => setAddressInput(e.target.value)}
                />
              </Col>
            </FormGroup>
            <Row>
              <Label sm={2}>
                Networks
              </Label>
              <Col sm={10}>
              <FormGroup check inline>
                <Input id="avalanche-checkbox" type="checkbox" onClick={toggleAvalanche} />
                <Label check>Avalanche</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input id="cronos-checkbox" type="checkbox" onClick={toggleCronos} />
                <Label check>Cronos</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input id="ethereum-checkbox" type="checkbox" onClick={toggleEthereum} />
                <Label check>Ethereum</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input id="fantom-checkbox" type="checkbox" onClick={toggleFantom} />
                <Label check>Fantom</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input id="polygon-checkbox" type="checkbox" onClick={togglePolygon} />
                <Label check>Polygon</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input id="select-all-checkbox" type="checkbox" onClick={toggleAll} />
                <Label check>All</Label>
              </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={addWalletAddress}>Add</Button>
          {' '}
          <Button onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default WalletAddressModal;
