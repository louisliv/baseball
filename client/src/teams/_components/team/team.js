import _ from 'lodash';
import React, { Component } from 'react';
import {
    Card,
    CardTitle,
    CardBody,
    CardImg
} from 'reactstrap';

import { router } from 'router';
import Constants from "utils/constants";
import TeamBrands from "utils/team-branding";

class Team extends Component {
    constructor(props) {
        super(props);
        this.routeToNext = this.routeToNext.bind(this);
        this.brand = TeamBrands[this.props.team.id]
    }
    componentDidMount() {}
    
    routeToNext(e) {
        e.preventDefault();
        if (_.includes(router.stateService.current.name, 'scorebook')) {
            router.stateService.go('scorebook.teamSchedule', {teamId: this.props.team.id})
        } else {
            router.stateService.go('teams.details', {teamId:this.props.team.id})
        }
    }

    render() {
        return (
            <Card onClick={this.routeToNext} className="hoverable">
                <CardImg top 
                    src={Constants.getTeamLogo(this.props.team.id)}
                    style={{backgroundColor: this.brand.primary}}/>
                <CardBody>
                    <CardTitle><h5>{this.props.team.name}</h5></CardTitle>
                </CardBody>
            </Card>
        );
    }
}

export default Team;