import React from 'react'
import { FormGroup, Input, Label } from 'reactstrap'

export default function CategoryOption(props) {
    return (
        <>
            <FormGroup>
                <Label for="exampleDatetime" className='category_bar'>{props.label} <span>Add New</span></Label>
                <Input className="mb-3" type="select">
                    <option>{props.option}</option>
                </Input>
            </FormGroup>
        </>
    )
}
