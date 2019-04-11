import Constants from 'utils/constants';
import _ from 'lodash';

class PositionsList {
    constructor(roster) {
        this.pitcher = {
            label: 'Pitchers',
            list: []
        };
        this.catcher = {
            label: 'Catchers',
            list: []
        };
        this.firstBase = {
            label: 'First Basemen',
            list: []
        };
        this.secondBase = {
            label: 'Second Baseman',
            list: []
        };
        this.thirdBase = {
            label: 'Third Basemen',
            list: []
        };
        this.shortStop = {
            label: 'Shortstops',
            list: []
        };
        this.leftField = {
            label: 'Left Fielders',
            list: []
        };
        this.centerField = {
            label: 'Center Fielders',
            list: []
        };
        this.rightField = {
            label: 'Right Fielders',
            list: []
        };
        this.designatedHitter = {
            label: 'Designated Hitters',
            list: []
        };

        this.populateList(roster);
    }

    populateList(roster) {
        _.forEach(roster, (player) => {
            switch(player.position.code) {
                case Constants.playerPositions.PITCHER:
                    this.pitcher.list.push(player)
                    break;
                case Constants.playerPositions.CATCHER:
                    this.catcher.list.push(player)
                    break;
                case Constants.playerPositions.FIRST_BASE:
                    this.firstBase.list.push(player)
                    break;
                case Constants.playerPositions.SECOND_BASE:
                    this.secondBase.list.push(player)
                    break;
                case Constants.playerPositions.THIRD_BASE:
                    this.thirdBase.list.push(player)
                    break;
                case Constants.playerPositions.SHORTSTOP:
                    this.shortStop.list.push(player)
                    break;
                case Constants.playerPositions.LEFT_FIELD:
                    this.leftField.list.push(player)
                    break;
                case Constants.playerPositions.CENTER_FIELD:
                    this.centerField.list.push(player)
                    break;
                case Constants.playerPositions.RIGHT_FIELD:
                    this.rightField.list.push(player)
                    break;
                case Constants.playerPositions.DESIGNATED_HITTER:
                    this.designatedHitter.list.push(player)
                    break;
                default:
                    break;
            }
        })
    }
}

export default PositionsList;