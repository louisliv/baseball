import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

class Barchart extends Component {

    componentDidMount() {}

    render() {
        return (
            <VictoryChart
                domainPadding={50}
                animate={{ duration: 2000, easing: "bounce" }}>
                <VictoryBar
                    style={{ data: { fill: "#c43a31" } }}
                    data={this.props.data}
                    barWidth={75}/>
                <VictoryAxis 
                    style={{ axis: {stroke: "none"}, ticks: { stroke: 'none' }, }} />
                <VictoryAxis
                    crossAxis
                    style={{ticks: { stroke: 'none' }, }} />
            </VictoryChart>
        );
    }
}

Barchart.propTypes = {
    data: PropTypes.array.isRequired
}

export default Barchart;