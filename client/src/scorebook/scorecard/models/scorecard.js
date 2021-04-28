import _ from 'lodash';
import Inning from "./inning";
import TeamEnum from "./teamEnum";

class Scorecard {
    constructor(data) {
        this.plays = {
            awayTeam: {},
            homeTeam: {}
        };

        if (data.started) {
            this.reInit(data);
        } else {
            this.init(data);
        }
    }

    init(data) {
        this.lineups = data.lineups;
        this.homeTeam = data.homeTeam;
        this.awayTeam = data.awayTeam;
        this.startersSet = data.startersSet;
        this.innings = 9;
        this.currentInning = 1;
        this.currentTeam = 0;
        this.homeTeamLineupSpot = 1;
        this.awayTeamLineupSpot = 1;

        this.plays.awayTeam = this.initInnings();
        this.plays.homeTeam = this.initInnings();

        this.plays.awayTeamRuns = 0;
        this.plays.homeTeamRuns = 0;

        this.started = true;
    }

    initInnings() {
        var innings = {}
        for(var i = 1; i <= 9; i++) {
            innings[i] = new Inning(i)
        }

        return innings;
    }

    reInit(data) {
        var self = this;
        this.lineups = data.lineups;
        this.homeTeam = data.homeTeam;
        this.awayTeam = data.awayTeam;
        this.startersSet = data.startersSet;
        this.innings = data.innings;
        this.currentInning = data.currentInning;
        this.currentTeam = data.currentTeam;
        this.homeTeamLineupSpot = data.homeTeamLineupSpot;
        this.awayTeamLineupSpot = data.awayTeamLineupSpot;
        this.started = data.started;

        this.plays.awayTeamRuns = data.plays.awayTeamRuns;
        this.plays.homeTeamRuns = data.plays.homeTeamRuns;

        _.forEach(TeamEnum, (team, teamKey) => {
            _.forEach(data.plays[team], (inningData) => {
                self.plays[team][inningData.inningNumber] = 
                    new Inning(inningData.inningNumber, inningData, teamKey)
            })
        })
    }

    toJson() {
        var awayPlays = {};
        var homePlays = {};

        _.forEach(this.plays.awayTeam, (value, key) => {
            awayPlays[key] = value.toJson();
        })

        _.forEach(this.plays.homeTeam, (value, key) => {
            homePlays[key] = value.toJson();
        })

        return {
            lineups: this.lineups,
            homeTeam: this.homeTeam,
            awayTeam: this.awayTeam,
            startersSet: this.startersSet,
            innings: this.innings,
            started: this.started,
            currentInning: this.currentInning,
            currentTeam: this.currentTeam,
            homeTeamLineupSpot: this.homeTeamLineupSpot,
            awayTeamLineupSpot: this.awayTeamLineupSpot,

            plays: {
                awayTeam: awayPlays,
                homeTeam: homePlays,
                awayTeamRuns: this.plays.awayTeamRuns,
                homeTeamRuns: this.plays.homeTeamRuns
            }
        }
    }

    addInning() {
        this.innings++;

        this.plays.awayTeam[this.innings] = 
            new Inning(this.innings);
        
        this.plays.homeTeam[this.innings] = 
            new Inning(this.innings);
    }

    goToNextHalfInning() {
        var currentPlayer;
        if (this.currentTeam === 0) {
            this.currentTeam = 1;
            this.incrementLineupSpot(this.homeTeamLineupSpot);
            currentPlayer = 
                this.getCurrentPlayer(this.currentTeam, this.homeTeamLineupSpot)
            this.plays.homeTeam[this.currentInning] = 
                new Inning(this.currentInning, currentPlayer);
        } else {
            this.currentTeam = 0;
            this.currentInning++;

            if (this.currentInning > 9) {
                this.addInning();
            }

            this.incrementLineupSpot(this.awayTeamLineupSpot);
            currentPlayer = 
                this.getCurrentPlayer(this.currentTeam, this.awayTeamLineupSpot)
            this.plays.awayTeam[this.currentInning] = 
                new Inning(this.currentInning, currentPlayer);
        }
    }

    incrementLineupSpot(teamLineupSpot) {
        if (teamLineupSpot === 9) {
            teamLineupSpot = 1;
        } else {
            teamLineupSpot++;
        }
    }

    getCurrentPlayer(team, spot) {
        var indexString = TeamEnum[team];

        return this.lineups[indexString][spot];
    }

    addRun(team) {
        switch (team) {
            case 0:
                this.plays.awayTeamRuns++;
                break;
            case 1:
                this.plays.homeTeamRuns++;
                break;
            default:
                break;
        }
    }

    removeRun(team) {
        var runRef;

        switch (team) {
            case 0:
                runRef = 'awayTeamRuns';
                break;
            case 1:
                runRef = 'homeTeamRuns';
                break;
            default:
                break;
        }

        if (this.plays[runRef] > 0) {
            this.plays[runRef]--;
        }
    }

    getAtBat(team, inning, lineupSpot) {
        var teamString = TeamEnum[team];

        return this.plays[teamString][inning].atBats[lineupSpot];
    }

    addAtBat(inning, atBat) {
        var team = TeamEnum[atBat.team];
        var lineupSpot = atBat.lineupSpot;

        this.plays[team][inning].addAtBat(atBat, lineupSpot);
    }
}

export default Scorecard;