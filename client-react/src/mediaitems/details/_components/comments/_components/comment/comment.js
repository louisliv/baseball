import React, { Component } from 'react';
import Comments from 'api/models/comments/comments';
import Avatar from "utils/avatar/avatar";
import Filters from 'utils/filters/filters';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

class Comment extends Component {
    constructor(props) {
        super(props);

        var icon = props.comment.user_loves ? fasHeart : farHeart;

        this.state = {
            icon: icon,
            comment: props.comment
        };
    }

    toggleLove = () => {
        Comments.one(this.state.comment.id).post({}, 'toggle_user_love')
            .then((response) => {
                this.setState({
                    comment: response.data,
                    icon: response.data.user_loves ? fasHeart : farHeart
                })
            })
    }

    render() {
        return (
            <div>
                <div className="flex_row v_center space_between">
                    <div className="flex_row v_center">
                        <Avatar user={this.state.comment.user} />
                        <div style={{marginLeft:10}}>{this.state.comment.user.username}</div>
                    </div>
                    <div className="text-muted text-center">
                        <FontAwesomeIcon 
                            icon={this.state.icon}
                            className="transform"
                            onClick={this.toggleLove}/>
                        <div>{this.state.comment.love_count}</div>
                    </div>
                </div>
                <div>
                    <small className="text-muted">Commented on: {Filters.getDate(this.state.comment.commented_on)}</small>
                    <div>{this.state.comment.text}</div>
                </div>
            </div>
        )
    }
}

export default Comment;