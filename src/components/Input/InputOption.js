import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

export default function InputOption(props) {
    return (
        <>
            {" "}
            <FormGroup>
                <Label for="exampleState">{props.label}</Label>
                <Input className="mb-3" type="select">
                    <option>{props.option}</option>
                </Input>
            </FormGroup>{" "}
        </>
    );
}
