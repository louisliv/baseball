import React, { Component } from 'react';

import { Navbar, Nav, NavbarBrand, NavItem } from 'reactstrap';
import { UISref } from '@uirouter/react';

class Sidebar extends Component {
    render() {
        return (
            <Navbar className="side-bar">
                <Nav vertical>
                    <UISref to="dashboard"><NavbarBrand>Test</NavbarBrand></UISref>
                    <UISref to="teams.list"><NavItem>Teams</NavItem></UISref>
                    <UISref to="scorebook.teamList"><NavItem>Scorebook</NavItem></UISref>
                </Nav>
            </Navbar>
        )
    }
}

export {Sidebar};