import {api} from 'api/api-mlb.js';

let baseParams = {}

var Divisions = api.createModel('divisions', baseParams);

export default Divisions;