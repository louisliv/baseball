import loading from './reducers/loading';
import leagues from './reducers/leagues';
import divisions from './reducers/divisions';
import teams from './reducers/teams';
import players from './reducers/players';
import schedules from './reducers/schedules';
import games from './reducers/games';
import currentState from './reducers/current-state';
import scorecards from './reducers/scorecards';
import auth from './reducers/auth'
// import {reducer as toastrReducer} from 'react-redux-toastr'

function appStore(state = {}, action) {
    return {
        loading: loading(state.loading, action),
        leagues: leagues(state.leagues, action),
        divisions: divisions(state.divisions, action),
        teams: teams(state.teams, action),
        players: players(state.players, action),
        schedules: schedules(state.schedules, action),
        games: games(state.games, action),
        currentState: currentState(state.currentState, action),
        currentUser: auth(state.currentUser, action),
        scorecards: scorecards(state.scorecards, action)
        // toastr: toastrReducer(state.toastr, action)
    }
}

export default appStore;