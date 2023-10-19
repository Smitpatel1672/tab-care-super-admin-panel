import React from 'react';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';

export default function ReactSelect() {
    const colourOptions = [
        { value: 'ocean', label: 'Ocean', color: 'blue' },
        { value: 'blue', label: 'Blue', color: 'blue' },
        { value: 'purple', label: 'Purple', color: 'purple' },
        { value: 'red', label: 'Red', color: 'red' },
        { value: 'green', label: 'Green', color: 'green' },
        // Add more options as needed
    ];

    const animatedComponents = makeAnimated();

    const colourStyles: StylesConfig = {
        option: (styles, { isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected ? 'blue' : 'white',
                color: isSelected ? 'white' : 'black',
            };
        },
    };

    return (
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[colourOptions[4], colourOptions[5]]}
            isMulti
            styles={colourStyles}
            options={colourOptions}
        />
    );
}
