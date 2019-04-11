import _ from 'lodash';
import React, { Component } from 'react';
import Player from 'teams/detail/_components/player';
import {
    Col,
    Row,
    Card,
    CardHeader,
    Collapse,
    ListGroup
} from 'reactstrap';

class Position extends Component {

    componentDidMount() {}

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true };
    }

    createPlayers() {
        let table = []

        _.forEach(this.props.position.list, (player, key) => {
            table.push(
                <Player key={key} 
                    player={player}
                    isCoach={this.props.isCoach}/>
            )
        })

        return table
    }

    toggle() {
        this.setState(state => ({ collapse: !state.collapse }))
    }

    render() {
        return (
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader onClick={this.toggle}>{this.props.position.label}</CardHeader>
                        <Collapse
                            isOpen={this.state.collapse}>
                            <ListGroup>
                                {this.createPlayers()}
                            </ListGroup>
                        </Collapse>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Position;