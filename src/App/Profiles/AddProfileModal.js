import { ethers } from 'ethers';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Tooltip,
} from 'reactstrap';

function isValidProfileName(name) {
  if (name.length < 1) { return false; }

  let code, i, len;
  for (i = 0, len = name.length; i < len; i++) {
    code = name.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123) && // lower alpha (a-z)
        (code !== 45)) { // dash (-)
      return false;
    }
  }
  return true;
};

const ConnectWallet = (props) => {
  const connectWallet = async () => {
    let ethersProvider;
    let connectedSuccessfully = false;

    // Send the request to the user to connect their wallet
    const walletAddresses = {
      avalanche: [],
      cronos: [],
      ethereum: [],
      fantom: [],
      polygon: [],
    };
    if (window.ethereum) {
      try {
        ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        const accountRequest = await ethersProvider.send('eth_requestAccounts', []);
        console.log(JSON.stringify(accountRequest));
        if (accountRequest && accountRequest.length > 0) {
          connectedSuccessfully = true;
          walletAddresses.avalanche = accountRequest;
          walletAddresses.cronos = accountRequest;
          walletAddresses.ethereum = accountRequest;
          walletAddresses.fantom = accountRequest;
          walletAddresses.polygon = accountRequest;
        }
      } catch (e) {
        console.error('Failed to set up the Web3Provider', e);
      }
    } else {
      console.error('No web3 provider was found. Do you have MetaMask installed?');
    }

    // Check that the wallet is connected
    // Create the profile and set it as the active profile
    if (connectedSuccessfully) {
      const profileName = '_MetaMask';
      props.profiles[profileName] = {
        isWeb3: true,
        walletAddresses,
        disabledProjects: {
          avalanche: [],
          cronos: [],
          ethreum: [],
          fantom: [],
          polygon: [],
        },
      };

      props.setCookie('profiles', props.profiles);
      props.setCookie('activeProfileName', profileName);

      // Reload the page
      window.location.replace('/');
    }
    console.warn('Failed to connect to wallet');
  };

  return (
    <Container style={{ textAlign: 'center' }}>
      <div><span className='divider'> or </span></div>
      <Button onClick={connectWallet}>Connect MetaMask</Button>
    </Container>
  );
}

const AddProfileModal = (props) => {
  const [cookies, setCookie] = useCookies(['activeProfileName', 'profiles']);

  const navigate = useNavigate();

  const [modalOpen, setToggleModal] = useState(false);
  const [tooltipOpen, setToggleTooltip] = useState(false);
  const [profileNameInput, setProfileNameInput] = useState('');

  const toggleModal = () => {
    setProfileNameInput('');
    setToggleModal(!modalOpen);
  }

  const toggleTooltip = () => {
    setToggleTooltip(!tooltipOpen);
  }

  const addProfile = async () => {
    if (!isValidProfileName(profileNameInput)) {
      // TODO: Use input validation from https://reactstrap.github.io/?path=/docs/components-forms--input
      console.log("Profile name must only contain letters, numbers, and dashes.");
      return;
    }

    if (Object.keys(cookies.profiles).includes(profileNameInput)) {
      // TODO: Use input validation from https://reactstrap.github.io/?path=/docs/components-forms--input
      console.log("Profile name already exists.");
      return;
    }

    cookies.profiles[profileNameInput] = {
      isWeb3: false,
      walletAddresses: {
       avalanche: [],
       cronos: [],
       ethereum: [],
       fantom: [],
       polygon: [],
      },
      disabledProjects: {
       avalanche: [],
       cronos: [],
       ethereum: [],
       fantom: [],
       polygon: [],
     },
    };
    setCookie('profiles', cookies.profiles);

    navigate(`/manage-profile/${profileNameInput}`);
  }

  const walletConnected = Object.values(cookies.profiles).some(p => {
    return p.isWeb3;
  });

  return (
    <>
      <Button onClick={toggleModal}>Add Profile</Button>
      <Modal className='bg-info' isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>
          Add Profile
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="profileName" sm={3}>
                Profile Name&nbsp;
                <span href='#' id='ProfileTooltip'>
                  <FaQuestionCircle />
                </span>
                <Tooltip placement='bottom' target='ProfileTooltip' isOpen={tooltipOpen} toggle={toggleTooltip}>
                  After adding a named profile, you will be able to edit it to add wallet addresses.
                </Tooltip>
                </Label>
              <Col sm={9}>
                <Input
                  id="profileName"
                  name="profileName"
                  value={profileNameInput}
                  onInput={e => setProfileNameInput(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col className='d-flex justify-content-center'>
                <Button onClick={addProfile}>Add New Profile</Button>
              </Col>
            </FormGroup>
          </Form>
          {!walletConnected ? <ConnectWallet profiles={cookies.profiles} setCookie={setCookie} toggle={toggleModal} /> : null}
        </ModalBody>
      </Modal>
    </>
  );
}

export default AddProfileModal;
