import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, useAuth } from "../firebase";

function Login() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col w-fit gap-4">
        <div className="text-xl text-orange-400">Login With Your Details</div>
        <input
          ref={emailRef}
          className="bg-transparent outline-none border-[1px] px-4 py-2 border-gray-300 rounded-sm text-gray-300 focus:border-orange-600 transition-all ease-in-out delay-200"
          type="text"
          placeholder="Enter Your Email"
        />
        <input
          ref={passwordRef}
          className="bg-transparent outline-none border-[1px] px-4 py-2 border-gray-300 rounded-sm text-gray-300 focus:border-orange-600 transition-all ease-in-out delay-200"
          type="password"
          placeholder="Enter Your Password"
        />

        <button
          disabled={loading}
          onClick={() => handleLogin()}
          className="bg-transparent outline-none border-[1px] px-4 py-2 border-gray-300 rounded-sm text-gray-300 focus:border-orange-600 transition-all ease-in-out delay-200 bg-orange-600 hover:bg-orange-700"
        >
          Submit
        </button>
        <Link to={"/register"}>
          <div className="text-gray-600 cursor-pointer text-sm">
            Not Registered? Register Now
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
