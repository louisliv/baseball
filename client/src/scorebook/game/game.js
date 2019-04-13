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

class Game extends Component {
    constructor(props) {
        super(props);
        this.startScorecard = this.startScorecard.bind(this);
        this.startSetLineups = this.startSetLineups.bind(this);
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
            .then((response) => {
                router.stateService.go('scorebook.set-lineups', {
                    gameId: this.props.$stateParams.gameId,
                    scorecardId: this.props.scorecard.id
                })
            })
    }

    startSetLineups() {
        console.log(this.props);
        router.stateService.go('scorebook.set-lineups', {
            gameId: this.props.$stateParams.gameId,
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
                                        {!this.props.scorecard.startersSet && 
                                            <Button color="success"
                                                onClick={this.startSetLineups}>
                                                Set Lineups
                                            </Button>
                                        }
                                    </Col>
                                </Row>
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