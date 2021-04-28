import _ from 'lodash';
import AtBat from './atBat';

class Inning {
    constructor(inningNum, data, team) {
        this.inningNumber = inningNum;
        this.atBats = {};
        this.outs = 0;

        if (data) {
            this.reInit(data, team);
        }
    }

    reInit(data, team) {
        this.outs = data.outs;

        _.forEach(data.atBats, (atBat, spot) => {
            this.atBats[spot] = new AtBat(
                atBat.playerId,
                atBat.lineupSpot,
                team,
                atBat
            )
        })
    }

    addAtBat(atBat, spot) {
        this.atBats[spot] = atBat
    }

    addOut() {
        if (this.outs < 3) {
            this.outs++;
        }
    }

    toJson() {
        var atBatsTansformed = {};

        _.forEach(this.atBats, (value, key) => {
            atBatsTansformed[key] = value.toJson();
        })

        return {
            inningNumber: this.inningNumber,
            outs: this.outs,
            atBats: atBatsTansformed
        }
    }
}

export default Inning;