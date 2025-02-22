import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import CheckboxWithLabel from "../components/CheckboxWithLabel";
import circles from '../assets/circles2.png'
import TextLink from "../components/TextLink";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [twoFactorCode, setTwoFactorCode] = useState("");  // State for the two-factor code
    const [twoFactorRecoveryCode, setTwoFactorRecoveryCode] = useState("");  // State for recovery code
    const [rememberMe, setRememberMe] = useState(false);  // State for "Remember me"
    const [error, setError] = useState("");  // State for errors
    const [isLoading, setIsLoading] = useState(false);  // State for loading
    const navigate = useNavigate();  // For redirecting after successful login

    // Handle input changes
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleTwoFactorCodeChange = (e) => setTwoFactorCode(e.target.value);
    const handleTwoFactorRecoveryCodeChange = (e) => setTwoFactorRecoveryCode(e.target.value);
    const handleRememberMeChange = () => setRememberMe(!rememberMe);

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:5000/login?useCookies=true&useSessionCookies=true", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    twoFactorCode,
                    twoFactorRecoveryCode,
                }),
                credentials: "include",  // Important: this tells the browser to include cookies
            });

            console.log(response.ok);

            if (response.ok) {
                // Successful login
                console.log(response.ok);
                // Redirect to home or dashboard after login
                navigate("/");  // Adjust this route to your actual home/dashboard route
            } else {
                setError(data.message || "Invalid login credentials.");
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
                <img className="w-full" src={circles} alt="A beautiful scene" />
                <div className="flex flex-col items-center text-3xl font-bold w-full justify-center mb-10 text-white absolute">
                    <div className="self-center">Log In</div>
                    <div className="self-center text-base leading-loose text-white">
                        Please sign in to your existing account
                    </div>
                </div>
            </div>
            <form className="flex flex-col px-6 pt-6 pb-28 mt-[-150px] w-full bg-white h-full" onSubmit={handleLogin}>
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
                    label="Two-Factor Code"
                    type="text"
                    placeholder="Enter 2FA Code"
                    value={twoFactorCode}
                    onChange={handleTwoFactorCodeChange}
                />
                <InputField
                    label="Two-Factor Recovery Code"
                    type="text"
                    placeholder="Enter Recovery Code"
                    value={twoFactorRecoveryCode}
                    onChange={handleTwoFactorRecoveryCodeChange}
                />
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                <div className="flex gap-10 mt-6 w-full">
                    <CheckboxWithLabel label="Remember me" checked={rememberMe} onChange={handleRememberMeChange} />
                    <TextLink text="Forgot Password" />
                </div>
                <Button text={isLoading ? "Logging In..." : "Log In"} disabled={isLoading} />
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
