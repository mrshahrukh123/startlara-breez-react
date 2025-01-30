import React from 'react';
import Select from 'react-select';

const SelectOption = ({ options, isMulti = false, placeholder = 'Select an option', closeMenuOnSelect = false, onChange, value, className = '', isClearable = true }) => {
    return (
        <Select
            className={className}
            options={options}
            isMulti={isMulti}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            closeMenuOnSelect={closeMenuOnSelect}
            isClearable={isClearable}
            isSearchable={true}
        />
    );
};

export default SelectOption;
