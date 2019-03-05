import React, { Component } from 'react';

import { 
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from "reactstrap";

import { UISref } from '@uirouter/react';

import { originBaseUrl } from 'api/api';

import styles from 'mediaitems/details/_components/related-media/related-media.css';

class MediaItemSearch extends Component {
    render() {
        var searchResults  = this.props.searchResults.data.map(function(item) {
            var mediaitem = item
            return (
                <UISref 
                    to="mediaitems.details" 
                    params={{id:mediaitem.id}}
                    key={mediaitem.id}>
                    <ListGroupItem className={styles.mediaitem} action>
                        <img 
                            src={originBaseUrl + mediaitem.poster}
                            className={styles.mediaitem_img}
                            alt="">
                        </img>
                        {mediaitem.title}
                    </ListGroupItem>
                </UISref>
            );
        }); 
        return (
            <Container>
                <Row>
                    <Col sm="12">
                        <ListGroup>
                            {searchResults}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export {MediaItemSearch};