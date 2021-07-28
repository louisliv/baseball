import _ from 'lodash';
import Actions from 'store/action-constants/scorecards';

var initialState = {
    byId: {},
    byGame: {}
};

function scorecards(state = initialState, action) {
    let newById;
    let newByGame;
    let gameId;
    let userId;

    switch (action.type) {
        case Actions.SCORECARDS_GET_SUCCESS:
        case Actions.SCORECARDS_GET_BY_GAME_SUCCESS:
            if (action.payload.returnCurrent) {
                return state
            }

            newById = _.clone(state.byId);
            newById[action.payload.scorecard.id] = action.payload.scorecard;
            newByGame = _.clone(state.byGame);
            gameId = action.payload.scorecard.game_id;
            userId = action.payload.scorecard.user

            if (!newByGame[gameId]) {
                newByGame[gameId] = {}
            }

            newByGame[gameId][userId] = action.payload.scorecard

            return Object.assign({}, state, {
                byId: newById,
                byGame: newByGame
            })

        case Actions.SCORECARDS_ADD_SUCCESS:
        case Actions.SCORECARDS_UPDATE_SUCCESS:
            newByGame = _.clone(state.byGame);
            gameId = action.payload.scorecard.game_id;
            userId = action.payload.scorecard.user

            if (!newByGame[gameId]) {
                newByGame[gameId] = {}
            }

            newByGame[gameId][userId] = action.payload.scorecard

            return {
                ...state,
                byId: {...state.byId, [action.payload.scorecard.id]: action.payload.scorecard},
                byGame: {...state.byGame, [gameId]: newByGame[gameId]}
            }
            
        default:
            return state
    }
}

export default scorecards;