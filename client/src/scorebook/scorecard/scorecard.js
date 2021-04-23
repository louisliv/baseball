import _ from 'lodash';
import React, { Component } from 'react';

import { connect } from 'react-redux';

import ScorecardActions from 'store/action-creators/scorecards';
import ScorecardSelectors from 'store/selectors/scorecards';

import { 
    Row, 
    Col
} from 'reactstrap'

class Scorecard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        ScorecardActions.get(this.props.$stateParams.scorecardId)
    }

    render() {
        if (!_.isEmpty(this.props.scorecard)) {

            return (
                <Row>
                    <Col xs="12">
                        Here
                    </Col>
                </Row>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.currentUser,
        scorecard: ScorecardSelectors.one(state.scorecards, ownProps.$stateParams.scorecardId)
    }
}

const ConnectedComponent = connect(mapStateToProps)(Scorecard)

export default ConnectedComponent;