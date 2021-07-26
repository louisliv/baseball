import React, { useReducer } from 'react';

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

export const AT_BAT_ACTIONS = {
    ADD_BALL: 'add_ball',
    ADD_STRIKE: 'add_strike',
    REMOVE_BALL: 'remove_ball',
    REMOVE_STRIKE: 'remove_strike',
    SET_BALLS: 'set_balls',
    SET_STRIKES: 'set_strikes',
    SET_OUTCOME: 'set_outcome'
}

function reducer(state, action) {
    switch (action.type) {
        case AT_BAT_ACTIONS.ADD_BALL:
            state.addBall();
            return new AtBatModel(state.playerId, state.lineupSpot, state.team, state) ;
        case AT_BAT_ACTIONS.ADD_STRIKE:
            state.addStrike();
            return new AtBatModel(state.playerId, state.lineupSpot, state.team, state);
        case AT_BAT_ACTIONS.REMOVE_BALL:
            state.removeBall();
            return new AtBatModel(state.playerId, state.lineupSpot, state.team, state);
        case AT_BAT_ACTIONS.REMOVE_STRIKE:
            state.removeStrike();
            return new AtBatModel(state.playerId, state.lineupSpot, state.team, state);
        case AT_BAT_ACTIONS.SET_OUTCOME:
            state.addOutcome(action.payload);
            return new AtBatModel(state.playerId, state.lineupSpot, state.team, state);
        default:
            return state
    }
}

const AtBat = (props) => {
    const {
      player,
      isOpened,
      handleCancel,
      onSubmit,
      inning
    } = props;

    const [state, dispatch] = useReducer(reducer, new AtBatModel(props.playerId, props.lineupSpot, props.team));
  
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
                            src={Constants.getPlayerHeadshotUrl(state.playerId)} 
                            alt={state.playerId}
                            className="text-center"/>
                    </Col>
                    <Col xs="6">
                        <AtBatForm atBat={state} 
                            handleSubmit={onSubmit}
                            inning={inning}
                            dispatch={dispatch}/>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" 
                    onClick={(event) =>{onSubmit(event, inning, state)}}>
                    End At Bat
                </Button>{' '}
                <Button color="secondary" onClick={handleCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
  }

export default AtBat;