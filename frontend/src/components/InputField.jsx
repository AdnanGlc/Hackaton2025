import React from "react";

function InputField({ label, type, placeholder, value, onChange }) {
    const id = `${label.toLowerCase().replace(/\s+/g, '-')}-input`;

    return (
        <div className="mb-6">
            <label htmlFor={id} className="block text-sm uppercase text-neutral-700 mb-2">
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}        // Bind the value to the parent state
                onChange={onChange}  // Call the onChange function passed from parent
                className="px-5 py-6 w-full text-sm text-gray-400 rounded-xl bg-slate-100"
                aria-label={label}
            />
        </div>
    );
}

export default InputField;
