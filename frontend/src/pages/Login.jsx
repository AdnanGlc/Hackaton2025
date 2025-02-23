import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import CheckboxWithLabel from "../components/CheckboxWithLabel";
import circles from "../assets/circles2.png";
import TextLink from "../components/TextLink";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);

  // 🔒 Redirect if user is already logged in
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/");
    }
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/GetUserData", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const userData = await response.json();
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("User data saved to localStorage:", userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://iotimages-f9fegmephhc5c8e7.canadacentral-01.azurewebsites.net/api/LoginUser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (response.ok) {
        await fetchUserData();
        const isFirstLogin = !localStorage.getItem("onboardingCompleted");
        navigate(isFirstLogin ? "/onboarding" : "/");
      } else {
        const data = await response.json();
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
      <form
        className="flex flex-col px-6 pt-6 pb-28 mt-[-150px] w-full bg-white h-full"
        onSubmit={handleLogin}
      >
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
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="flex gap-10 mt-6 w-full">
          <CheckboxWithLabel
            label="Remember me"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <TextLink text="Forgot Password" />
        </div>
        <Button
          text={isLoading ? "Logging In..." : "Log In"}
          disabled={isLoading}
        />
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
