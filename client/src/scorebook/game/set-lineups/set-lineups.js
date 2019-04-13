import _ from 'lodash';
import React, { Component } from 'react';

import {
    Row, 
    Col, 
    Card, 
    CardBody,
    CardTitle,
    Label
} from 'reactstrap';
import ReactJson from 'react-json-view';

import { 
    AvForm, 
    AvGroup, 
    AvInput, 
    AvFeedback,
} from 'availity-reactstrap-validation';

import { connect } from 'react-redux';
import { router } from 'router';

import TeamActions from 'store/action-creators/teams';
import TeamSelectors from 'store/selectors/teams';
import GameActions from 'store/action-creators/games';
import GameSelectors from 'store/selectors/games';
import ScorecardActions from 'store/action-creators/scorecards';
import ScorecardSelectors from 'store/selectors/scorecards';

class SetLineups extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        GameActions.get(this.props.$stateParams.gameId);
        ScorecardActions.getByGame(this.props.$stateParams.gameId, this.props.currentUser.id)
    }

    componentDidMount() {
        console.log(this.props.scorecard);
    }

    render() {
        if (!_.isEmpty(this.props.game)) {
            return (
                <Row className="team-schedule">
                    <Col xs="12" style={{minHeight: '600px'}}>
                        <ReactJson src={this.props.scorecard} />
                    </Col>
                    <Col xs="12" md="6">
                        <Card>
                            <CardBody>
                                <CardTitle><h3>{this.props.game.teams.away.team.name}</h3></CardTitle>
                                <AvForm>
                                    <AvGroup row>
                                        <Label sm={1}>1</Label>
                                        <AvInput type="select" name="away.2" className="col-sm-11">
                                            <option>Select Player</option>
                                        </AvInput>
                                    </AvGroup>
                                    <AvGroup row>
                                        <Label sm={1}>2</Label>
                                        <AvInput type="select" name="away.2" className="col-sm-11">
                                            <option>Select Player</option>
                                        </AvInput>
                                    </AvGroup>
                                </AvForm>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" md="6">
                        <Card>
                            <CardBody>
    
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            );
        }

        return null;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser,
        game: GameSelectors.one(state.games, ownProps.$stateParams.gameId),
        scorecard: ScorecardSelectors.byGame(state.scorecards, ownProps.$stateParams.gameId, state.currentUser.id)
    }
}

const ConnectedComponent = connect(mapStateToProps)(SetLineups)

export default ConnectedComponent;