import _ from 'lodash';
import React, { Component } from 'react';

import {Form, FormGroup, Label, Input} from 'reactstrap';
import Select from 'react-select';

import TeamBrands from 'utils/team-branding';
import Constants from 'utils/constants';

class LineupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: _.clone(this.props.roster),
            values: {}
        };

        this.loadFormGroups = this.loadFormGroups.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value, index) {
        let values = this.state.values;
        let options = this.state.options;

        values[index] = value;


        this.setState({
            options: options,
            values: values
        })
        this.props.onChange(this.state.values);
    }

    loadFormGroups() {
        let groups = [];

        for(let i=1; i < 10; i++) {
            groups.push(
                <FormGroup key={i} row>
                    <Label sm={1}>{i}</Label>
                    <Select className="col-sm-11"
                        id={i}
                        name={this.props.name}
                        options={this.state.options}
                        onChange={(option) => this.handleChange(option, i)}/>
                </FormGroup>
            )
        }

        return groups;
    }

    render () {
        return (
            <Form>
                {this.loadFormGroups()}
            </Form>
        )
    }
}

export default LineupForm;