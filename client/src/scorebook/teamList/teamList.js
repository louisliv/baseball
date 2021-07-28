import _ from 'lodash';
import React, { useState, useEffect } from 'react';
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

import { useSelector } from 'react-redux';

import TeamActions from 'store/action-creators/teams';
import TeamSelectors from 'store/selectors/teams';

import AuthActions from 'store/action-creators/auth';

const defaultModel = {
    teamId: ''
}

const TeamList = () => {

    const [values, setValues] = useState(defaultModel);
    const teams = useSelector(state => TeamSelectors.idList(state.teams));
    const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
        TeamActions.getAll();
    }, [])

    const hasData = () => {
        return !_.isEmpty(teams) && currentUser.teams;
    }

    const addTeam = (event) => {
        AuthActions.addTeam(values)
            .then(() => {
                setValues(defaultModel)
            })
    }

    const update = (name, e) => {
        setValues({...values, [name]:e.target.value});
    }

    return (
        <div>
            <Row>
                <Col xs="12">
                    <h2>My Teams</h2>
                </Col>
                {hasData() ? 
                    currentUser.teams.map(userTeam => {
                        let teamObj = teams[userTeam];
                        return (
                            <Col key={teamObj.id} xs="12" md="3">
                                <Team team={teamObj}></Team>
                            </Col>
                        )
                    })
                    : 
                    <></>
                }

                <Col xs="12">
                    <AvForm onValidSubmit={addTeam} 
                        className="flex-align-beginning"
                        inline
                        model={defaultModel}>
                        <AvGroup className="mr-2 flex-row flex-column flex-align-beginning">
                            <AvInput type="select" 
                                name="teamId"
                                value={values.teamId}
                                onChange={(e) => update("teamId", e)}
                                required>
                                <option value="">-- Select a Team to Add --</option>
                                {hasData() ? 
                                    _.map(teams, team => {
                                        if (!_.includes(currentUser.teams, team.id)) {
                                            return (
                                                <option key={team.id} 
                                                    value={team.id}>
                                                    {team.name}
                                                </option>
                                            )
                                        }
                                    })
                                    : 
                                    <></>
                                }
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

export default TeamList;