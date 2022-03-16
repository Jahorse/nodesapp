import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaQuestionCircle } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Input,
  Label,
  Row,
  Table,
  Tooltip,
} from 'reactstrap';
import WalletAddressModal from './WalletAddressModal';


const AddressRow = (props) => {
  const cookies = props.cookies;
  const setCookie = props.setCookie;
  const profileName = props.profileName;
  const profile = cookies.profiles[profileName];

  const deleteAddress = (address, networkName) => {
    const index = profile.walletAddresses[networkName].indexOf(address);
    if (index >= 0) {
      profile.walletAddresses[networkName].splice(index, 1);
      cookies.profiles[profileName] = profile;
      setCookie('profiles', cookies.profiles);
    }
  }
  return (
    <tr>
      <td>{props.address}</td>
      <td>{props.networkName}</td>
      <td>
        <Button close color="white" className="btn-close-white" alt="Delete" onClick={_ => deleteAddress(props.address, props.networkName)}></Button>
      </td>
    </tr>
  );
}

const EditProfileRoute = (props) => {
  let params = useParams();
  const [cookies, setCookie] = useCookies(['profiles']);
  const [tooltipOpen, setToggleTooltip] = useState(false);

  if (!cookies.profiles) {
    console.error('No profiles are set.');
    return (
      <Container><p>No profiles are set.</p></Container>
    );
  }
  if (!Object.keys(cookies.profiles).includes(params.profileName)) {
    console.error(`Profile ${params.profileName} not found`);
    return (
      <Container><p>Profile {params.profileName} not found.</p></Container>
    );
  }

  const profile = cookies.profiles[params.profileName];

  const addressRows = [];
  profile.walletAddresses.avalanche.forEach((a) => {
    addressRows.push(<AddressRow
      key={`avalanche-${a}`}
      address={a}
      networkName='avalanche'
      profileName={params.profileName}
      cookies={cookies}
      setCookie={setCookie}
    />);
  })
  profile.walletAddresses.ethereum.forEach((a) => {
    addressRows.push(<AddressRow
      key={`ethereum-${a}`}
      address={a}
      networkName='ethereum'
      profileName={params.profileName}
      cookies={cookies}
      setCookie={setCookie}
    />);
  })
  profile.walletAddresses.fantom.forEach((a) => {
    addressRows.push(<AddressRow
      key={`fantom-${a}`}
      address={a}
      networkName='fantom'
      profileName={params.profileName}
      cookies={cookies}
      setCookie={setCookie}
    />);
  })
  profile.walletAddresses.polygon.forEach((a) => {
    addressRows.push(<AddressRow
      key={`polygon-${a}`}
      address={a}
      networkName='polygon'
      profileName={params.profileName}
      cookies={cookies}
      setCookie={setCookie}
    />);
  })

  const toggleTooltip = () => {
    setToggleTooltip(!tooltipOpen);
  }

  return (
    <Container>
      <Container className='bg-secondary rounded-top'>
        <Row>
          <Col className='text-light p-2'>
            <h4>Edit Addresses</h4>
          </Col>
        </Row>
      </Container>
      <Table borderless dark hover responsive striped>
        <thead>
          <tr>
            <th>Address</th>
            <th>Network</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {addressRows}
          <tr key='add-address'>
            <td colSpan="5" style={{ textAlign: 'center' }}>
              <WalletAddressModal profileName ={params.profileName} cookies={cookies} setCookie={setCookie} />
            </td>
          </tr>
        </tbody>
      </Table>
      {/* <Container className='bg-secondary rounded-top'>
        <Row>
          <Col className='text-light p-2'>
            <h4>
              Enable/Disable Services&nbsp;&nbsp;
              <span style={{ fontSize: '18px'}}>
                <span href='#' id='EnableDisableService' className='link-light'>
                  <FaQuestionCircle />
                </span>
              </span>
            </h4>
            <Tooltip placement='right' target='EnableDisableService' isOpen={tooltipOpen} toggle={toggleTooltip}>
              Disable services you don't use to reduce the traffic between your browser and the blockchain.
            </Tooltip>
          </Col>
        </Row>
      </Container>
      <Container className='bg-dark'>
        <Row className='bg-secondary p-2 text-light border-top'>
          <b>Avalanche</b>
        </Row>
        <Row>
        <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Ascend AMS</Label>
          </Col>
          <Col xs='1' className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Ascend Infinite</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Ascend Meta</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Ascend Platinum</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
        </Row>
        <Row>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Louverture v1</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Nebula</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">RND Districts</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">RND Mansions</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
        </Row>
        <Row>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Thor Freya</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Thor Heimdall</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Thor Odin</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Thor Thor</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
        </Row>
        <Row>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Universe</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Vapor</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
        </Row>
        <Row className='bg-secondary p-2 text-light border-top'>
          <b>Ethereum</b>
        </Row>
        <Row>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Strong Ethereum</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Strong Polygon</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
        </Row>
        <Row className='bg-secondary p-2 text-light border-top'>
          <b>Fantom</b>
        </Row>
        <Row>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Power Hydro</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Power Nuclear</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Power Solar</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Power Wind</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
        </Row>
        <Row className='bg-secondary p-2 text-light border-top'>
          <b>Polygon</b>
        </Row>
        <Row>
          <Col xs='2' className='text-light py-2 form-check form-switch'>
            <Label htmlFor="exampleEmail">Pentagon</Label>
          </Col>
          <Col className='text-light py-2 form-check form-switch'>
            <Input bsSize='' type='switch' />
          </Col>
        </Row>
      </Container> */}
    </Container>
  );
}

export default EditProfileRoute;
