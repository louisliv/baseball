import moment from "moment";

var Filters = {
    getDate(dateString) {
        return moment(dateString).format('MMM D[,] YYYY')
    },

    fromNow(dateString) {
        return moment(dateString).fromNow()
    }
}

export default Filters;