import React from 'react';
import { MainNavbar } from './navbar';
import { UIView } from '@uirouter/react';

import { 
    Container,
    Row
} from 'reactstrap';

const App = () => {
    return (
        <Container className="main-container" fluid>
            <Row className="main-row">
                <MainNavbar />
                <Container fluid>
                    <UIView />
                </Container>
            </Row>
        </Container>
    );
}

export default App;