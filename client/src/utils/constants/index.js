import React from 'react';
import { UISref } from '@uirouter/react';
import moment from 'moment';

class Constants {
    constructor() {
        this.playerPositions = {
            PITCHER: "1",
            CATCHER: "2",
            FIRST_BASE: "3",
            SECOND_BASE: "4",
            THIRD_BASE: "5",
            SHORTSTOP: "6",
            LEFT_FIELD: "7",
            CENTER_FIELD: "8",
            RIGHT_FIELD: "9",
            DESIGNATED_HITTER: "D"
        }
        this.positionAbreviations = [
            {
                label: 'P',
                value: 1
            },
            {
                label: 'C',
                value: 2
            },
            {
                label: '1B',
                value: 3
            },
            {
                label: '2B',
                value: 4
            },
            {
                label: '3B',
                value: 5
            },
            {
                label: 'SS',
                value: 6
            },
            {
                label: 'LF',
                value: 7
            },
            {
                label: 'CF',
                value: 8
            },
            {
                label: 'RF',
                value: 9
            },
            {
                label: 'DH',
                value: 10
            },
        ]
        this.DATE_FORMAT = 'MMMM D, YYYY'
        this.STORE_DATE_FORMAT = 'MMDDYYYY'
        this.API_DATE_FORMAT = 'MM/DD/YYYY'

        this.DATE_TIME_FORMAT = 'MMMM D, YYYY h:mm a'
        
        this.PITCHING_HEADERS = [
            {
                dataField: 'season',
                text: 'Season',
                sort: true
            },
            {
                dataField: 'team.name',
                text: 'Team',
                formatter: (cell, row, rowIndex, formatExtraData) => {
                    if (row.team) {
                        return (
                            <UISref to="teams.details" params={{teamId: row.team.id}}>
                                <a href>{row.team.name}</a>
                            </UISref>
                        )
                    } else {
                        return (
                            <div>MLB</div>
                        )
                    }
                }
            },
            {
                dataField: 'stat.wins',
                text: 'Wins',
                sort: true
            },
            {
                dataField: 'stat.losses',
                text: 'Losses',
                sort: true
            },
            {
                dataField: 'stat.era',
                text: 'ERA',
                sort: true
            },
            {
                dataField: 'stat.gamesPitched',
                text: 'G',
                sort: true
            },
            {
                dataField: 'stat.gamesStarted',
                text: 'GS',
                sort: true
            },
            {
                dataField: 'stat.gamesFinished',
                text: 'GF',
                sort: true
            },
            {
                dataField: 'stat.completeGames',
                text: 'CG',
                sort: true
            },
            {
                dataField: 'stat.saves',
                text: 'SV',
                sort: true
            },
            {
                dataField: 'stat.inningsPitched',
                text: 'IP',
                sort: true
            },
            {
                dataField: 'stat.hits',
                text: 'H',
                sort: true
            },
            {
                dataField: 'stat.runs',
                text: 'R',
                sort: true
            },
            {
                dataField: 'stat.earnedRuns',
                text: 'ER',
                sort: true
            },
            {   
                dataField: 'stat.homeRuns',
                text:'HR',
                sort: true
            },
            {
                dataField: 'stat.strikeOuts',
                text: 'SO',
                sort: true
            },
            {
                dataField: 'stat.baseOnBalls',
                text: 'BB',
                sort: true
            },
            {
                dataField: 'stat.avg',
                text: 'Avg',
                sort: true
            }
        ]

        this.HITTING_HEADERS = [
            {
                dataField: 'season',
                text: 'Season',
                sort: true
            },
            {
                dataField: 'team.name',
                text: 'Team',
                formatter: (cell, row, rowIndex, formatExtraData) => {
                    if (row.team) {
                        return (
                            <UISref to="teams.details" params={{teamId: row.team.id}}>
                                <a href>{row.team.name}</a>
                            </UISref>
                        )
                    } else {
                        return (
                            <div>MLB</div>
                        )
                    }
                }
            },
            {
                dataField: 'stat.gamesPlayed',
                text: 'G',
                sort: true
            },
            {
                dataField: 'stat.plateAppearances',
                text: 'PA',
                sort: true
            },
            {
                dataField: 'stat.atBats',
                text: 'AB',
                sort: true
            },
            {
                dataField: 'stat.runs',
                text: 'R',
                sort: true
            },
            {
                dataField: 'stat.hits',
                text: 'H',
                sort: true
            },
            {
                dataField: 'stat.doubles',
                text: '2B',
                sort: true
            },
            {
                dataField: 'stat.triples',
                text: '3B',
                sort: true
            },
            {
                dataField: 'stat.homeRuns',
                text: 'HR',
                sort: true
            },
            {
                dataField: 'stat.rbi',
                text: 'RBI',
                sort: true
            },
            {
                dataField: 'stat.stolenBases',
                text: 'SB',
                sort: true
            },
            {
                dataField: 'stat.caughtStealing',
                text: 'CS',
                sort: true
            },
            {
                dataField: 'stat.baseOnBalls',
                text: 'BB',
                sort: true
            },
            {
                dataField: 'stat.strikeOuts',
                text: 'SO',
                sort: true
            },
            {
                dataField: 'stat.avg',
                text: 'AVG',
                sort: true
            },
            {
                dataField: 'stat.obp',
                text: 'OBP',
                sort: true
            },
            {
                dataField: 'stat.slg',
                text: 'SLG',
                sort: true
            },
            {
                dataField: 'stat.ops',
                text: 'OPS',
                sort: true
            }
        ]

        this.FIELDING_HEADERS = [
            {
                dataField: 'season',
                text: 'Season',
                sort: true
            },
            {
                dataField: 'team.name',
                text: 'Team',
                formatter: (cell, row, rowIndex, formatExtraData) => {
                    if (row.team) {
                        return (
                            <UISref to="teams.details" params={{teamId: row.team.id}}>
                                <a href>{row.team.name}</a>
                            </UISref>
                        )
                    } else {
                        return (
                            <div>MLB</div>
                        )
                    }
                }
            },
            {
                dataField: 'stat.position.abbreviation',
                text: 'POS',
                sort: true
            },
            {
                dataField: 'stat.games',
                text:'G',
                sort: true
            },
            {
                dataField: 'stat.gamesStarted',
                text:'GS',
                sort: true
            },
            {
                dataField: 'stat.innings',
                text:'INN',
                sort: true
            },
            {
                dataField: 'stat.chances',
                text:'TC',
                sort: true
            },
            {
                dataField: 'stat.putOuts',
                text:'PO',
                sort: true
            },
            {
                dataField: 'stat.assists',
                text:'A',
                sort: true
            },
            {
                dataField: 'stat.errors',
                text:'E',
                sort: true
            },
            {
                dataField: 'stat.doublePlays',
                text:'DP',
                sort: true
            },
            {
                dataField: 'stat.passedBall',
                text:'PB',
                sort: true
            },
            {
                dataField: 'stat.stolenBases',
                text:'SB',
                sort: true
            },
            {
                dataField: 'stat.caughtStealing',
                text:'CS',
                sort: true
            },
            {
                dataField: 'stat.rangeFactorPerGame',
                text:'RF',
                sort: true
            },
            {
                dataField: 'stat.fielding',
                text:'Fielding %',
                sort: true
            },
        ]
    }

    storeDateFormatter(date) {
        if (moment(date, this.STORE_DATE_FORMAT).isValid()) {
            return date;
        }
        let formattedDate;
        formattedDate = moment(date).format(this.STORE_DATE_FORMAT);
        return formattedDate.toLocaleString();
    }

    apiDateFormatter(date) {
        let formattedDate;
        if (moment(date, this.STORE_DATE_FORMAT).isValid()) {
            formattedDate = moment(date, this.STORE_DATE_FORMAT).format(this.API_DATE_FORMAT);
        } else {
            formattedDate = moment(date).format(this.API_DATE_FORMAT);
        }
        return formattedDate.toLocaleString();
    }

    dateFormatter(date) {
        let formattedDate = moment(date).format(this.DATE_FORMAT);
        return formattedDate.toLocaleString();
    }

    dateTimeFormatter(dateTime) {
        let formattedDateTime = moment(dateTime).format(this.DATE_TIME_FORMAT);
        return formattedDateTime.toLocaleString();
    }

    getPlayerHeadshotUrl(playerId, size, isCoach) {
        let baseUrl = 'http://gdx.mlb.com/images/gameday/mugshots/mlb/';
        let coachesBaseUrl = 'http://mlb.mlb.com/images/coaches/mugshots/';

        let playerUrl = (isCoach ? coachesBaseUrl: baseUrl) + playerId;
        
        switch (size) {
            case 'small':
                playerUrl = playerUrl + '.jpg';
                break;
            case 'medium':
                playerUrl = playerUrl + '@2x.jpg';
                break;
            default:
                playerUrl = playerUrl + '@3x.jpg';
        }

        return playerUrl
    }

    getTeamLogo(teamId) {
        let baseUrl = 'https://www.mlbstatic.com/team-logos/team-cap-on-dark/'

        return baseUrl + teamId + '.svg';
    }
}

const constants = new Constants();

export default constants;