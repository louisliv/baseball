export default {
    one: (games, id) => {
        return games.byId[id] ? games.byId[id] : {}
    }
};