import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaQuestionCircle } from 'react-icons/fa';
import { IconContext } from "react-icons";
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
import { breakpoint, useViewport } from '../Utils/Hooks';



const DisableProtocolsForm = (props) => {
  let params = useParams();
  const [cookies, setCookie] = useCookies(['profiles']);
  const [tooltipOpen, setToggleTooltip] = useState(false);
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

  const toggleTooltip = () => {
    setToggleTooltip(!tooltipOpen);
  }

  return (
    <Container className='bg-info rounded'>
      <Row>
        <Col className='p-2'>
          <h4>
            Enable/Disable Services&nbsp;&nbsp;
            <span style={{ fontSize: '18px'}}>
              <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                <span href='#' id='EnableDisableService'>
                  <FaQuestionCircle />
                </span>
              </IconContext.Provider>
            </span>
          </h4>
          <Tooltip placement='right' target='EnableDisableService' isOpen={tooltipOpen} toggle={toggleTooltip}>
            Disable services you don't use to reduce the traffic between your browser and the blockchain.
          </Tooltip>
        </Col>
      </Row>
      <Row className='p-2 border-top'>
        <b>Avalanche</b>
      </Row>
      <Row>
        <Col xs='6' className='py-2 px-4 form-check form-switch'>
          <Label htmlFor="exampleEmail">Ascend AMS</Label>
        </Col>
        <Col xs='1' className='py-2 px-4 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
      </Row>
      <Row>
        <Col xs='6' className='py-2 px-4 form-check form-switch'>
          <Label htmlFor="exampleEmail">Ascend Infinite</Label>
        </Col>
        <Col xs='1' className='py-2 px-4 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
      </Row>
      <Row>
        <Col xs='1' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Ascend Meta</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Ascend Platinum</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
      </Row>
      <Row>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Louverture v1</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Nebula</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">RND Districts</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">RND Mansions</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
      </Row>
      <Row>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Thor Freya</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Thor Heimdall</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Thor Odin</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Thor Thor</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
      </Row>
      <Row>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Universe</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Vapor</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
      </Row>
      <Row className='p-2 border-top'>
        <b>Ethereum</b>
      </Row>
      <Row>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Strong Ethereum</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Strong Polygon</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
      </Row>
      <Row className='p-2 border-top'>
        <b>Fantom</b>
      </Row>
      <Row>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Power Hydro</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Power Nuclear</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Power Solar</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Power Wind</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
      </Row>
      <Row className='p-2 border-top'>
        <b>Polygon</b>
      </Row>
      <Row>
        <Col xs='2' className='py-2 form-check form-switch'>
          <Label htmlFor="exampleEmail">Pentagon</Label>
        </Col>
        <Col className='py-2 form-check form-switch'>
          <Input bsSize='' type='switch' />
        </Col>
      </Row>
    </Container>
  );
}

export default DisableProtocolsForm;
