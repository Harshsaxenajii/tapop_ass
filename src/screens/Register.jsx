import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, useAuth } from "../firebase";

function Register() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();

  async function handleRegister() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/upload");
    } catch {
      alert("Error!");
    }

    setLoading(false);
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col w-fit gap-4">
        <div className="text-xl text-green-400">Register With Your Details</div>
        <input
          ref={emailRef}
          className="bg-transparent outline-none border-[1px] px-4 py-2 border-gray-300 rounded-sm text-gray-300 focus:border-green-600 transition-all ease-in-out delay-200"
          type="text"
          placeholder="Enter Your Email"
        />
        <input
          ref={passwordRef}
          className="bg-transparent outline-none border-[1px] px-4 py-2 border-gray-300 rounded-sm text-gray-300 focus:border-green-600 transition-all ease-in-out delay-200"
          type="password"
          placeholder="Enter Your Password"
        />

        <button
          disabled={loading}
          onClick={handleRegister}
          className="bg-transparent outline-none border-[1px] px-4 py-2 border-gray-300 rounded-sm text-gray-300 focus:border-green-600 transition-all ease-in-out delay-200 bg-green-600 hover:bg-green-700"
        >
          Submit
        </button>
        <Link to={"/login"}>
          <div className="text-gray-600 cursor-pointer text-sm">
            Already Registered? SignIn
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Register;
