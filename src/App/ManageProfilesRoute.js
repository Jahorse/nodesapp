/**
 * Copyright David Horsman. All Rights Reserved.
 * SPDX-License-Identifier: Attribution-NonCommercial-NoDerivatives 4.0 International
 */

import React from 'react';
import {  Container, Table } from 'reactstrap';

const TestRoute = (props) => {

  return (
    <Container fluid>
      <Table borderless dark hover responsive striped>
        <thead>
          <tr>
            <th>Project</th>
            <th>Rewards</th>
            <th>Claim</th>
            <th>Compound</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test</td>
            <td>Test</td>
            <td>Test</td>
            <td>Test</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default TestRoute;
