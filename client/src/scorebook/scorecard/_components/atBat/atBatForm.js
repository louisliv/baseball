import React, { Component } from "react";

import _ from "lodash";

import { Outcomes } from "../../models";

import {
Form,
FormGroup,
Input,
InputGroup,
Label,
InputGroupAddon,
Button
} from 'reactstrap';
import Select from 'react-select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

class AtBatForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            atBat: props.atBat
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleNumberButton = this.handleNumberButton.bind(this);
    }

    handleChange(e) {
        console.log(e)
        var atBat = this.state.atBat;

        if (e.target) {
            atBat[e.target.name] = e.target.value;
        } else {
            console.log("here")
            atBat["outcome"] = e.value;
            console.log(atBat);
        }

        this.setState({
            atBat: atBat
        })
    }

    handleNumberButton(e, type, operation) {
        e.preventDefault();
        var atBat = this.state.atBat;

        if (operation === "minus") {
            if (type === "balls") {
                atBat.removeBall();
            } else {
                atBat.removeStrike();
            }
        } else {
            if (type === "balls") {
                atBat.addBall();
            } else {
                atBat.addStrike();
            }
        }

        this.setState({
            atBat: atBat
        });
    }

    render() {
        return (
            <Form onSubmit={(event) =>{this.props.handleSubmit(event, this.props.inning, this.state.atBat)}}>
                <FormGroup row>
                    <Label>Balls</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <Button onClick={(e) => this.handleNumberButton(e, "balls", "minus")}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </Button>
                        </InputGroupAddon>
                        <Input type="number" 
                            min={0} 
                            max={4}
                            name="balls"
                            value={this.state.atBat.balls}
                            onChange={this.handleChange}/>
                        <InputGroupAddon addonType="append">
                            <Button onClick={(e) => this.handleNumberButton(e, "balls", "plus")}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
                <FormGroup row>
                    <Label>Strikes</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <Button onClick={(e) => this.handleNumberButton(e, "strikes", "minus")}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </Button>
                        </InputGroupAddon>
                        <Input type="number" 
                            min={0} 
                            max={3}
                            name="strikes"
                            value={this.state.atBat.strikes}
                            onChange={this.handleChange}/>
                        <InputGroupAddon addonType="append">
                            <Button type="plus" onClick={(e) => this.handleNumberButton(e, "strikes", "plus")}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Outcome</Label>
                    <Select options={_.clone(Outcomes)}
                        name="outcome"
                        onChange={(event) =>{this.handleChange(event)}}/>
                </FormGroup>
            </Form>
        )
    }
}

export default AtBatForm;