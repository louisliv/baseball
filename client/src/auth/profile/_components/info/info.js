import React, { Component } from 'react';

import { 
    Form,
    FormGroup,
    Card,
    CardBody,
    Input,
    Button
} from "reactstrap";

class ProfileInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: props.profile
        }
    }

    update = (name, e) => {
        var profile = this.state.profile;
        profile[name] = e.target.value;
        this.setState({ profile: profile });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.profile);
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <Form name="profileForm" onSubmit={this.onSubmit}>
                        <FormGroup>
                            <label>First Name</label>
                            <Input type="text"  
                                placeholder="John"
                                value={this.state.profile.first_name}
                                onChange={(e) => this.update("first_name", e)}/>
                        </FormGroup>
                        <FormGroup>
                            <label>Last Name</label>
                            <Input type="text"  
                                placeholder="Doe"
                                value={this.state.profile.last_name}
                                onChange={(e) => this.update("last_name", e)}/>
                        </FormGroup>
                        <FormGroup>
                            <label>Email address</label>
                            <Input type="email"  
                                placeholder="name@example.com"
                                value={this.state.profile.email}
                                onChange={(e) => this.update("email", e)}/>
                        </FormGroup>
                        <FormGroup>
                            <label>Username</label>
                            <Input type="text"
                                placeholder="johndoe"
                                value={this.state.profile.username}
                                onChange={(e) => this.update("username", e)}/>
                        </FormGroup>
                        <FormGroup className="text-right">
                            <Button 
                                type="submit" 
                                color="success"
                                onClick={this.onSubmit}>
                                Save
                            </Button>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export {ProfileInfo};