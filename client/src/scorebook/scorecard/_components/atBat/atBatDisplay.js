import React, { useState } from 'react';

import {
    Row,
    Col
} from 'reactstrap';

const AtBatDisplay = (props) => {
    const {
      atBat
    } = props;
  
    return (
        <Row>
            <Col xs="12 text-center">
                <div><h3>{atBat.outcome}</h3></div>
                <div><small>Balls: {atBat.balls}</small></div>
                <div><small>Strikes: {atBat.strikes}</small></div>
            </Col>
        </Row>
    );
  }

export default AtBatDisplay;