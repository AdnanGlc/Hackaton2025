import React from "react";

const Footer = () => {
    return (
        <div className="flex z-10 flex-col px-6 pt-4 pb-8 -mt-3 w-full rounded-3xl bg-slate-100">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/c3576bb934964cda99a86429ad19bef0/dc4062365308dbfe513e8131dbad3f5473e86967a8da02395c7f865af961a92c?apiKey=c3576bb934964cda99a86429ad19bef0&"
                className="object-contain w-full rounded-xl aspect-[2.39]"
                alt="Footer image"
            />
        </div>
    );
};

export default Footer;