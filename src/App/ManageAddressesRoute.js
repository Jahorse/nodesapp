import { useCookies } from 'react-cookie';
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Table,
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

const ManageAddressesRoute = (props) => {
  let params = useParams();
  const [cookies, setCookie] = useCookies(['profiles']);

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

  return (
    <Container>
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
    </Container>
  );
}

export default ManageAddressesRoute;
