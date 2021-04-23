import _ from 'lodash';
import React, { Component } from 'react';

import {Row, Col, Card, CardBody} from 'reactstrap';

import TeamBrands from 'utils/team-branding';

import { connect } from 'react-redux';
import { router } from 'router';

import TeamActions from 'store/action-creators/teams';
import TeamSelectors from 'store/selectors/teams';

import ScheduleActions from 'store/action-creators/schedules';
import ScheduleSelectors from 'store/selectors/schedules';

import BigCalendar from 'react-big-calendar';
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment);

class TeamSchedule extends Component {
    constructor(props) {
        super(props);
        this.backgroundSetter = this.backgroundSetter.bind(this);
    }

    componentWillMount() {
        TeamActions.get(this.props.$stateParams.teamId);
        ScheduleActions.getByTeam(this.props.$stateParams.teamId, new Date().getFullYear());
    }

    backgroundSetter(game) {
        if (game.homeGame) {
            return {style: {backgroundColor: this.teamBrand.primary}}
        } else {
            return {style: {backgroundColor: this.teamBrand.secondary}}
        }
    }

    loadLegendBox() {
        if (this.teamBrand) {
            return (
                <div className="flex-row flex-center">
                    <div className="flex-row flex-center flex-by-half">
                        <div className="colorbox" 
                            style={{backgroundColor: this.teamBrand.primary}}>
                        </div>
                        <div>Home</div>
                    </div>
                    <div className="flex-row flex-center">
                        <div className="colorbox" 
                            style={{backgroundColor: this.teamBrand.secondary}}>
                        </div>
                        <div>Away</div>
                    </div>
                </div>
            )
        }
        return;
    }

    onEventSelect(event, e) {
        router.stateService.go(
            'scorebook.game', 
            {gameId: event.data.gamePk}
        )
    }

    render() {
        let events = [];
        this.teamBrand = TeamBrands[this.props.team.id]; 
        _.forEach(this.props.teamSchedule, (date) => {
            _.forEach(date.games, (game) => {
                let homeGame = game.teams.home.team.id === this.props.team.id;
                let title = homeGame ?
                    'vs' + ' ' + game.teams.away.team.name: 
                    '@' + ' ' + game.teams.home.team.name;
                let event = {
                    start: new Date(game.gameDate),
                    end: new Date(game.gameDate),
                    title: title,
                    allDay: false,
                    homeGame: homeGame,
                    data: game
                }
                events.push(event);
            })
        })

        return (
            <Row className="team-schedule">
                <Col xs="12" style={{minHeight: '600px'}}>
                    <BigCalendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        eventPropGetter={this.backgroundSetter}
                        resizable
                        onSelectEvent={this.onEventSelect}
                        views={['month']}/>
                </Col>
                <Col xs={{ size: 3, offset: 9 }}>
                    <Card>
                        <CardBody>
                            {this.loadLegendBox()}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        team: TeamSelectors.one(state.teams, ownProps.$stateParams.teamId),
        teamSchedule: ScheduleSelectors.teamSchedule(state.schedules, ownProps.$stateParams.teamId)
    }
}

const ConnectedComponent = connect(mapStateToProps)(TeamSchedule)

export default ConnectedComponent;