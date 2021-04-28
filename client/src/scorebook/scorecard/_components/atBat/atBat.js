import React from 'react';

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
  
    return (
        <Modal isOpen={isOpened} toggle={handleCancel}>
            <ModalBody>
                <Row>
                    <Col xs="12">
                        <div className="text-center">
                            <h2>{player.person.fullName}</h2>
                        </div>
                    </Col>
                    <Col xs="6">
                        <div>Inning {inning}</div>
                        <img 
                            src={Constants.getPlayerHeadshotUrl(atBat.playerId)} 
                            alt={atBat.playerId}
                            className="text-center"/>
                    </Col>
                    <Col xs="6">
                        <AtBatForm atBat={atBat} 
                            handleSubmit={onSubmit}
                            inning={inning}/>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" 
                    onClick={(event) =>{onSubmit(event, inning, atBat)}}>
                    End At Bat
                </Button>{' '}
                <Button color="secondary" onClick={handleCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
  }

export default AtBat;