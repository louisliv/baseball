import React, { useEffect, useState } from 'react';
import {
    Jumbotron,
} from 'reactstrap';

import Teams from 'api/models-mlb/teams/teams.js';

const Home = () => {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        Teams.getAll()
            .then((response) => {
                setTeams(response.teams)
            })
    },[])

    return (
        <div className="home">
            <Jumbotron>
            </Jumbotron>
            {teams.map((team, index) => {
                return (<div key={index}>{team.name}</div>)
            })}
        </div>
    );
}

export default Home;