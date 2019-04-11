import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';

import { Barchart} from 'utils/charts'

class Dashboard extends Component {

    componentDidMount() {}

    constructor(props) {
        super(props);

        this.state = {
            data: [
                {x: "Guy", y: 10},
                {x: "Steve", y: 5},
                {x: "Van", y: 15}
            ],
            radialData: {percent: 75}
        };
    }

    render() {
        return (
            <div className="dashboard">
                <Row>
                    <Col xs="12">
                        <h1>Dashboard</h1>
                    </Col>
                    <Col xs="4">
                        <Card>
                            <CardBody>
                                <CardTitle>Test</CardTitle>
                                <Barchart data={this.state.data}/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Dashboard;