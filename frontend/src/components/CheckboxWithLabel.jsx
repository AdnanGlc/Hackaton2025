import React from "react";

function CheckboxWithLabel({ label }) {
    const id = `${label.toLowerCase().replace(/\s+/g, '-')}-checkbox`;

    return (
        <div className="flex flex-1 gap-2.5 text-sm text-slate-500">
            <input
                type="checkbox"
                id={id}
                className="w-5 h-5 rounded-md border-2 border-solid border-slate-200"
            />
            <label htmlFor={id} className="my-auto">
                {label}
            </label>
        </div>
    );
}

export default CheckboxWithLabel;