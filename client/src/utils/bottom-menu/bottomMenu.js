import React from 'react';

import {
    Nav
} from 'reactstrap'

const BottomMenu = (props) => {
    return (<Nav tabs className="bottom-menu">{props.children}</Nav>)
}

export default BottomMenu;