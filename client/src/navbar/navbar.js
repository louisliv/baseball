import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';

import Constants from 'utils/constants';

const TopNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentUser = useSelector(state => state.currentUser);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = () => {
        AuthActions.logout()
            .then(() => {
                toggle();
                if (router.stateService.current.requireAuth) {
                    router.stateService.go('home')
                }
            })
    }

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
                        {isEmpty(currentUser) &&
                            <div>
                                <UISref to="auth.login">
                                    <Button color="success">Login</Button>
                                </UISref>
                            </div> 
                        }
                        {!isEmpty(currentUser) &&
                            <div>
                                <div onClick={toggle} 
                                    id="PopoverMenu"
                                    className="nav-item">
                                    {currentUser.username}
                                </div>
                                <Popover 
                                    placement="left-start" 
                                    isOpen={isOpen} 
                                    target="PopoverMenu" 
                                    toggle={toggle}
                                    hideArrow>
                                    <ListGroup>
                                        {/* <ListGroupItem onClick={this.const navigateToProfile} action>
                                            <div>Profile</div>
                                        </ListGroupItem> */}
                                        <ListGroupItem onClick={handleLogout} action>
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

export default TopNavbar;