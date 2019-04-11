import _ from 'lodash';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import Constants from 'utils/constants';

import GameActions from 'store/action-creators/games';
import GameSelectors from 'store/selectors/games';
import { 
    Row, 
    Col, 
    Card, 
    CardBody,
    Button
} from 'reactstrap'
import GameImg from './_components/gameimg';

class Game extends Component {
    componentWillMount() {
        GameActions.get(this.props.$stateParams.gameId);
    }

    startScorecard() {
        console.log('Scorecard started.')
    }

    render() {
        if (!_.isEmpty(this.props.game)) {
            let awayTeam = this.props.game.teams.away;
            let homeTeam = this.props.game.teams.home;

            return (
                <Row>
                    <Col xs="12">
                        <Card>
                            <GameImg awayTeam={awayTeam.team} homeTeam={homeTeam.team}/>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <div>{Constants.dateTimeFormatter(this.props.game.gameDate)}</div>
                                        <div>{this.props.game.venue.name}</div>
                                        <Button color="success"
                                            onClick={this.startScorecard}>
                                            Start Scorecard
                                        </Button>
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
        game: GameSelectors.one(state.games, ownProps.$stateParams.gameId),
    }
}

const ConnectedComponent = connect(mapStateToProps)(Game)

export default ConnectedComponent;