import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';

class Radial extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                percent: this.props.data.percent
            });
        }, 500)
    }

    constructor(props) {
        super(props);

        this.state = {
            percent: 0
        };
    }

    render() {
        let percent = this.state.percent
        return (
            <div>
                <svg viewBox="0 0 300 300" width="100%" height="100%">
                    <VictoryPie
                        standalone={false}
                        animate={{ duration: 1 }}
                        width={300} height={300}
                        data={[{ x: 1, y: percent }, { x: 2, y: 100 - percent }]}
                        innerRadius={120}
                        cornerRadius={25}
                        labels={() => null}
                        style={{
                            data: { fill: (d) => 
                                {
                                    const color = d.y > 30 ? "green" : "red";
                                    return d.x === 1 ? color : "transparent";
                                }
                            }
                        }}
                    />
                    <VictoryAnimation duration={1}>
                        {() => {
                            return (
                                <VictoryLabel
                                textAnchor="middle" verticalAnchor="middle"
                                x={150} y={150}
                                text={`${Math.round(percent)}%`}
                                style={{ fontSize: 45 }}
                                />
                            );
                        }}
                    </VictoryAnimation>
                </svg>
            </div>
        );
    }
}

Radial.propTypes = {
    data: PropTypes.object.isRequired
}

export default Radial;