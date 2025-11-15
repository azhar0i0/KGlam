import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// ✅ Custom Toast Component
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed bottom-5 right-5 max-w-xs w-full bg-white shadow-xl rounded-lg p-4 flex items-center gap-3 border-l-4 ${
      type === "success" ? "border-green-500" : "border-red-500"
    }`}
  >
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
      {type === "success" ? (
        <FaCheckCircle className="text-green-500 text-lg" />
      ) : (
        <FaTimesCircle className="text-red-500 text-lg" />
      )}
    </div>
    <div className="text-sm text-gray-700">{message}</div>
    <button
      onClick={onClose}
      className="ml-auto text-gray-400 hover:text-gray-600 text-lg"
    >
      &times;
    </button>
  </div>
);

const Profile = () => {
  const [username, setUsername] = useState("Admin");
  const [email, setEmail] = useState("admin@company.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (newPassword === confirmPassword) {
        setToast({ message: "Profile updated successfully!", type: "success" });
      } else {
        setToast({ message: "Passwords do not match!", type: "error" });
      }
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 4000);
    }, 1000);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        <p className="text-gray-500">Update your profile information below.</p>
      </div>

      {/* Profile Info */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:w-1/2"
      >
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#01ABAB] outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#01ABAB] outline-none"
          />
        </div>
      </form>

      <hr className="border-gray-200 mb-10" />

      {/* Password Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Change Password
        </h2>
        <p className="text-gray-500">Change your password securely below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#01ABAB] outline-none"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#01ABAB] outline-none"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#01ABAB] outline-none"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#01ABAB] text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-[#019999] transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Profile;
