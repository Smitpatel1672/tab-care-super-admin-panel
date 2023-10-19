import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

export default function DateTimePicker(props) {
    return (
        <FormGroup>
            <Label for="exampleDatetime">{props.label}</Label>
            <Input
                id="exampleDatetime"
                name="datetime"
                placeholder={props.placeholder}
                type="datetime"
            />
        </FormGroup>
    );
}
