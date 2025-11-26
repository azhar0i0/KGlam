import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Custom Toast
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.3 }}
    className={`fixed bottom-5 right-5 max-w-xs w-full bg-white shadow-lg rounded-md p-4 flex items-center gap-3 border-l-4 ${
      type === "success" ? "border-[#01ABAB]" : "border-red-500"
    }`}
  >
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
      {type === "success" ? <FaCheckCircle className="text-[#01ABAB]" /> : <FaTimesCircle className="text-red-500" />}
    </div>
    <div className="text-sm text-gray-700">{message}</div>
    <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600 text-lg">
      &times;
    </button>
  </motion.div>
);

// Minimalistic Input
const MinimalInput = ({ label, type, value, onChange, showToggle, showValue, setShowValue }) => (
  <div className="relative w-full mt-6">
    <input
      type={showToggle && showValue ? "text" : type}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="w-full border-b-2 border-gray-300 focus:border-[#01ABAB] outline-none py-2 text-sm peer bg-transparent"
    />
    <label className="absolute left-0 -top-3 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:-top-3 peer-focus:text-[#01ABAB] peer-focus:text-sm">
      {label}
    </label>
    {showToggle && (
      <button
        type="button"
        onClick={() => setShowValue(!showValue)}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {showValue ? <FaEyeSlash /> : <FaEye />}
      </button>
    )}
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

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (newPassword && newPassword !== confirmPassword) {
        setToast({ message: "Passwords do not match!", type: "error" });
      } else {
        setToast({ message: "Profile updated successfully!", type: "success" });
      }
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h2>
        <p className="text-gray-500 mt-1">Update your profile information below.</p>
      </div>

      {/* Profile Info */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-15">
        <MinimalInput label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <MinimalInput label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </form>

      <hr className="border-gray-200" />

      {/* Password Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Change Password</h2>
        <p className="text-gray-500 mb-4">Change your password securely below.</p>
        <form onSubmit={handleSaveChanges} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MinimalInput
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            showToggle
            showValue={showCurrentPassword}
            setShowValue={setShowCurrentPassword}
          />
          <MinimalInput
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            showToggle
            showValue={showNewPassword}
            setShowValue={setShowNewPassword}
          />
          <MinimalInput
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showToggle
            showValue={showConfirmPassword}
            setShowValue={setShowConfirmPassword}
          />
        </form>

        <div className="flex justify-end mt-6">
          <motion.button
            type="submit"
            onClick={handleSaveChanges}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#01ABAB] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#019999] transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </motion.button>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
