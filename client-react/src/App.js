import React, { Component } from 'react';
import { MainNavbar } from './navbar';
import { Sidebar } from 'sidebar/sidebar';
import { router } from 'router';
import { UIRouter, UIView } from '@uirouter/react';

import { 
    Container,
    Col,
    Row
} from 'reactstrap';

class App extends Component {
    render() {
        return (
            <UIRouter router={router}>
                <Container fluid>
                    <Row>
                        <Col xs="2">
                            <Sidebar />
                        </Col>
                        <Col xs="10">
                            <MainNavbar />
                            <UIView />
                        </Col>
                    </Row>
                </Container>
            </UIRouter> 
        );
    }
}

export default App;