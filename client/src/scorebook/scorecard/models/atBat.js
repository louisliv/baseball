class AtBat {
    constructor(playerId, lineupSpot, team, data) {
        this.playerId = playerId;
        this.lineupSpot = lineupSpot;
        this.team = team;
        this.strikes = 0;
        this.balls = 0;
        this.outcome = '';

        if (data) {
            this.reInit(data)
        }
    }

    reInit(data) {
        this.strikes = data.strikes;
        this.balls = data.balls;
        this.outcome = data.outcome;
    }

    toJson() {
        return {
            playerId: this.playerId,
            lineupSpot: this.lineupSpot,
            strikes: this.strikes,
            balls: this.balls,
            result: this.outcome
        }
    }

    addStrike() {
        if (this.strikes < 3) {
            this.strikes++;
        }
    }

    addBall() {
        if (this.balls < 4) {
            this.balls++;
        }
    }

    removeStrike() {
        if (this.strikes > 0) {
            this.strikes--;
        }
    }

    removeBall() {
        if (this.balls > 0) {
            this.balls--;
        }
    }

    addOutcome(result) {
        this.outcome = result;
    }
}

export default AtBat; 