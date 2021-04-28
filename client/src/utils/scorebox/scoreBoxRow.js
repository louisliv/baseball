import React from 'react';

import Constants from "utils/constants";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const ScoreboxRow = (props) => {
    const {
        team,
        runs,
        onScoreUpdate,
        teamRef
    } = props;

    return (
        <tr>
            <td>
                <img src={Constants.getTeamLogo(team.id, true)} 
                    width="30"
                    alt={team.name}/>
            </td>
            <td className="d-flex align-items-center">
                <span className="run-display">{runs}</span>
                <div className="d-flex flex-column">
                    <FontAwesomeIcon icon={faCaretUp} 
                        size="sm" 
                        className="increment-icon"
                        onClick={()=> onScoreUpdate(teamRef, true)}/>
                    <FontAwesomeIcon icon={faCaretDown} 
                        size="sm" 
                        className="increment-icon"
                        onClick={()=> onScoreUpdate(teamRef)}/>
                </div>
            </td>
        </tr>
    )
}

export default ScoreboxRow;