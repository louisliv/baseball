export default {
    one: (leagues, id) => {
        return leagues.byId[id] ? leagues.byId[id] : {}
    },
    list: (leagues) => {
        return leagues.raw
    }
};