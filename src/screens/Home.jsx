import React, { useRef, useState, useEffect } from "react";
import { logout, useAuth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const imageRef = useRef(null);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const navigate = useNavigate();

  const currentUser = useAuth();
  const email = currentUser?.email;
  const parts = email?.split("@gmail.com");

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const updateRotation = (e) => {
      const centerX = image.offsetLeft + image.offsetWidth / 2;
      const centerY = image.offsetTop + image.offsetHeight / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const rotationY = (deltaX / centerX) * 40;
      const rotationX = -(deltaY / centerY) * 40;

      setRotationX(rotationX);
      setRotationY(rotationY);
    };

    window.addEventListener("mousemove", updateRotation);

    return () => {
      window.removeEventListener("mousemove", updateRotation);
    };
  }, []);

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {
      alert("Error!");
    }
  }

  return (
    <div className="">
      <div className="h-screen flex justify-center items-center flex-col gap-20 ">
        <div className="flex justify-center flex-col items-center">
          <div className="text-white text-2xl">
            👋Hii! {parts ? parts : "Loading..."},
          </div>
          <div className="text-white text-2xl">
            Now you can play with your Image
          </div>
          <Link to="/upload">
            <div className="text-gray-400 my-2 cursor-pointer">
              Change Image 👆
            </div>
          </Link>
          <button onClick={() => handleLogout()}>
            <div className="text-gray-400  cursor-pointer">LogOut 👋</div>
          </button>
        </div>
        <img
          src={currentUser?.photoURL}
          className="w-52 h-52"
          alt="YourImage"
          ref={imageRef}
          style={{
            // position: "absolute",
            transform: `perspective(500px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
            transition: "transform 0.2s",
          }}
        />
      </div>
    </div>
  );
}

export default Home;
