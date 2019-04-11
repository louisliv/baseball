import {api} from 'api/api-mlb.js';

let baseParams = {
    sportId: 1
}

var Divisions = api.createModel('divisions', baseParams);

export default Divisions;