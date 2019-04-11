import React, { Component } from 'react';

import { ProfileInfo } from "./_components/info/info";
import { CurrentAvatar } from "./_components/current-avatar/current-avatar";
import { isEmpty } from 'lodash';
import Profiles from 'api/models/profiles/profiles';
import AuthActions from 'store/action-creators/auth/auth';
import {toastr} from 'react-redux-toastr'
import {customToastrOptions} from 'utils/toastr/toastr';

import { 
    Container,
    Row,
    Col 
} from "reactstrap";

import { connect } from 'react-redux'

class ConnectedProfile extends Component {
    updateAvatar = (base64Image) => {
        Profiles.one(this.props.profile.id).post({
            avatar: base64Image
        }, 'update_avatar')
            .then((response) => {
                this.props.dispatch(AuthActions.setCurrent(response.data))
                this.toggleModal()
            })
    }

    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false
        }
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    submitForm = (profile) => {
        Profiles.one(this.props.profile.id).put(profile)
            .then((response) => {
                toastr.success('Success!', 'Profile saved successfully.', customToastrOptions)
                this.props.dispatch(AuthActions.setCurrent(response.data))
            });
    }
    
    render() {
        return (
            <Container>
                {!isEmpty(this.props.profile) &&
                    <Row>
                        <Col sm="8">
                            <ProfileInfo profile={this.props.profile} onSubmit={this.submitForm}/>
                        </Col>
                        <Col sm="4">
                            <CurrentAvatar 
                                profile={this.props.profile} 
                                onSubmit={this.updateAvatar}
                                toggle={this.toggleModal}
                                isOpen={this.state.modalOpen}/>
                        </Col>
                    </Row>
                }
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.currentUser
    }
}

const Profile = connect(mapStateToProps)(ConnectedProfile)

export {Profile};