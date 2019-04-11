import React, { Component } from 'react';
import {
    ListGroupItem,
    ListGroupItemHeading,
} from 'reactstrap';
import Constants from 'utils/constants';
import {UISref} from '@uirouter/react';

class Player extends Component {

    componentDidMount() {}

    constructor(props) {
        super(props);

        this.player = this.props.player
    }

    loadRow() {
        return(
            <ListGroupItem>
                <div style={{
                    display: 'flex', 
                    alignItems: 'center'}}>
                    <img src={Constants.getPlayerHeadshotUrl(this.player.person.id, 'small', this.props.isCoach)}
                        alt={this.player.person.fullName}/>
                    <ListGroupItemHeading>
                        {this.player.person.fullName}
                    </ListGroupItemHeading>
                </div>
            </ListGroupItem>
        )
    }

    render() {
        if (!this.props.isCoach) {
            return (
                <UISref to="players.details" params={{id: parseInt(this.player.person.id)}}>
                    {this.loadRow()}
                </UISref>
            );
        }

        return (this.loadRow());
    }
}

export default Player;