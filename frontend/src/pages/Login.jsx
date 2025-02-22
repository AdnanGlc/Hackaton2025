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
                    <div className="self-center">Log In</div>
                    <div className="self-center text-base leading-loose text-white">
                        Please sign in to your existing account
                    </div>
                </div>
            </div>
            <form className="flex flex-col px-6 pt-6 pb-28 mt-[-150px] w-full bg-white h-full">
                <InputField label="Email" type="email" placeholder="example@gmail.com" />
                <InputField label="Password" type="password" placeholder="**********" />
                <div className="flex gap-10 mt-6 w-full">
                    <CheckboxWithLabel label="Remember me" />
                    <TextLink text="Forgot Password" />
                </div>
                <Link to="/">
                    <Button text="Log In" />
                </Link>
                <div className="flex gap-2.5 self-center mt-10 max-w-full text-center items-end w-[249px]">
                    <div className="grow text-base text-gray-500">
                        Don't have an account?
                    </div>
                    <Link to="/signup">
                        <TextLink text="Sign Up" uppercase bold />
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
