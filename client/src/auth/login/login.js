import React, { useState } from 'react';
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

export const Login = () => {
    const [creds, setCreds] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('here')
        AuthActions.login(creds)
            .then(() => {
                console.log('now here')
                router.stateService.go('scorebook.teamList');
            })
    }

    const handleInputChange = (e) => {
        e.persist();
        setCreds(inputs => ({...creds, [e.target.name]: e.target.value}));
    }

    return (
        <Container>
            <Row>
                <Col sm="12" md={{size: 6, offset: 3}}>
                    <Card>
                        <CardBody>
                            <Form onSubmit={onSubmit}>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input 
                                        type="text" 
                                        placeholder="johndoe"
                                        name="username"
                                        value={creds.username}
                                        onChange={handleInputChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input 
                                        type="password" 
                                        placeholder="password#1"
                                        name="password"
                                        value={creds.password}
                                        onChange={handleInputChange}/>
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
