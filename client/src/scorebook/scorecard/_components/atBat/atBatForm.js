import React from "react";

import _ from "lodash";

import { AT_BAT_ACTIONS } from "./atBat";

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

const AtBatForm = (props) => {

    const submit = (e) => {
        e.preventDefault();
        console.log(props.atBat)
        props.handleSubmit(e, props.inning, props.atBat)
    }

    return (
        <Form onSubmit={submit}>
            <FormGroup>
                <Label>Balls</Label>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <Button onClick={() => props.dispatch({type: AT_BAT_ACTIONS.REMOVE_BALL})}>
                            <FontAwesomeIcon icon={faMinus}/>
                        </Button>
                    </InputGroupAddon>
                    <Input type="number" 
                        min={0} 
                        max={4}
                        name="balls"
                        value={props.atBat.balls}
                        onChange={() => props.dispatch({type: AT_BAT_ACTIONS.SET_BALLS})}
                        className="pitch-result"/>
                    <InputGroupAddon addonType="append">
                        <Button onClick={() => props.dispatch({type: AT_BAT_ACTIONS.ADD_BALL})}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label>Strikes</Label>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <Button onClick={() => props.dispatch({type: AT_BAT_ACTIONS.REMOVE_STRIKE})}>
                            <FontAwesomeIcon icon={faMinus}/>
                        </Button>
                    </InputGroupAddon>
                    <Input type="number" 
                        min={0} 
                        max={3}
                        name="strikes"
                        value={props.atBat.strikes}
                        onChange={() => props.dispatch({type: AT_BAT_ACTIONS.SET_STRIKES})}
                        className="pitch-result"/>
                    <InputGroupAddon addonType="append">
                        <Button onClick={() => props.dispatch({type: AT_BAT_ACTIONS.ADD_STRIKE})}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label>Outcome</Label>
                <Select options={_.clone(Outcomes)}
                    name="outcome"
                    onChange={event => props.dispatch({type:AT_BAT_ACTIONS.SET_OUTCOME, payload: event.value})}/>
            </FormGroup>
        </Form>
    )
}

export default AtBatForm;