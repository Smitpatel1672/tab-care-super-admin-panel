import React from 'react'
import '../styles/input_with_label.css'

export const InputWithLabel = (props) => {
    return (
        <div className="input-with-label" key={props.heading}>
            <p className="heading">{props.heading}</p>
            <input type="text" placeholder={props.placeholder} onChange={props.onChange} value={props.value}/>
        </div>
    )
}
