import React from 'react';
import Select from 'react-select';

const SelectColorInput = ({ setColor }) => {
    const options = [
        { value: 'green', label: 'Green', color: "#22c55e" },
        { value: 'red', label: 'Red', color: '#dc2626' },
        { value: 'yellow', label: 'Yellow', color: '#ca8a04' },
        { value: 'gray', label: 'Gray', color: '#4b5563' },
        { value: 'blue', label: 'Blue', color: '#2563eb' }
    ]

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = (data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color

                        : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? (color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor:
                        data.color


                },
            };
        },
        input: (styles) => ({ ...styles }),
        placeholder: (styles) => ({ ...styles }),
        singleValue: (styles, { data }) => ({ ...styles }),
    };

    return (
        <Select
            placeholder={'Select Color'}
            options={options}
            styles={colourStyles}
            isSearchable={false}
            onChange={(selectedOption) => setColor(selectedOption.value)}
        />
    );
};

export default SelectColorInput;