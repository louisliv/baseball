import React, { useState, setValue } from 'react';

import { AtBat as AtBatModel } from "../../models";

import Constants from "utils/constants";

import { 
    Modal, 
    ModalBody, 
    ModalFooter,
    Button,
    Row,
    Col,
} from 'reactstrap';

import AtBatForm from './atBatForm';

const AtBat = (props) => {
    const {
      player,
      isOpened,
      handleCancel,
      onSubmit,
      inning
    } = props;

    
    const atBat = new AtBatModel(props.playerId, props.lineupSpot, props.team);

    const handleChange = e => {
        console.log(e.target)
        setValue(e.target.name, e.target.value)
    }
  
    return (
        <Modal isOpen={isOpened} toggle={handleCancel}>
            <ModalBody>
                <Row>
                    <Col xs="6">
                        <div className="test-center">
                            <h2>{player.person.fullName}</h2>
                        </div>
                        <div>Inning {inning}</div>
                        <img 
                            src={Constants.getPlayerHeadshotUrl(atBat.playerId)} 
                            alt={atBat.playerId}
                            className="test-center"/>
                    </Col>
                    <Col xs="6">
                        <AtBatForm atBat={atBat} 
                            handleSubmit={onSubmit}
                            inning={inning}/>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={(event) =>{onSubmit(event, inning, atBat)}}>Submit</Button>{' '}
                <Button color="secondary" onClick={handleCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
  }

export default AtBat;