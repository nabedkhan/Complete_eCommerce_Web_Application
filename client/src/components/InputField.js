import React from 'react';

const InputField = ({ value, type, handler, name }) => (
    <div className="form-group">
        <label className="mb-0 text-secondary">{name}</label>
        <input
            type={type || 'text'}
            name={name.toLowerCase()}
            className="form-control"
            value={value}
            onChange={handler}
            required
        />
    </div>
);

export default InputField;
