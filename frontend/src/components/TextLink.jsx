import React from "react";

function TextLink({ text, uppercase = false, bold = false }) {
    const classes = `text-sm text-orange-500 ${uppercase ? 'uppercase' : ''} ${bold ? 'font-bold' : ''}`;

    return (
        <a href="#" className={classes}>
            {text}
        </a>
    );
}

export default TextLink;