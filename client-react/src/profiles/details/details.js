import React, { Component } from 'react';
import Profiles from 'api/models/profiles/profiles';

import { 
    Container,
    Row,
    Col,
    Jumbotron,
    Card,
    CardImg,
    CardBody,
    CardTitle
} from 'reactstrap';

import { UISref } from '@uirouter/react';

class ProfileDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mediaitems: []
        }
    }

    componentWillMount() {
        Profiles.one(this.props.profile.id).getAll({}, 'uploaded_media')
            .then((response) => {
                this.setState({
                    mediaitems: response.data
                })
            })
    }

    render() {
        var mediaitems = this.state.mediaitems.map((mediaitem) => {
            return (
                <Col xs="6" md="3">
                    <UISref to="mediaitems.details" params={{id: mediaitem.id}}>
                        <Card>
                            <CardImg src={mediaitem.poster} />
                            <CardBody>
                                <CardTitle>{mediaitem.title}</CardTitle>
                            </CardBody>
                        </Card>
                    </UISref>
                </Col>
            )
        })
        return (
            <Container fluid>
                <Row>
                    <Col style={{paddingLeft:0, paddingRight:0}}>
                        <Jumbotron fluid>
                            <Container fluid>
                                <Col>
                                    {this.props.profile.username}
                                </Col>
                            </Container>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <h3>Uploaded Videos</h3>
                    </Col>
                    {mediaitems}
                </Row>
            </Container>
        )
    }
}

export {ProfileDetails};