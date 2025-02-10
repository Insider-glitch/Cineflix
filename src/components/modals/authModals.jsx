import React, { useState } from "react";
import { supabase } from "./../../lib/supabase";
import { useNavigate } from "react-router-dom";

const AuthModals = ({ closeModal }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reminder, setReminder] = useState(""); // State for reminder message

  const Navigate = useNavigate();
  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setReminder(""); // Reset reminder each time form is submitted

    if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error || !data || !data.user) {
            setError("Login failed. Please check your credentials or confirm your email to login.");
            console.error("Login Error:", error);
            return;
        }

        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("role")
            .eq("id", data.user.id)
            .single();

        if (userError || !userData) {
            setError("User role not found. Contact support.");
            console.error("User Fetch Error:", userError);
            return;
        }

        setSuccess("Login successful!");
        Navigate(userData.role === "admin" ? "/admin" : window.location.reload());
    } else {
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        const { data, error } = await supabase.auth.signUp({ email, password });
        console.log("Signup Response:", { data, error });

        if (error || !data || !data.user) {
            setError("Registration failed. Please try again later.");
            return;
        }

        const { error: insertError } = await supabase.from("users").insert([
            { id: data.user.id, email, role: "user" },
        ]);

        if (insertError) {
            console.error("Insert Error:", insertError);
            setError("Email is already in use. Please use a different email or log in.");
            return;
        }

        setSuccess("Registration successful!");

        if (!data.session) {
            setReminder("Please confirm your email before logging in.");
        }

        setIsLogin(true);
    }
};

  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="relative w-96 rounded-lg bg-neutral-800 p-6 text-white shadow-lg">
        {/* Close Button */}
        <button
          className="absolute right-3 top-2 text-2xl text-white hover:font-bold hover:text-red-700 focus:outline-none"
          onClick={closeModal}
          aria-label="Close"
        >
          &times;
        </button>

        {/* Toggle Buttons */}
        <div className="flex space-x-4">
          <button
            className={`text-2xl font-bold ${
              isLogin ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`text-2xl font-bold ${
              !isLogin ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="mt-4" onSubmit={handleAuth}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-black px-4 py-2 text-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-black px-4 py-2 text-white focus:outline-none"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md bg-black px-4 py-2 text-white focus:outline-none"
                required
              />
            </div>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}
          {reminder && <p className="text-sm text-yellow-500">{reminder}</p>} {/* Display reminder */}
          <button
            type="submit"
            className="w-full rounded-md bg-red-700 px-4 py-2 font-semibold hover:bg-red-800"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModals;
