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

import StatTable from 'utils/stats-table';
import Constants from 'utils/constants';

import { connect } from 'react-redux';

import PlayerActions from 'store/action-creators/players';
import PlayerSelectors from 'store/selectors/players';

import classnames from 'classnames';


class PlayerDetail extends Component {

    componentWillMount() {
        PlayerActions.get(this.props.$stateParams.id);
        PlayerActions.getCareerStats(this.props.$stateParams.id);
        PlayerActions.getSeasonStats(this.props.$stateParams.id);
        PlayerActions.getFieldingStats(this.props.$stateParams.id);
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

    setIsPitcher() {
        if (this.props.seasonStats.group) {
            if (this.props.seasonStats.group.displayName === 'pitching') {
                this.isPitcher = true
            }
        } else {
            this.isPitcher = false;
        }
    }

    loadData() {
        this.setIsPitcher();
        
        if (this.isPitcher) {
            this.title = 'Pitching Stats'
            this.headers = Constants.PITCHING_HEADERS
        } else {
            this.title ='Hitting Stats'
            this.headers = Constants.HITTING_HEADERS
        }

        this.careerHeaders = _.remove(_.clone(this.headers), (item) => {
            return item.dataField !== 'season' && item.dataField !== 'team.name';
        });

        return (
            <Row>
                <Col xs="12">
                    <div style={{display: 'flex'}}>
                        <img 
                            src={Constants.getPlayerHeadshotUrl(this.props.player.id)} 
                            alt={this.props.player.fullName}/>
                        <div>
                            <h2>{this.props.player.fullName}</h2>
                        </div>
                    </div>
                </Col>
                <Col xs="12">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                >
                                Career
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                style={{textTransform: 'capitalize'}}
                                >
                                {this.props.seasonStats.group ? this.props.seasonStats.group.displayName: ''}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                                >
                                Fielding
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col xs="12">
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <StatTable
                                title="Career Stats"
                                headers={this.careerHeaders}
                                data={this.props.careerStats.splits}
                                pitching={this.isPitcher}
                                keyField="sport.abbreviation"/>
                        </TabPane>
                        <TabPane tabId="2">
                            <StatTable
                                title={this.title}
                                headers={this.headers}
                                data={this.props.seasonStats.splits}
                                pitching={this.isPitcher}
                                keyField="index"/>
                        </TabPane>
                        <TabPane tabId="3">
                            <StatTable
                                title="Fielding Stats"
                                headers={Constants.FIELDING_HEADERS}
                                data={this.props.fieldingStats.splits}
                                pitching={this.isPitcher}
                                keyField="index"/>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        );
    }

    render() {
        return (this.loadData());
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        player: PlayerSelectors.one(state.players, ownProps.$stateParams.id),
        seasonStats: PlayerSelectors.seasonStats(state.players, ownProps.$stateParams.id),
        careerStats: PlayerSelectors.careerStats(state.players, ownProps.$stateParams.id),
        fieldingStats: PlayerSelectors.fieldingStats(state.players, ownProps.$stateParams.id)
    }
}

const ConnectedComponent = connect(mapStateToProps)(PlayerDetail)
export default ConnectedComponent;