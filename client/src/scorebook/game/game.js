import _ from 'lodash';
import { isEmpty } from 'lodash';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import Constants from 'utils/constants';
import { router } from 'router';

import GameActions from 'store/action-creators/games';
import GameSelectors from 'store/selectors/games';
import ScorecardActions from 'store/action-creators/scorecards';
import ScorecardSelectors from 'store/selectors/scorecards';

import { 
    Row, 
    Col, 
    Card, 
    CardBody,
    Button
} from 'reactstrap'
import GameImg from './_components/gameimg'; 
import LineupTable from './_components/lineup-table';

class Game extends Component {
    constructor(props) {
        super(props);
        this.startScorecard = this.startScorecard.bind(this);
        this.startSetLineups = this.startSetLineups.bind(this);
        this.routeToScorecard = this.routeToScorecard.bind(this);
    }

    componentWillMount() {
        GameActions.get(this.props.$stateParams.gameId);
        ScorecardActions.getByGame(this.props.$stateParams.gameId, this.props.currentUser.id)
    }

    startScorecard() {
        let data = {
            game: this.props.$stateParams.gameId,
            data: {
                awayTeam: this.props.game.teams.away,
                homeTeam: this.props.game.teams.home,
                startersSet: false
            }
        }
        ScorecardActions.create(data)
            .then(() => {
                let date = Constants.storeDateFormatter(this.props.game.gameDate);
                console.log(date);
                router.stateService.go('scorebook.set-lineups', {
                    gameId: this.props.$stateParams.gameId,
                    scorecardId: this.props.scorecard.id,
                    awayTeamId: this.props.game.teams.away.team.id,
                    homeTeamId: this.props.game.teams.home.team.id,
                    date: date
                })
            })
    }

    startSetLineups() {
        router.stateService.go('scorebook.set-lineups', {
            gameId: this.props.$stateParams.gameId,
            scorecardId: this.props.scorecard.id,
            awayTeamId: this.props.game.teams.away.team.id,
            homeTeamId: this.props.game.teams.home.team.id,
            date: Constants.storeDateFormatter(this.props.game.gameDate)
        })
    }

    routeToScorecard() {
        router.stateService.go('scorebook.scorecard', {
            scorecardId: this.props.scorecard.id
        })
    }

    render() {
        if (!_.isEmpty(this.props.game)) {
            let awayTeam = this.props.game.teams.away;
            let homeTeam = this.props.game.teams.home;

            return (
                <Row>
                    <Col xs="12">
                        <Card>
                            <GameImg 
                                awayTeam={awayTeam.team} 
                                homeTeam={homeTeam.team}
                                date={Constants.dateTimeFormatter(this.props.game.gameDate)}/>
                            <CardBody className="text-center">
                                <Row>
                                    <Col xs="12">
                                        {isEmpty(this.props.scorecard) && 
                                            <Button color="success"
                                                onClick={this.startScorecard}>
                                                Start Scorecard
                                            </Button>
                                        }
                                        {!isEmpty(this.props.scorecard) && !this.props.scorecard.data.startersSet && 
                                            <Button color="success"
                                                onClick={this.startSetLineups}>
                                                Set Lineups
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                                {!isEmpty(this.props.scorecard) && this.props.scorecard.data.startersSet &&
                                    <Row>
                                        <Col xs="12" className="text-center">
                                            <Button onClick={this.routeToScorecard}
                                                color="success">
                                                Go to Scorecard
                                            </Button>
                                        </Col>
                                        <Col xs="6">
                                            <Card>
                                                <CardBody>
                                                    <LineupTable lineup={this.props.scorecard.data.lineups.awayTeam}/>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col xs="6">
                                            <Card>
                                                <CardBody>
                                                    <LineupTable lineup={this.props.scorecard.data.lineups.homeTeam}/>        
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser,
        game: GameSelectors.one(state.games, ownProps.$stateParams.gameId),
        scorecard: ScorecardSelectors.byGame(state.scorecards, ownProps.$stateParams.gameId, state.currentUser.id)
    }
}

const ConnectedComponent = connect(mapStateToProps)(Game)

export default ConnectedComponent;