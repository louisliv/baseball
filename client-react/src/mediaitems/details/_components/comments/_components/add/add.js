import React, { Component } from 'react';

import {
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';

class Add extends Component {
    render() {
        return (
            <Form onSubmit={this.props.onSubmit}>
                <FormGroup>
                    <Input type="textarea" value={this.props.text} onChange={this.props.onChange}/>
                </FormGroup>
                <FormGroup className="text-right">
                    <Button color="warning" onClick={this.props.onCancel}>Cancel</Button>{" "}
                    <Button type="submit" color="success">Add Comment</Button>
                </FormGroup>
            </Form>
        )
    }
}

export default Add;