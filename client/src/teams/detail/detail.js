import _ from 'lodash';
import React, { Component } from 'react';
import {
    Row,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavLink,
    NavItem
} from 'reactstrap';

import PositionsList from './position-class';
import Position from './_components/position';

import { connect } from 'react-redux';

import TeamActions from 'store/action-creators/teams';
import TeamSelectors from 'store/selectors/teams';

import classnames from 'classnames';

class TeamDetail extends Component {

    componentWillMount() {
        TeamActions.get(this.props.$stateParams.teamId);
        TeamActions.getCoaches(this.props.$stateParams.teamId);
        TeamActions.getRoster(this.props.$stateParams.teamId);
    }

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    getCoaches() {
        let coachesObject = {
            label: 'Coaches',
            list: this.props.coaches
        }

        return (
            <div>
                <Position position={coachesObject} isCoach/>
            </div>
        )
    }
        
    getPlayerPositions() {
        let elements = [];
        this.positions = new PositionsList(this.props.roster);

        _.forEach(this.positions, (position, key) => {
            if (position.list.length) {
                elements.push(
                    <Col key={key} xs="12" md="6">
                        <Position position={position}/>
                    </Col>
                )
            }
        })

        return elements;
    }

    render() {
        return (
            <Row>
                <Col xs="12">
                    <h2>{this.props.team.name}</h2>
                </Col>
                <Col xs="12">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                >
                                Players
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                >
                                Coaches
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col xs="12">
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="2">
                            <Row>
                                <Col xs="12">
                                    {this.getCoaches()}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="1">
                            <Row>
                                {this.getPlayerPositions()}
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        coaches: TeamSelectors.coaches(state.teams, ownProps.$stateParams.teamId),
        roster: TeamSelectors.roster(state.teams, ownProps.$stateParams.teamId),
        team: TeamSelectors.one(state.teams, ownProps.$stateParams.teamId)
    }
}

const ConnectedComponent = connect(mapStateToProps)(TeamDetail)
export default ConnectedComponent;