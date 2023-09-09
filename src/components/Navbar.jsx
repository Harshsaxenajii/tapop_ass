import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full justify-center items-center flex absolute py-6">
      <div className="w-fit">
        <div className="flex justify-center gap-5 ">
          <Link to={"/"}>
            <ul className="text-white cursor-pointer hover:text-gray-300">Home</ul>
          </Link>
          <Link to={"/login"}>
            <ul className="text-white cursor-pointer hover:text-orange-500">Login</ul>
          </Link>
          <Link to={"/register"}>
            <ul className="text-white cursor-pointer hover:text-green-500">Register</ul>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
