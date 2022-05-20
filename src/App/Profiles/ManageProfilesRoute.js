import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import {
  Alert,
  Button,
  Container,
  Table,
} from 'reactstrap';
import {
  useCookies,
} from 'react-cookie';
import {
  Link,
  NavLink,
} from 'react-router-dom';
import AddProfileModal from './AddProfileModal';

const ProfileRow = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['activeProfileName', 'profiles']);

  const deleteProfile = (profileName) => {
    delete cookies.profiles[profileName];
    setCookie('profiles', cookies.profiles);

    if (profileName === cookies.activeProfileName) {
      removeCookie('activeProfileName');
    }
    if (profileName === '_MetaMask') {
      window.location.reload();
    }
  };

  const editButton = props.isWeb3 ? null : (
    <Link tag={NavLink} to={`/manage-profile/${props.profileName}`}>
      <FaPencilAlt color='grey' alt='Edit' />
    </Link>
  );
  return (
    <tr>
      <td>{props.profileName.replace('_', '')}</td>
      <td>{editButton}</td>
      <td>
        <Button close color='grey' alt='Delete' onClick={_ => deleteProfile(props.profileName)}></Button>
      </td>
    </tr>
  );
}

const ManageProfilesRoute = (props) => {
  const [cookies, setCookie] = useCookies(['activeProfileName', 'profiles']);
  const [alertOpen, setExampleAlert] = useState(false);

  cookies.profiles ?? setCookie('profiles', {});

  const profileRows = [];
  for (const profileName of Object.keys(cookies.profiles)) {
    profileRows.push(<ProfileRow key={profileName} profileName={profileName} isWeb3={cookies.profiles[profileName].isWeb3} />);
  }

  useEffect(() => {
    document.title = "Manage Profiles";
  });

  useEffect(() => {
    if (Object.keys(cookies.profiles).length === 0) {
      setExampleAlert(true);
    }
  }, [cookies.profiles]);

  const addExample = () => {
    const profileName = 'ExampleProfile';
      cookies.profiles[profileName] = {
        isWeb3: false,
        walletAddresses: {
          avalanche: ['0x50CD1C9621D8e2CCe52ACa16cC8599F46F813eF5'],
          cronos: ['0x17D7692eD63FD96d2b1B7c28DEDd301386E74174'],
          ethreum: [],
          fantom: ['0x7e97826d95986110f22aa66170f9dfe910bf8e69'],
          polygon: ['0x7EcAB1A2900BaaF015Ff10274dB5E552e81D7f7D'],
        },
        disabledProjects: {
          avalanche: [],
          cronos: [],
          ethreum: [],
          fantom: [],
          polygon: [],
        },
      };

      setCookie('profiles', cookies.profiles);
      setCookie('activeProfileName', profileName);

      window.location.replace('/');
  }

  return (
    <Container>
      <Alert className='my-2 py-2 alert-new' isOpen={alertOpen}>
        You can create a profile using the Add Profile button below and then add wallet addresses to it, or try an&nbsp;
        <a href='/#' className='alert-link' onClick={addExample}>example profile</a> to see what it's all about!
      </Alert>
      <Table borderless hover responsive striped className='bg-info rounded my-2'>
        <thead>
          <tr>
            <th>Profile Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {profileRows}
          <tr>
            <td colSpan="3" style={{ textAlign: 'center' }}>
              <AddProfileModal />
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageProfilesRoute;
