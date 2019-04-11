import React, { Component } from 'react';
import { MainNavbar } from './navbar';
import { Sidebar } from 'sidebar/sidebar';
import { UIView } from '@uirouter/react';

import { 
    Container,
    Col,
    Row
} from 'reactstrap';

import { connect } from 'react-redux';

import CurrentStateSelectors from 'store/selectors/current-state';

class App extends Component {
    render() {
        return (
            <Container className="main-container" fluid>
                {this.props.currentState.data && !this.props.currentState.data.excludeSidebar ?
                    <Row className="main-row">
                        <Col xs="1" className="no-padding sidebar-col">
                            <Sidebar />
                        </Col>
                        <Col xs="11" className="no-padding">
                            <MainNavbar />
                            <Container fluid>
                                <UIView />
                            </Container>
                        </Col>
                    </Row>:
                    <Row className="main-row">
                        <MainNavbar />
                        <Container fluid>
                            <UIView />
                        </Container>
                    </Row>
                }
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentState: CurrentStateSelectors.get(state.currentState)
    }
}

const ConnectedComponent = connect(mapStateToProps)(App)
export default ConnectedComponent;