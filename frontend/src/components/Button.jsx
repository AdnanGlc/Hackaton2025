import React from "react";

function Button({ text }) {
    return (
        <button className="px-16 py-6 mt-7 text-sm font-bold text-center text-white uppercase bg-orange-500 rounded-xl w-full">
            {text}
        </button>
    );
}

export default Button;