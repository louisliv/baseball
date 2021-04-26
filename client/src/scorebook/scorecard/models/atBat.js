class AtBat {
    constructor(playerId, lineupSpot, team) {
        this.playerId = playerId;
        this.lineupSpot = lineupSpot;
        this.team = team;
        this.strikes = 0;
        this.balls = 0;
        this.result = '';
    }

    toJson() {
        return {
            playerId: this.playerId,
            lineupSpot: this.lineupSpot,
            strikes: this.strikes,
            balls: this.balls,
            result: this.result
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

    addResult(result) {
        this.result = result;
    }
}

export default AtBat; 