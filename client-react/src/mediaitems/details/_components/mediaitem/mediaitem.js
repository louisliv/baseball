import React, { Component } from 'react';

import {
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';

import './mediaitem.css';
import MediaItems from 'api/models/mediaitems/mediaitems';
import MediaPlayer from 'utils/mediaplayer/mediaplayer';
import Avatar from "utils/avatar/avatar";
import Filters from 'utils/filters/filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { UISref } from '@uirouter/react'

class MediaItem extends Component {
    constructor(props) {
        super(props)

        var icon = props.mediaitem.user_loves ? fasHeart : farHeart;
        
        this.state = {
            icon: icon,
            mediaitem: props.mediaitem
        }
    }

    toggleLove = () => {
        MediaItems.one(this.state.mediaitem.id).post({}, 'toggle_user_love')
            .then((response) => {
                this.setState({
                    mediaitem: response.data,
                    icon: response.data.user_loves ? fasHeart : farHeart
                })
            })
    }

    render() {
        return (
            <Card>
                <MediaPlayer mediaitem={this.state.mediaitem}/>
                <CardBody>
                    <div className="flex_row v-center space_between mediaitem-info">
                        <div>
                            <CardTitle>{this.state.mediaitem.title}</CardTitle>
                            <UISref to="profiles.details" params={{id: this.state.mediaitem.uploader.id}}>
                                <div className="flex_row v-center avatar-row">
                                        <Avatar user={this.state.mediaitem.uploader} />
                                    <div style={{marginLeft:10}}>
                                        <div>{this.state.mediaitem.uploader.username}</div>
                                        <small className="text-muted">{Filters.getDate(this.state.mediaitem.uploaded_on)}</small>
                                    </div>
                                </div>
                            </UISref>
                        </div>
                        <div className="text-muted text-center">
                            <FontAwesomeIcon 
                                icon={this.state.icon}
                                className="transform"
                                onClick={this.toggleLove}/>
                            <div>{this.state.mediaitem.love_count}</div>
                        </div>
                    </div>
                    <div>{this.state.mediaitem.description}</div>
                </CardBody>
            </Card>
        )
    }
}

export default MediaItem;