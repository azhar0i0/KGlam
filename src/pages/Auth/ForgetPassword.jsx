import React from "react";
import { Link } from "react-router-dom";
import ServiceLogo from "@assets/SaloonLogo.png";
import AuthImg from "@assets/AuthImg.png";

function ForgetPassword() {
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

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-3 text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-sm md:text-base text-center mb-6 text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {/* Form */}
          <form>
            <div className="mb-6">
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#01ABAB]"
              />
            </div>

            <Link to="/signin">
              <button
                type="submit"
                className="w-full py-3 bg-[#01ABAB] text-white rounded-md text-lg md:text-xl hover:bg-teal-700 transition-colors"
              >
                Send Reset Link
              </button>
            </Link>
          </form>

          {/* Navigation */}
          <p className="text-center mt-5 text-sm md:text-base text-gray-600">
            Remember your password?{" "}
            <Link
              to="/signin"
              className="text-[#01ABAB] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
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

export default ForgetPassword;
