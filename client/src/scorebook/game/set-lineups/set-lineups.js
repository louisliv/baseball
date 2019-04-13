import _ from 'lodash';
import React, { Component } from 'react';

import {
    Row, 
    Col, 
    Card, 
    CardBody,
    CardTitle,
    Button
} from 'reactstrap';
import ReactJson from 'react-json-view';

import { connect } from 'react-redux';
import { router } from 'router';

import TeamActions from 'store/action-creators/teams';
import TeamSelectors from 'store/selectors/teams';
import GameActions from 'store/action-creators/games';
import GameSelectors from 'store/selectors/games';
import ScorecardActions from 'store/action-creators/scorecards';
import ScorecardSelectors from 'store/selectors/scorecards';
import LineupForm from './_components/lineup-form/lineup-form';

class SetLineups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeTeam: {},
            awayTeam: {}
        }
        this.onFormChange = this.onFormChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        GameActions.get(this.props.$stateParams.gameId);
        ScorecardActions.getByGame(this.props.$stateParams.gameId, this.props.currentUser.id)
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    onFormChange(values, isHomeTeam) {
        if (isHomeTeam) {
            this.setState({homeTeam: values})
        } else {
            this.setState({awayTeam: values})
        }
    }

    render() {
        let scaryAnimals = [
            { label: "Alligators", value: 1 },
            { label: "Crocodiles", value: 2 },
            { label: "Sharks", value: 3 },
            { label: "Small crocodiles", value: 4 },
            { label: "Smallest crocodiles", value: 5 },
            { label: "Snakes", value: 6 },
        ];
        let niceAnimals = [
            { label: "Bunny", value: 7 },
            { label: "Puppy", value: 8 },
            { label: "Kitten", value: 9 },
            { label: "Koala", value: 10 },
            { label: "Owl", value: 11 },
            { label: "Pig", value: 12 },
        ];
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
                                <LineupForm roster={scaryAnimals} onChange={(values) => this.onFormChange(values, false)}/>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" md="6">
                        <Card>
                            <CardBody>
                                <CardTitle><h3>{this.props.game.teams.home.team.name}</h3></CardTitle>
                                <LineupForm roster={niceAnimals} onChange={(values) => this.onFormChange(values, true)}/>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12">
                        <Button onClick={this.onSubmit}>Submit</Button>
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
        scorecard: ScorecardSelectors.byGame(state.scorecards, 
            ownProps.$stateParams.gameId, state.currentUser.id),
        awayTeamRoster: TeamSelectors.rosterByDate(state.teams, 
            GameSelectors.one(state.games, ownProps.$stateParams.gameId).gameDate)
    }
}

const ConnectedComponent = connect(mapStateToProps)(SetLineups)

export default ConnectedComponent;