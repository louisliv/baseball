import _ from 'lodash';
import React, { Component } from 'react';

import {Table} from 'reactstrap';

class LineupTable extends Component {

    loadLineup() {
        let batters = [];

        _.forEach(this.props.lineup, (player, key) => {
            batters.push(
                <tr key={key}>
                    <th scope="row">{key}</th>
                    <td>{player.person.fullName}</td>
                    <td>{player.gameDayPosition}</td>
                </tr>
            )
        })

        return batters;
    }

    render () {
        return (
            <Table borderless>
                <tbody>
                    {this.loadLineup()}
                </tbody>
            </Table>
        )
    }
}

export default LineupTable;