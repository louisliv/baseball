import _ from 'lodash';
import React, { Component } from 'react';

import Team from 'teams/_components/team';

import {
    Col,
    Row
} from 'reactstrap';

class Division extends Component {

    componentDidMount() {}

    createTeams() {
        let teams = []

        _.forEach(this.props.teams, (team) => {
            if (team.division.id === this.props.division.id) {
                teams.push(
                    <Col key={team.id} xs="3">
                        <Team team={team}></Team>
                    </Col>
                )
            }
        })

        return teams
    }

    render() {
        return (
            <Row>
                <Col xs="12"><h4>{this.props.division.name}</h4></Col>
                {this.createTeams()}
            </Row>
        );
    }
}

export default Division;