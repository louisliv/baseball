import React, { Component } from 'react';
import './avatar.css';

class Avatar extends Component {
    constructor(props) {
        super(props);

        this.size = props.size ? props.size : 'small';
        this.toIntials = this.toIntials.bind(this)
        this.id = props.id ? props.id : 'avatar'
    }

    toIntials() {
        if (this.props.user) {
			return this.props.user.first_name.charAt(0).toUpperCase() + 
				   this.props.user.last_name.charAt(0).toUpperCase();
		} else {
			return;
		}
    }

    render() {
        var avatar;
        if (this.props.user.avatar) {
            avatar = 
                <img 
                    className={'avatar ' + this.size} 
                    src={this.props.user.avatar} 
                    alt=""
                    id={this.id}/>
        } else {
            avatar = 
                <div className="no_avatar">
                    <span className={'avatar ' + this.size} id={this.id}>
                        {this.toIntials()}
                    </span>
                </div>
        }
        return (
            <div>
                {avatar}
            </div>
        )
    }
}

export default Avatar;