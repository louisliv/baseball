import _ from 'lodash';
import React, { Component } from 'react';
import {
    Jumbotron,
} from 'reactstrap';

import Teams from 'api/models-mlb/teams/teams.js';

class Home extends Component {

    componentDidMount() {}

    constructor(props) {
        super(props);

        this.state = {
            teams: []
        };

        Teams.getAll()
            .then((response) => {
                this.setState({teams: response.teams})
            })
    }

    createTeams() {
        let table = []

        // Outer loop to create parent
        _.forEach(this.state.teams, (team, key) => {
            
            table.push(<div key={key}>{team.name}</div>)
        })
        return table
    }

    render() {
        return (
            <div className="home">
                <Jumbotron>
                </Jumbotron>
                {this.createTeams()}
            </div>
        );
    }
}

export default Home;