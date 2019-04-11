import React, { Component } from 'react';
import AuthSelectors from 'store/selectors/auth';
import AuthActions from 'store/action-creators/auth';
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
        AuthActions.logout()
            .then(() => {
                this.toggle();
                if (router.stateService.current.requireAuth) {
                    router.stateService.go('dashboard')
                }
            })
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md" className="main-navbar">
                <Container>
                    <Col sm="3">    
                        <UISref to="dashboard">
                            <NavbarBrand>Baseball</NavbarBrand>
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
                                    <div onClick={this.toggle} id="PopoverMenu">{this.props.currentUser.first_name}</div>
                                    <Popover 
                                        placement="left-start" 
                                        isOpen={this.state.isOpen} 
                                        target="PopoverMenu" 
                                        toggle={this.toggle}
                                        hideArrow>
                                        <ListGroup>
                                                {/* <ListGroupItem onClick={this.navigateToProfile} action>
                                                    <div>Profile</div>
                                                </ListGroupItem> */}
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

// TopNavbar.propTypes = {
//     currentUser: PropTypes.object.isRequired
// }

const mapStateToProps = state => {
    return {
        currentUser: AuthSelectors.current(state.currentUser)
    }
}

const MainNavbar = connect(mapStateToProps)(TopNavbar)

export default MainNavbar;