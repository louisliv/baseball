import React from 'react';

import {
    Card,
    CardBody,
    Row,
    Col,
    Table
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Draggable from 'react-draggable';

import ScoreboxRow from './scoreBoxRow';

const Scorebox = (props) => {
    const {
        isOpened,
        handleCancel,
        scorecard,
        updateScore
    } = props;

    if (isOpened && scorecard) {
        return (
            <Draggable>
                <div className="scorebox d-flex">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <Table size="sm">
                                        <thead>
                                            <tr>
                                                <td></td>
                                                <td>R</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <ScoreboxRow team={scorecard.awayTeam.team}
                                                runs={scorecard.plays.awayTeamRuns} 
                                                onScoreUpdate={updateScore}
                                                teamRef={0}/>
                                            <ScoreboxRow team={scorecard.homeTeam.team}
                                                runs={scorecard.plays.homeTeamRuns} 
                                                onScoreUpdate={updateScore}
                                                teamRef={1} />
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <div className="text-right">
                        <FontAwesomeIcon icon={faTimes} 
                            onClick={handleCancel}
                            size="sm"
                            className="close-icon"/>
                    </div>
                </div>
            </Draggable>
        );
    } else {
        return null;
    }
  }

export default Scorebox;