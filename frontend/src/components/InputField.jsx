import React from "react";

function InputField({ label, type, placeholder }) {
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
                className="px-5 py-6 w-full text-sm text-gray-400 rounded-xl bg-slate-100"
                aria-label={label}
            />
        </div>
    );
}

export default InputField;