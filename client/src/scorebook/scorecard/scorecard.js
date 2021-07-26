import _ from 'lodash';
import React, { Component } from 'react';

import Column from "./_components/column";

import { connect } from 'react-redux';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { 
    Row, 
    Col,
    Card,
    CardBody,
    Table,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'

import AtBat, {AtBatDisplay} from "./_components/atBat";

import ScorecardActions from 'store/action-creators/scorecards';
import ScorecardSelectors from 'store/selectors/scorecards';
import {Scorecard as ScorecardModel} from './models';

import { BottomMenu, BottomMenuItem } from "utils/bottom-menu";

import Scorebox from "utils/scorebox";

class Scorecard extends Component {
    constructor(props) {
        super(props);
        this.loadButtonRow = this.loadButtonRow.bind(this);
        this.changeLineUp = this.changeLineUp.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
        this.handleModalSubmit = this.handleModalSubmit.bind(this);
        this.closeScorebox = this.closeScorebox.bind(this);
        this.openScorebox = this.openScorebox.bind(this);
        this.updateScorecard = this.updateScorecard.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.completeScorecard = this.completeScorecard.bind(this);

        this.state = {
            modal: [],
            modalIsOpened: false,
            scoreboxIsOpen: true,
            selectedLineupSpot: 0,
            selectedInning: 0
        }
    }

    componentWillMount() {
        ScorecardActions.get(this.props.$stateParams.scorecardId);
    }

    updateScorecard(e) {
        e.preventDefault();

        var scorecard = this.props.scorecard;
        var scorecardData = this.state.scorecard;

        scorecard.data = scorecardData;

        ScorecardActions.update(scorecard.id, scorecard);
    }

    updateScore(team, up) {
        var scorecard = this.state.scorecard;

        if (up) {
            scorecard.addRun(team);
        } else {
            scorecard.removeRun(team);
        }

        this.setState({
            scorecard: scorecard
        })
    }

    completeScorecard(e) {
        e.preventDefault();
        this.props.scorecard.complete = true;

        this.updateScorecard(e)
    }

    onScoreboxClicked(event, lineupSpot, inning) {
        this.setState({
            modalIsOpened: true,
            selectedLineupSpot: lineupSpot,
            selectedInning: inning
        });
    }

    handleModalSubmit(event, inning, atBat) {
        event.preventDefault();
        this.closeModal()

        console.log(atBat)

        var scorecard = this.state.scorecard;

        scorecard.addAtBat(inning, atBat);

        this.setState({
            scorecard: scorecard
        })
    }

    handleModalCancel() {
        this.closeModal();
    }

    closeModal() {
        this.setState({
            modalIsOpened: false,
        })
    }

    closeScorebox() {
        this.setState({
            scoreboxIsOpen: false,
        })
    }

    openScorebox() {
        this.setState({
            scoreboxIsOpen: true,
        })
    }

    loadButtonRow() {
        var homeTeam = this.props.scorecard.data.homeTeam.team;
        var awayTeam = this.props.scorecard.data.awayTeam.team;

        if (!_.isEmpty(this.state.scorecard)) {
            var completeIcon;

            if (this.props.scorecard.complete) {
                completeIcon = (
                    <span className="text-green grey-bottom-border">
                        <FontAwesomeIcon icon={faCheck}/> Complete
                    </span>
                )
            }

            return (
                <div className="d-flex">
                    <div className="flex-fill">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.scorecard.currentTeam === 0 })}
                                    onClick={(event) => {this.changeLineUp(event, 0)}}>
                                    {awayTeam.name} ({this.state.scorecard.plays.awayTeamRuns})
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.scorecard.currentTeam === 1 })}
                                    onClick={(event) => {this.changeLineUp(event, 1)}}>
                                    {homeTeam.name} ({this.state.scorecard.plays.homeTeamRuns})
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                    {completeIcon}
                </div>
                
            )
        } else {
            return null;
        }
    }

    loadTableHeader() {
        var headers = [];

        for (var i=1; i<=9; i++) {
            headers.push(<Column columnNumber={i} key={i}></Column>)
        }

        return headers;
    }

    loadAtBats(lineupSpot) {
        var aBs = [];
        for (let ab=1; ab<=this.state.scorecard.innings; ab++) {
            var existingAb = this.state.scorecard.getAtBat(this.state.scorecard.currentTeam, ab, lineupSpot);
            if (_.isEmpty(existingAb)) {
                aBs.push(<td key={ab} onClick={(event) => {this.onScoreboxClicked(event, lineupSpot, ab)}}></td>)
            } else {
                aBs.push(<td key={ab}><AtBatDisplay atBat={existingAb}/></td>)
            }
        }

        return aBs;
    }

    loadModal() {
        if (this.state.modalIsOpened) {
            var team = this.state.scorecard.currentTeam;
            var player = this.state.scorecard.getCurrentPlayer(team, this.state.selectedLineupSpot);
            var playerId = player.person.id;
                
            return (
                <AtBat player={player} 
                    playerId={playerId}
                    lineupSpot={this.state.selectedLineupSpot}
                    team={team}
                    isOpened={this.state.modalIsOpened}
                    inning={this.state.selectedInning}
                    handleCancel={this.handleModalCancel}
                    onSubmit={this.handleModalSubmit}/>
            )
        } else {
            return null;
        }
    }

    loadScorebox() {
        return (
            <Scorebox scorecard={this.state.scorecard}
                isOpened={this.state.scoreboxIsOpen}
                handleCancel={this.closeScorebox}
                updateScore={this.updateScore}/>
        )
    }

    loadLineUp() {
        var homeTeamLineUp = this.props.scorecard.data.lineups.homeTeam;
        var awayTeamLineup = this.props.scorecard.data.lineups.awayTeam;
        var currentLineup = awayTeamLineup;

        var rows = []
        
        if (this.state.scorecard) {
            switch (this.state.scorecard.currentTeam) {
                case 0:
                    currentLineup = awayTeamLineup;
                    break;
                case 1:
                    currentLineup = homeTeamLineUp;
                    break;
                default:
                    break;
            }
            _.forEach(currentLineup, (player, key) => {
                rows.push(
                    <tr key={key}>
                        <td>{key}. {player.person.fullName} ({player.gameDayPosition})</td>
                        {this.loadAtBats(key)}
                    </tr>
                )
            })
        }

        return rows;
    }

    changeLineUp(event, lineup) {
        event.preventDefault();
        
        var scorecardFromState = this.state.scorecard;

        scorecardFromState.currentTeam = lineup;

        this.setState({
            scorecard: scorecardFromState
        })
    }

    loadScorecard() {
        if (_.isEmpty(this.state.scorecard)) {
            this.setState({
                scorecard: new ScorecardModel(this.props.scorecard.data)
            })
        } 
    }

    render() {
        if (!_.isEmpty(this.props.scorecard)) {
            this.loadScorecard();
            return (
                <Row>
                    <Col xs="12">
                        {this.loadButtonRow()}
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <Table className="table-bordered">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {this.loadTableHeader()}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.loadLineUp()}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    {this.loadModal()}
                    {this.loadScorebox()}
                    <BottomMenu>
                        <BottomMenuItem color="success"
                            textColor="white"
                            onClick={this.updateScorecard}>
                            Save
                        </BottomMenuItem>
                        <BottomMenuItem color="primary"
                            textColor="white"
                            onClick={this.completeScorecard}>
                            Complete
                        </BottomMenuItem>
                        <BottomMenuItem color="secondary"
                            textColor="white"
                            onClick={this.openScorebox}>
                            Open Scorebox
                        </BottomMenuItem>
                    </BottomMenu>
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
        scorecard: ScorecardSelectors.one(state.scorecards, ownProps.$stateParams.scorecardId)
    }
}

const ConnectedComponent = connect(mapStateToProps)(Scorecard)

export default ConnectedComponent;