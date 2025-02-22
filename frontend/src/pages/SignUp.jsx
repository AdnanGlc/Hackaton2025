import React from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import CheckboxWithLabel from "../components/CheckboxWithLabel";
import circles from '../assets/circles2.png'
import TextLink from "../components/TextLink";

function LoginForm() {
    return (
        <div className="flex overflow-hidden flex-col mx-auto w-full bg-gray-900 max-w-[480px] h-screen">
            <div className="flex w-full items-center">
                <img className="w-full" src={circles} alt=" A beautiful scene" />
                <div className="flex flex-col items-center text-3xl font-bold w-full justify-center mb-10 text-white absolute">
                    <div className="self-center">Sign Up</div>
                    <div className="self-center text-base leading-loose text-white">
                        Please sign up to get started
                    </div>
                </div>
            </div>
            <form className="flex flex-col px-6 pt-6 pb-28 mt-[-150px] w-full bg-white h-full">
                <InputField label="Name" type="text" placeholder="Your Name" />
                <InputField label="Email" type="email" placeholder="example@gmail.com" />
                <InputField label="Password" type="password" placeholder="**********" />
                <InputField label="Re-Type Password" type="password" placeholder="**********" />
                <Button text="Sign Up" />
            </form>
        </div>
    );
}

export default LoginForm;
