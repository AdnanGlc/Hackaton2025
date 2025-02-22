import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import CheckboxWithLabel from "../components/CheckboxWithLabel";
import circles from '../assets/circles2.png'
import TextLink from "../components/TextLink";

function LoginForm() {
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");  // To display error message
    const [isLoading, setIsLoading] = useState(false); // Loading state for button

    // Handle input changes
    const handleUsername = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRePasswordChange = (e) => setRePassword(e.target.value);

    // Handle form submission
    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== rePassword) {
            setError("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/RegisterUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, userName, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle success (e.g., redirect to login or show success message)
                console.log("Sign up successful:", data);
            } else {
                setError(data.message || "An error occurred during sign up.");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

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
            <form className="flex flex-col px-6 pt-6 pb-28 mt-[-150px] w-full bg-white h-full" onSubmit={handleSignUp}>
                <InputField
                    label="Username"
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={handleUsername}
                />
                <InputField
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={handleEmailChange}
                />
                <InputField
                    label="Password"
                    type="password"
                    placeholder="**********"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <InputField
                    label="Re-Type Password"
                    type="password"
                    placeholder="**********"
                    value={rePassword}
                    onChange={handleRePasswordChange}
                />
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                <Button text={isLoading ? "Signing Up..." : "Sign Up"} disabled={isLoading} />
            </form>
        </div>
    );
}

export default LoginForm;
