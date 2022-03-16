import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import {
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
      <FaPencilAlt color="white" alt="Edit" />
    </Link>
  );
  return (
    <tr>
      <td>{props.profileName.replace('_', '')}</td>
      <td>{editButton}</td>
      <td>
        <Button close color="white" className="btn-close-white" alt="Delete" onClick={_ => deleteProfile(props.profileName)}></Button>
      </td>
    </tr>
  );
}

const ManageProfilesRoute = (props) => {
  const [cookies] = useCookies(['activeProfileName', 'profiles']);

  const profiles = cookies.profiles ? cookies.profiles : {};

  const profileRows = [];
  for (const profileName of Object.keys(profiles)) {
    profileRows.push(<ProfileRow key={profileName} profileName={profileName} isWeb3={profiles[profileName].isWeb3} />);
  }

  return (
    <Container>
      <Table borderless dark hover responsive striped>
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
