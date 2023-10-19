import React from 'react'
import '../styles/input_with_label.css'
import { FormGroup, Input } from 'reactstrap'

export const InputWithLabel = (props) => {
    return (
        <FormGroup className="input-with-label" key={props.heading}>
            {props.heading && <p className="heading">{props.heading}</p>}
            <Input type="text" placeholder={props.placeholder} onChange={props.onChange} value={props.value} />
        </FormGroup>
    )
}
