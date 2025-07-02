import React, { useState } from "react";

interface AuthModalProps {
  isLogin: boolean;
  onClose: () => void;
  switchMode: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isLogin,
  onClose,
  switchMode,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !confirmPassword))
      return alert("Please fill all fields");

    if (!isLogin && password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    // TODO: handle login/signup logic here

    alert(isLogin ? "Logged in!" : "Signed up!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div
        className="absolute inset-0  bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      {/* modal */}
      <div className="relative bg-white bg-opacity-70 backdrop-blur-lg rounded-lg w-96 p-8 shadow-lg z-30">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-[#5c745c]">
          {isLogin ? "Login to Pyolliv" : "Sign Up for Pyolliv"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5c745c]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5c745c]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5c745c]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-[#5c745c] text-white font-semibold rounded py-2 hover:bg-[#4a5d4a] transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={switchMode}
            className="text-[#5c745c] font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
