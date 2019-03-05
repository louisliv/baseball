import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import MediaItems from 'api/models/mediaitems/mediaitems';
import Avatar from 'utils/avatar/avatar';
import Filters from 'utils/filters/filters';
import { UISref } from '@uirouter/react'

class Home extends Component {
    loadMediaItems() {
        var self = this;

        MediaItems.getAll()
            .then(function(mediaitems) {
                self.setState({
                    mediaitems: mediaitems.data.results
                });
            });
    }

    componentDidMount() {
        this.loadMediaItems();
    }

    constructor(props) {
        super(props);

        this.state = {
            mediaitems: []
        };
    }

    render() {
        var mediaitems  = this.state.mediaitems.map((mediaitem) => {
            return (
                <UISref 
                    to="mediaitems.details" 
                    params={{id:mediaitem.id}}
                    key={mediaitem.id}>
                    <ListGroupItem className="flex_row v_center space_between" action>
                        <img className="video_thumbnail" src={mediaitem.poster} alt="" />
                        {mediaitem.title}
                        <div className="flex_row v_center">
                            <Avatar user={mediaitem.uploader}></Avatar>
                            <div style={{marginLeft:5}}>
                                <div>{mediaitem.uploader.username}</div>
                                <small>{Filters.fromNow(mediaitem.uploaded_on)}</small>
                            </div>
                        </div>
                    </ListGroupItem>
                </UISref>
            );
        });
        return (
            <Container>
                <Row>
                    <Col>
                        <ListGroup>
                            {mediaitems}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;