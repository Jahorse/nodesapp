import { useState } from 'react';
import { setCookies, useCookies } from 'react-cookie';
import {
  Button,
  Container,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from 'reactstrap';

const AddressRow = (props) => {
  const [cookies, setCookie] = useCookies(['walletAddresses']);

  const removeAddress = () => {
    const networkName = props.network.toLowerCase();
    const index = cookies.walletAddresses[networkName].indexOf(props.address);
    if (index >= 0) {
      cookies.walletAddresses[networkName].splice(index, 1);
      setCookie('walletAddresses', cookies.walletAddresses);
    }
  }

  return (
    <tr>
      <th scope="row">
        {props.address}
      </th>
      <td>
        {props.network}
      </td>
      <td>
        <Button close color="white" className="btn-close-white" onClick={removeAddress}></Button>
      </td>
    </tr>
  );
}

const WalletAddressModal = (props) => {
  const [modalOpen, setToggleModal] = useState(false);
  const [cookies, setCookie] = useCookies(['walletAddresses']);
  const [addressInput, setAddressInput] = useState('');
  const [networkInput, setNetworkInput] = useState('Avalanche');

  if (!cookies.walletAddresses) {
    setCookie('walletAddresses', {
      avalanche: [],
      fantom: [],
      polygon: [],
    });
  }

  const toggleModal = () => {
    setToggleModal(!modalOpen);
  }

  const addWalletAddress = () => {
    const networkName = networkInput.toLowerCase();
    if (!cookies.walletAddresses[networkName].includes(addressInput)) {
      cookies.walletAddresses[networkName].push(addressInput);
      setCookie('walletAddresses', cookies.walletAddresses);
    }
  }

  const addressRows = [];
  for (const address of cookies.walletAddresses.avalanche) {
    addressRows.push(<AddressRow key={`avalanche-${address}`} network='Avalanche' address = {address}/>);
  }
  for (const address of cookies.walletAddresses.fantom) {
    addressRows.push(<AddressRow key={`fantom-${address}`} network='Fantom' address = {address}/>);
  }
  for (const address of cookies.walletAddresses.polygon) {
    addressRows.push(<AddressRow key={`polygon-${address}`} network='Polygon' address = {address}/>);
  }

  return (
    <div>
      <Button onClick={toggleModal}>Manage Addresses</Button>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>
          Manage Addresses
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="networkSelect" sm={2}>
                Network
              </Label>
              <Col sm={10}>
                <Input id="networkSelect" name="select" type="select" value={networkInput} onChange={e => setNetworkInput(e.target.value)}>
                  <option value='avalanche'>Avalanche</option>
                  <option value='fantom'>Fantom</option>
                  <option value='polygon'>Polygon</option>
                </Input>
              </Col>
            </FormGroup>
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
            <FormGroup check row>
              <Col sm={{ offset: 2, size: 10 }}>
                <Button onClick={addWalletAddress}>Add</Button>
              </Col>
            </FormGroup>
          </Form>
          <Table borderless dark hover responsive striped>
            <thead>
              <tr>
                <th>Address</th>
                <th>Network</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {addressRows}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default WalletAddressModal;
