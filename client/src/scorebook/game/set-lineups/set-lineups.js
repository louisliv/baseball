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

import { connect } from 'react-redux';
import { router } from 'router';
import Constants from 'utils/constants';

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
        GameActions.get(this.props.$stateParams.gameId)
            .then((response) => {
            });
        TeamActions.getRosterByDate(
            this.props.$stateParams.awayTeamId,
            this.props.$stateParams.date
        );
        TeamActions.getRosterByDate(
            this.props.$stateParams.homeTeamId,
            this.props.$stateParams.date
        );
        ScorecardActions.getByGame(this.props.$stateParams.gameId, this.props.currentUser.id)
    }

    onSubmit(event) {
        let scorecard = _.clone(this.props.scorecard);
        scorecard.data.lineups = {
            awayTeam: this.state.awayTeam,
            homeTeam: this.state.homeTeam
        }
        scorecard.data.startersSet = true;
        event.preventDefault();
        ScorecardActions.update(this.props.scorecard.id, scorecard)
            .then((response) => {
                router.stateService.go('scorebook.game', {
                    gameId:this.props.$stateParams.gameId
                })
            })
    }

    onFormChange(values, isHomeTeam) {
        if (isHomeTeam) {
            this.setState({homeTeam: values})
        } else {
            this.setState({awayTeam: values})
        }
    }

    render() {
        if (!_.isEmpty(this.props.game) && !_.isEmpty(this.props.awayTeamRoster) && !_.isEmpty(this.props.homeTeamRoster)) {
            return (
                <Row className="team-schedule">
                    <Col xs="12">
                        <h2>{Constants.apiDateFormatter(this.props.game.gameDate)}</h2>
                    </Col>
                    <Col xs="12" md="6">
                        <Card>
                            <CardBody>
                                <CardTitle><h3>{this.props.game.teams.away.team.name}</h3></CardTitle>
                                <LineupForm 
                                    roster={this.props.awayTeamRoster} 
                                    onChange={(values) => this.onFormChange(values, false)}/>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" md="6">
                        <Card>
                            <CardBody>
                                <CardTitle><h3>{this.props.game.teams.home.team.name}</h3></CardTitle>
                                <LineupForm 
                                    roster={this.props.homeTeamRoster} 
                                    onChange={(values) => this.onFormChange(values, true)}/>
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
        awayTeamRoster: TeamSelectors.rosterByDate(
            state.teams,
            ownProps.$stateParams.awayTeamId,
            ownProps.$stateParams.date
        ),
        homeTeamRoster: TeamSelectors.rosterByDate(
            state.teams,
            ownProps.$stateParams.homeTeamId,
            ownProps.$stateParams.date
        )
    }
}

const ConnectedComponent = connect(mapStateToProps)(SetLineups)

export default ConnectedComponent;