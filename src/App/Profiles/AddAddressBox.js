import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import $ from 'jquery';

const AddAddressForm = (props) => {
  const cookies = props.cookies;
  const setCookie = props.setCookie;
  const profileName = props.profileName;
  const profile = cookies.profiles[profileName];
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

  const clearForm = () => {
    setAddressInput('');
    setNetworkInput({
      Avalanche: false,
      Cronos: false,
      Ethereum: false,
      Fantom: false,
      Polygon: false,
    });
    $('#select-all-checkbox').prop('checked', false);
    $('#avalanche-checkbox').prop('checked', false);
    $('#cronos-checkbox').prop('checked', false);
    $('#ethereum-checkbox').prop('checked', false);
    $('#fantom-checkbox').prop('checked', false);
    $('#polygon-checkbox').prop('checked', false);
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
    clearForm();
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
      <h4>Add Address</h4>
        <Form>
          <FormGroup row className='py-1'>
            <Label for="walletAddress" xs='auto'>Address</Label>
            <Col>
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
            <Label xs='auto'>
              Networks
            </Label>
            <Col className='pt-2'>
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
          <Row className='justify-content-end'>
            <Col xs='auto p-1'>
              <Button onClick={addWalletAddress}>Add</Button>&nbsp;
              <Button className='' onClick={clearForm}>Clear</Button>
            </Col>
          </Row>
        </Form>
    </>
  );
};

export default AddAddressForm;