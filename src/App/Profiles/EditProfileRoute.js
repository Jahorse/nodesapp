import React from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Row,
} from 'reactstrap';

import { breakpoint, useViewport } from '../Utils/Hooks';
import DisableProtocolsForm from './DisableProtocolsForm';
import ManageAddressesForm from './ManageAddressesForm';

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

  const longAddresses = props.width > breakpoint ? true : false;

  return (
    <tr>
      <td>{longAddresses ? props.address : `${props.address.substring(0,8)}...`}</td>
      <td>{props.networkName}</td>
      <td>
        <Button close color='grey' alt="Delete" onClick={_ => deleteAddress(props.address, props.networkName)}></Button>
      </td>
    </tr>
  );
}

const EditProfileRoute = (props) => {
  let params = useParams();
  const [cookies, setCookie] = useCookies(['profiles']);
  const { width } = useViewport();

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
      width={width}
    />);
  })
  profile.walletAddresses.cronos.forEach((a) => {
    addressRows.push(<AddressRow
      key={`cronos-${a}`}
      address={a}
      networkName='cronos'
      profileName={params.profileName}
      cookies={cookies}
      setCookie={setCookie}
      width={width}
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
      width={width}
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
      width={width}
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
      width={width}
    />);
  })

  return (
    <Container>
      <Container className='bg-info rounded p-2 my-2'>
        <Row className='my-1'>
          <h2>Edit Addresses - {params.profileName}</h2>
        </Row>
        <ManageAddressesForm profileName={params.profileName} cookies={cookies} setCookie={setCookie} />
      </Container>
      {/* <DisableProtocolsForm /> */}
    </Container>
  );
}

export default EditProfileRoute;
