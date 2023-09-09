import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { upload, useAuth } from "../firebase";

function UploadImage() {
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const currentUser = useAuth();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleClick() {
    await upload(photo, currentUser, setLoading);
    navigate("/");
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col w-fit gap-4">
        <div className="text-xl text-green-400">View & Upload Image</div>

        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={handleChange}
        />
        <label
          className="flex gap-2 items-center cursor-pointer"
          htmlFor="file"
        >
          <img className="w-8 h-8 " src="./folder.png" alt="" />
          <span className="text-gray-400">
            {selectedFileName ? selectedFileName : "Upload Image"}
          </span>
        </label>

        <div className="border-[1px] border-gray-400 h-44 flex justify-center items-center">
          {previewImage && (
            <div>
              <img src={previewImage} alt="Preview" className="w-32" />
            </div>
          )}
        </div>

        <button
          disabled={loading || !photo}
          onClick={handleClick}
          className="bg-transparent outline-none border-[1px] px-4 py-2 border-gray-300 rounded-sm text-gray-300 focus:border-green-600 transition-all ease-in-out delay-200 bg-green-600 hover:bg-green-700"
        >
          {loading ? "loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default UploadImage;
