import React, { Component } from 'react';
import MediaItems from 'api/models/mediaitems/mediaitems';
import Comment from "./_components/comment/comment";
import Add from "./_components/add/add";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {toastr} from 'react-redux-toastr'
import {customToastrOptions} from 'utils/toastr/toastr';

import {
    ListGroup,
    ListGroupItem,
    Card,
    CardBody,
    CardTitle,
    Collapse
} from 'reactstrap';

class Comments extends Component {
    loadComments() {
        MediaItems.one(this.props.mediaitem.id).getAll({}, 'comments')
            .then((response) => {
                this.setState({
                    comments: response.data
                })
            })
    }

    componentDidMount() {
        this.loadComments();
    }

    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            openForm: false,
            newCommentText: ''
        };
    }

    toggleForm = () => {
        this.setState({
            openForm: !this.state.openForm,
            newCommentText: ''
        })
    }

    onTextChange = (e) => {
        this.setState({
            newCommentText: e.target.value
        })
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        MediaItems.one(this.props.mediaitem.id).post({
            text: this.state.newCommentText
        }, 'comments')
            .then((response) => {
                var comments = [response.data, ...this.state.comments];
                comments.push(response.data);
                this.setState({
                    comments: comments
                })
                toastr.success('Success!', 'Comment posted.', customToastrOptions);

                this.toggleForm()
            })
    }

    render() {
        var allComments  = this.state.comments.map(function(item) {
            var comment = item
            return (
                <ListGroupItem key={comment.id}>
                    <Comment comment={comment} />
                </ListGroupItem>
            );
        });

        return (
            <Card>
                <CardBody>
                    <CardTitle>
                        <div className="flex_row v_center space_between">
                            <div>Comments</div>
                            <FontAwesomeIcon icon={faPlus} onClick={this.toggleForm} />
                        </div>
                    </CardTitle>
                    <ListGroup flush>
                        <Collapse isOpen={this.state.openForm}>
                            <ListGroupItem>
                                <Add 
                                    text={this.state.newCommentText} 
                                    onChange={this.onTextChange}
                                    onSubmit={this.onFormSubmit}
                                    onCancel={this.toggleForm}/>
                            </ListGroupItem>
                        </Collapse>
                        {allComments.length? allComments: <p className="italized text-muted">No comments yet.</p>}
                    </ListGroup>
                </CardBody>
            </Card>
        )
    }
}

export default Comments;