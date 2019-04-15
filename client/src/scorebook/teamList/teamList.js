import _ from 'lodash';
import React, { Component } from 'react';
import Team from 'teams/_components/team';

import { 
    Col, 
    Row,
    Button
} from 'reactstrap';

import { 
    AvForm, 
    AvGroup, 
    AvInput, 
    AvFeedback,
} from 'availity-reactstrap-validation';

import { connect } from 'react-redux';

import TeamActions from 'store/action-creators/teams';
import TeamSelectors from 'store/selectors/teams';

import AuthActions from 'store/action-creators/auth';
import AuthSelectors from 'store/selectors/auth';

class TeamList extends Component {
    constructor(props) {
        super(props);

        this.defaultModel = {
            teamId: ''
        }

        this.addTeam = this.addTeam.bind(this);
        this.state = {
            values: _.clone(this.defaultModel)
        }
    }

    componentWillMount() {
        TeamActions.getAll();
    }

    loadTeams() {
        let teams = [];
        
        if (!_.isEmpty(this.props.teams) && this.props.currentUser.teams) {
            _.forEach(this.props.currentUser.teams, (userTeam) => {
                let teamObj = this.props.teams[userTeam];
                teams.push(
                    <Col key={teamObj.id} xs="3">
                        <Team team={teamObj}></Team>
                    </Col>
                )
            })
            this.loadOptions();
        }

        return teams
    }

    loadOptions() {
        let teams = [];
        
        if (!_.isEmpty(this.props.teams) && this.props.currentUser.teams) {
            _.forEach(this.props.teams, (team) => {
                if (!_.includes(this.props.currentUser.teams, team.id)) {
                    teams.push(
                        <option key={team.id} 
                            value={team.id}>
                            {team.name}
                        </option>
                    )
                }
            })
        }

        return teams;
    }

    addTeam(event) {
        AuthActions.addTeam(this.state.values)
            .then(() => {
                this.setState({values:_.clone(this.defaultModel)})
            })
    }

    update = (name, e) => {
        var values = this.state.values;
        values[name] = e.target.value;
        this.setState({values:values});
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="12">
                        <h2>My Teams</h2>
                    </Col>
                    {this.loadTeams()}

                    <Col xs="12">
                        <AvForm onValidSubmit={this.addTeam} 
                            className="flex-align-beginning"
                            inline
                            innerRef={(c) => { this.form = c; }}
                            model={this.defaultModel}>
                            <AvGroup className="mr-2 flex-row flex-column flex-align-beginning">
                                <AvInput type="select" 
                                    name="teamId"
                                    value={this.state.values.teamId}
                                    onChange={(e) => this.update("teamId", e)}
                                    required>
                                    <option value="">-- Select a Team to Add --</option>
                                    {this.loadOptions()}
                                </AvInput>
                                <AvFeedback>A team must be selected.</AvFeedback>
                            </AvGroup>
                            <AvGroup>
                                <Button color="success">
                                    Add Team
                                </Button>
                            </AvGroup>
                        </AvForm>
                    </Col>  
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: AuthSelectors.current(state.currentUser),
        teams: TeamSelectors.idList(state.teams)
    }
}

const ConnectedComponent = connect(mapStateToProps)(TeamList)
export default ConnectedComponent;