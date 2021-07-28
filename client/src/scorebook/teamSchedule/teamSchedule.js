import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import {Row, Col, Card, CardBody} from 'reactstrap';

import TeamBrands from 'utils/team-branding';

import { useSelector } from 'react-redux';
import { router } from 'router';

import TeamActions from 'store/action-creators/teams';
import TeamSelectors from 'store/selectors/teams';

import ScheduleActions from 'store/action-creators/schedules';
import ScheduleSelectors from 'store/selectors/schedules';

import BigCalendar from 'react-big-calendar';
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment);

const TeamSchedule = (props) => {
    const team = useSelector(state => TeamSelectors.one(state.teams, props.$stateParams.teamId));
    const teamSchedule = useSelector(state =>
        ScheduleSelectors.teamSchedule(state.schedules, props.$stateParams.teamId)
    )
    const [teamBrand, setTeamBrand] = useState({})
    const [events, setEvents] = useState([])

    useEffect(() =>{
        TeamActions.get(props.$stateParams.teamId);
        ScheduleActions.getByTeam(props.$stateParams.teamId, new Date().getFullYear());
    }, [])

    useEffect(() => {
        if (team.id){
            setTeamBrand(TeamBrands[team.id])
        }

        if (team.id && !_.isEmpty(teamSchedule)) {
           let eventList = [];

            _.forEach(teamSchedule, (date) => {
                _.forEach(date.games, (game) => {
                    let homeGame = game.teams.home.team.id === team.id;
                    let title = homeGame ?
                        `vs ${game.teams.away.team.name}`: 
                        `@ ${game.teams.home.team.name}`;
                    let event = {
                        start: new Date(game.gameDate),
                        end: new Date(game.gameDate),
                        title: title,
                        allDay: false,
                        homeGame: homeGame,
                        data: game
                    }
                    eventList.push(event);
                })
            })

            setEvents(eventList); 
        }
    }, [team, teamSchedule])

    const backgroundSetter = (game) => {
        if (game.homeGame) {
            return {style: {backgroundColor: teamBrand.primary}}
        } else {
            return {style: {backgroundColor: teamBrand.secondary}}
        }
    }

    const onEventSelect = (event, e) => {
        router.stateService.go(
            'scorebook.game', 
            { gameId: event.data.gamePk }
        )
    }

    return (
        <Row className="team-schedule">
            <Col xs="12" className="text-center">
                <h2>{team.name}</h2>
            </Col>
            <Col xs="12" style={{minHeight: '600px'}}>
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    eventPropGetter={backgroundSetter}
                    resizable
                    onSelectEvent={onEventSelect}
                    views={['month']}/>
            </Col>
            <Col xs={{ size: 3, offset: 9 }}>
                <Card>
                    <CardBody>
                        {!_.isEmpty(teamBrand) ?
                            <div className="flex-row flex-center">
                                <div className="flex-row flex-center flex-by-half">
                                    <div className="colorbox" 
                                        style={{backgroundColor: teamBrand.primary}}>
                                    </div>
                                    <div>Home</div>
                                </div>
                                <div className="flex-row flex-center">
                                    <div className="colorbox" 
                                        style={{backgroundColor: teamBrand.secondary}}>
                                    </div>
                                    <div>Away</div>
                                </div>
                            </div>
                            :
                            <></>
                        }
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default TeamSchedule;