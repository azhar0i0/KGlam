import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ServiceLogo from "@assets/SaloonLogo.png";
import AuthImg from "@assets/AuthImg.png";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const validEmail = "admin@company.com";
    const validPassword = "admin.me";

    if (email === validEmail && password === validPassword) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen overflow-hidden bg-white">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-10 py-10 md:py-0">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src={ServiceLogo}
              alt="KGlame logo"
              className="h-20 md:h-24 w-auto object-contain"
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-3 text-gray-800">
            Sign in to your account
          </h2>
          <p className="text-sm md:text-base text-center mb-6 text-gray-600">
            Welcome back! Please enter your details to continue.
          </p>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm md:text-base font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01ABAB]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm md:text-base font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01ABAB]"
              />
            </div>

            <div className="flex sm:flex-row items-center justify-between mb-6 gap-2 sm:gap-0">
              <Link
                to="/forget-password"
                className="text-sm md:text-base text-[#01ABAB] font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#01ABAB] text-white rounded-md text-lg md:text-xl hover:bg-teal-700 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center py-2 pr-6 bg-gray-50">
        <img
          src={AuthImg}
          alt="Salon interior"
          className="w-[90%] h-[90%] object-contain rounded-l-2xl"
        />
      </div>
    </section>
  );
}

export default Signin;
