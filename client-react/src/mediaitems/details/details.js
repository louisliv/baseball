import React, { Component } from 'react';

import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import MediaItem from "./_components/mediaitem/mediaitem";
import RelatedMedia from "./_components/related-media/related-media";
import Comments from "./_components/comments/comments";

class MediaItemDetails extends Component {
    componentWillMount() {
        this.mediaitem = this.props.mediaitem.data
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="8">
                        <MediaItem mediaitem={this.mediaitem}/>
                    </Col>
                    <Col xs="4">
                        <RelatedMedia mediaitem={this.mediaitem}/>
                    </Col>
                    <Col xs="8">
                        <Comments mediaitem={this.mediaitem}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MediaItemDetails;