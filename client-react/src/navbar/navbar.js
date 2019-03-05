import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Auth } from "api/models/auth/auth";
import AuthActions from 'store/action-creators/auth/auth';
import Avatar from 'utils/avatar/avatar';
import { isEmpty } from 'lodash';

import {
    Navbar,
    NavbarBrand,
    Nav,
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    Container,
    Col,
    Form,
    Popover,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

import { UISref } from '@uirouter/react'
import { router } from 'router';
import { connect } from 'react-redux';

class TopNavbar extends Component {
    componentWillMount() {
        Auth.getAll({}, 'current')
            .then((response) =>{
                this.props.dispatch(AuthActions.setCurrent(response.data))
            })
    }

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isOpen: false,
            value: ''
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        router.stateService.go('mediaitems.search', {
            searchTerm: this.state.value
        });
    }

    navigateToProfile = () => {
        router.stateService.go('auth.profile')
        this.toggle()
    }

    handleLogout = () => {
        Auth.post({}, 'logout')
            .then((response) => {
                this.toggle();
                this.props.dispatch(AuthActions.clearCurrent())
                router.stateService.go('home')
            })
    }

    render() {
        return (
            <Navbar color="inverse" light expand="md">
                <Container>
                    <Col sm="3">    
                        <UISref to="home">
                            <NavbarBrand>Vine2</NavbarBrand>
                        </UISref>
                    </Col>
                    <Col sm="6">
                        <Form onSubmit={this.handleSubmit}>
                            <InputGroup>
                                <Input 
                                    type="text" 
                                    placeholder="Enter Search Term"
                                    value={this.state.value}
                                    onChange={this.handleChange}/>
                                <InputGroupAddon addonType="append">
                                    <Button 
                                        type="button"
                                        color="primary"
                                        onClick={this.handleSubmit}>
                                        Search
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                    </Col>
                    <Col sm="3">
                        <Nav className="ml-auto text-right" navbar>
                            {isEmpty(this.props.currentUser) &&
                                <div style={{width:'100%'}}>
                                    <UISref to="auth.login">
                                        <Button color="success">Login</Button>
                                    </UISref>
                                </div> 
                            }
                            {!isEmpty(this.props.currentUser) &&
                                <div style={{width:'100%'}}>
                                    <div onClick={this.toggle}><Avatar user={this.props.currentUser} id="PopoverMenu"/></div>
                                    <Popover 
                                        placement="left-start" 
                                        isOpen={this.state.isOpen} 
                                        target="PopoverMenu" 
                                        toggle={this.toggle}
                                        hideArrow>
                                        <ListGroup>
                                                <ListGroupItem onClick={this.navigateToProfile} action>
                                                    <div>Profile</div>
                                                </ListGroupItem>
                                                <ListGroupItem onClick={this.handleLogout} action>
                                                    <div>Logout</div>
                                                </ListGroupItem>
                                        </ListGroup>
                                    </Popover>
                                </div>
                            }
                        </Nav>
                    </Col>
                </Container>
            </Navbar>
        )
    }
}

TopNavbar.propTypes = {
    currentUser: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const MainNavbar = connect(mapStateToProps)(TopNavbar)

export default MainNavbar;