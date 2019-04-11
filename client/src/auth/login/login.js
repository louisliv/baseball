import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Auth } from "api/models/auth/auth";
import AuthActions from 'store/action-creators/auth';
import { router } from 'router';

import { 
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody
} from 'reactstrap';

class ConnectedLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            creds: {
                username: '',
                password: ''
            }
        }
    }

    update = (name, e) => {
        var creds = this.state.creds;
        creds[name] = e.target.value;
        this.setState({ creds: creds });
    }

    onSubmit = (e) => {
        e.preventDefault();
        AuthActions.login(this.state.creds)
            .then(() => {
                router.stateService.go('dashboard');
            })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm="12" md={{size: 6, offset: 3}}>
                        <Card>
                            <CardBody>
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <Label>Username</Label>
                                        <Input 
                                            type="text" 
                                            placeholder="johndoe"
                                            value={this.state.creds.username}
                                            onChange={(e) => this.update("username", e)}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input 
                                            type="password" 
                                            placeholder="password#1"
                                            value={this.state.creds.password}
                                            onChange={(e) => this.update("password", e)}/>
                                    </FormGroup>
                                    <FormGroup className="text-right">
                                        <Button type='submit' color="success">Login</Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const Login = connect(mapStateToProps)(ConnectedLogin);

export {Login};