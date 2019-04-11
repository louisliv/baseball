import _ from 'lodash';
import React, { Component } from 'react';
import {
    Col,
    Row
} from 'reactstrap';

import { connect } from 'react-redux';

import LeagueActions from 'store/action-creators/leagues';
import LeagueSelectors from 'store/selectors/leagues';
import DivisionActions from 'store/action-creators/divisions';
import DivisionSelectors from 'store/selectors/divisions';
import TeamActions from 'store/action-creators/teams';
import TeamSelectors from 'store/selectors/teams';

import Division from './_components/division';

class Teams extends Component {
    componentWillMount() {
        LeagueActions.getAll();
        DivisionActions.getAll();
        TeamActions.getAll();
    }

    createLeagues() {
        let leagues = []

        // Outer loop to create parent
        _.forEach(this.props.leagues, (league) => {
            let url = 'http://localhost:4567' + league.logo_url

            let divisions = [];

            _.forEach(this.props.divisions, (division) => {
                if (division.league.id === league.league_id) {
                    divisions.push(
                        <div key={division.id}>
                            <Division division={division} teams={this.props.teams}/>
                        </div>
                    )
                }
            })

            leagues.push(
                <Row key={league.league_id}>
                    <Col xs="12">
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={url} width="150px" height="150px" alt="Logo"/> <h2>{league.name}</h2>
                        </div>
                        {divisions}
                    </Col>
                </Row>
            )
        })
        return leagues
    }

    render() {
        return (
            <Row className="leagues">
                <Col xs="12">
                    {this.createLeagues()}
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        leagues: LeagueSelectors.list(state.leagues),
        divisions: DivisionSelectors.list(state.divisions),
        teams: TeamSelectors.list(state.teams)
    }
}

const ConnectedComponent = connect(mapStateToProps)(Teams)
export default ConnectedComponent;