import _ from 'lodash';
import React, { Component } from 'react';

import {Form, FormGroup, Label} from 'reactstrap';
import Select from 'react-select';
import Constants from 'utils/constants';

class LineupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: _.clone(this.props.roster),
            values: {},
            positions: _.clone(Constants.positionAbreviations)
        };

        this.loadFormGroups = this.loadFormGroups.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value, index, isPositionValue) {
        let values = this.state.values;
        let options = this.state.options;

        if (isPositionValue) {
            if (values[index]) {
                values[index].gameDayPosition = value.label;
            } else {
                values.index = {gameDayPosition: value.label}
            }
        } else {
            if (values[index]) {
                _.merge(values[index], value);
            } else {
                values[index] = value
            }
        }

        this.setState({
            options: options,
            values: values
        })
        this.props.onChange(this.state.values);
    }

    customSingleValue({ data }) {
        return (
            <div className="input-select">
                <div className="input-select__single-value">
                    <span>{ data.person.fullName }</span>
                </div>
            </div>
        )
    };

    getOptionValue(option) {
        return option.person.id
    }
    getOptionLabel(option) {
        return option.person.fullName
    }

    loadFormGroups() {
        let groups = [];

        for(let i = 1; i < 10; i++) {
            groups.push(
                <FormGroup key={i} row>
                    <Label sm={1}>{i}</Label>
                    <Select className="col-sm-8"
                        id={i}
                        name={this.props.name}
                        options={this.state.options}
                        onChange={(option) => this.handleChange(option, i)}
                        getOptionValue={this.getOptionValue}
                        getOptionLabel={this.getOptionLabel}/>
                    <Select className="col-sm-3"
                        id={'position'+i}
                        name={'position'+i}
                        options={this.state.positions}
                        onChange={(option) => this.handleChange(option, i, true)}/>
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