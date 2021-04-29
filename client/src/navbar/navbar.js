import React, { Component } from 'react';
import AuthSelectors from 'store/selectors/auth';
import AuthActions from 'store/action-creators/auth';
import { isEmpty } from 'lodash';

import {
    Navbar,
    NavbarBrand,
    Nav,
    Button,
    Container,
    Col,
    Popover,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

import { UISref } from '@uirouter/react'
import { router } from 'router';
import { connect } from 'react-redux';

import Constants from 'utils/constants';

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
                    router.stateService.go('home')
                }
            })
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md" className="main-navbar">
                <Container fluid>
                    <Col sm="6">    
                        <UISref to="scorebook.teamList">
                            <NavbarBrand>{Constants.siteName}</NavbarBrand>
                        </UISref>
                    </Col>
                    <Col sm="6">
                        <Nav className="ml-auto d-flex justify-content-end" navbar>
                            {isEmpty(this.props.currentUser) &&
                                <div>
                                    <UISref to="auth.login">
                                        <Button color="success">Login</Button>
                                    </UISref>
                                </div> 
                            }
                            {!isEmpty(this.props.currentUser) &&
                                <div>
                                    <div onClick={this.toggle} 
                                        id="PopoverMenu"
                                        className="nav-item">
                                        {this.props.currentUser.username}
                                    </div>
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