import React, { Component } from 'react';
import './current-avatar.css';

import Avatar from "utils/avatar/avatar";
import { ChangeAvatarModal } from 'auth/profile/_components/change-avatar/change-avatar';

import { 
    Card,
    CardBody,
    CardTitle,
    Button
} from "reactstrap";

class CurrentAvatar extends Component {
    render() {
        return (
            <Card className="current-avatar-card">
                <CardBody className="text-center">
                    <CardTitle>Current Avatar</CardTitle>
                    <Avatar user={this.props.profile} size="x_large"/>
                    <div className="text-center" style={{marginTop:20}}>
                        <Button onClick={this.props.toggle} color="primary">Change Avatar</Button>
                    </div>
                    <ChangeAvatarModal 
                        modal={this.props.modalOpen} 
                        toggle={this.props.toggle}
                        onSubmit={this.props.onSubmit}
                        isOpen={this.props.isOpen}/>
                </CardBody>
            </Card>
        )
    }
}

export {CurrentAvatar};