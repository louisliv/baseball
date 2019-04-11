export default {
    one: (divisions, id) => {
        return divisions.byId[id] ? divisions.byId[id] : {}
    },
    list: (divisions) => {
        return divisions.raw
    }
};