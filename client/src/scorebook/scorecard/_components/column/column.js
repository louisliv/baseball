import React, { Component } from 'react';

class Column extends Component {
    render() {
        var columnNumber = this.props.columnNumber
        return (<th className="text-center">{columnNumber}</th>)
    }
}

export default Column;