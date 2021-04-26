import _ from 'lodash';
import AtBat from "./atBat";

class Inning {
    constructor(inningNum) {
        this.inningNumber = inningNum;
        this.atBats = {};
        this.outs = 0;
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