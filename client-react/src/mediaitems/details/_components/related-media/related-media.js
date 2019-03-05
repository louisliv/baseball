import React, { Component } from 'react';
import styles from './related-media.css';
import MediaItems from 'api/models/mediaitems/mediaitems';

import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import { UISref } from '@uirouter/react'

import { originBaseUrl } from 'api/api';

class RelatedMedia extends Component {
    loadRelatedMedia() {
        MediaItems.one(this.props.mediaitem.id).getAll({}, 'related')
            .then((response) => {
                this.setState({
                    relatedMedia: response.data
                })
            })
    }

    componentDidMount() {
        this.loadRelatedMedia();
    }

    constructor(props) {
        super(props);

        this.state = {
            relatedMedia: []
        };
    }

    render() {
        var relatedMedia  = this.state.relatedMedia.map(function(item) {
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
                            alt="" />
                        {mediaitem.title}
                    </ListGroupItem>
                </UISref>
            );
        });
        return (
            <ListGroup>
                {relatedMedia}
            </ListGroup>
        )
    }
}

export default RelatedMedia;