import React, { Component } from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';

class Sidebar extends Component {
    render() {
        return (
            <Nav vertical>
                <NavItem>
                    <NavLink href="#">Test</NavLink>
                </NavItem>
            </Nav>
        )
    }
}

export {Sidebar};