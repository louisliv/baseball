import React from 'react';

import { 
    NavItem,
    NavLink
} from 'reactstrap'

const BottomMenuItem = (props) => {
    const {
        onClick,
        color,
        textColor
    } = props;

    return (<NavItem><NavLink className={`btn btn-${color} text-${textColor}`} onClick={onClick}>{props.children}</NavLink></NavItem>)
}

export default BottomMenuItem;