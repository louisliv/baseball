import _ from 'lodash';
import React, { useEffect, useState } from 'react';
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

import PlayerActions from 'store/action-creators/players';
import PlayerSelectors from 'store/selectors/players';

import classnames from 'classnames';


const PlayerDetail = (props) => {
    const player = PlayerSelectors.one(state => state.players, props.$stateParams.id);
    const seasonStats = PlayerSelectors.seasonStats(state => state.players, props.$stateParams.id);
    const careerStats = PlayerSelectors.careerStats(state => state.players, props.$stateParams.id);
    const fieldingStats = PlayerSelectors.fieldingStats(state => state.players, props.$stateParams.id);

    const [activeTab, setActiveTab] = useState('1');
    const [isPitcher, setIsPitcher] = useState(false)
    const [title, setTitle] = useState('');
    const [headers, setHeaders] = useState([]);
    const [careerHeaders, setCareerHeaders] = useState([]);

    useEffect(() => {
        PlayerActions.get(props.$stateParams.id);
        PlayerActions.getCareerStats(props.$stateParams.id);
        PlayerActions.getSeasonStats(props.$stateParams.id);
        PlayerActions.getFieldingStats(props.$stateParams.id);
    })
    
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }

    const loadData = () => {
        if (seasonStats.group) {
            if (seasonStats.group.displayName === 'pitching') {
                setIsPitcher(true)
            }
        } else {
            setIsPitcher(false);
        }
        
        if (isPitcher) {
            setTitle('Pitching Stats');
            setHeaders(Constants.PITCHING_HEADERS)
        } else {
            setTitle('Hitting Stats')
            setHeaders(Constants.HITTING_HEADERS)
        }

        let careerHeadersArr = _.remove(_.clone(headers), (item) => {
            return item.dataField !== 'season' && item.dataField !== 'team.name';
        });

        setCareerHeaders(careerHeadersArr);

        return (
            <Row>
                <Col xs="12">
                    <div style={{display: 'flex'}}>
                        <img 
                            src={Constants.getPlayerHeadshotUrl(player.id)} 
                            alt={player.fullName}/>
                        <div>
                            <h2>{player.fullName}</h2>
                        </div>
                    </div>
                </Col>
                <Col xs="12">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                                >
                                Career
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                                style={{textTransform: 'capitalize'}}
                                >
                                {seasonStats.group ? seasonStats.group.displayName: ''}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}
                                >
                                Fielding
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
                <Col xs="12">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <StatTable
                                title="Career Stats"
                                headers={careerHeaders}
                                data={careerStats.splits}
                                pitching={isPitcher}
                                keyField="sport.abbreviation"/>
                        </TabPane>
                        <TabPane tabId="2">
                            <StatTable
                                title={title}
                                headers={headers}
                                data={seasonStats.splits}
                                pitching={isPitcher}
                                keyField="index"/>
                        </TabPane>
                        <TabPane tabId="3">
                            <StatTable
                                title="Fielding Stats"
                                headers={Constants.FIELDING_HEADERS}
                                data={fieldingStats.splits}
                                pitching={isPitcher}
                                keyField="index"/>
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        );
    }

    return (loadData());
}


export default PlayerDetail;