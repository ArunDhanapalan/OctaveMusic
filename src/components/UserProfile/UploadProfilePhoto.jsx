import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthUserContext } from "../../context/AuthContextApi";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helper/Spinner";

const UploadProfilePhoto = () => {
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let { authUser } = useContext(AuthUserContext);
  let [photoFile, setPhotoFile] = useState("");
  let [photoPreview, setPhotoPreview] = useState(null);

  let handleFileInputChange = (e) => {
    let file = e.target.files[0];
    setPhotoFile(file);
    // console.log(file);
    //! URL.createObjectURL(file)
    setPhotoPreview(URL.createObjectURL(file));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!photoFile) {
        toast.error("Please select a file before uploading");
        setIsLoading(false);
        return;
      }

      //! Converting image into binary data
      ///~ FormData() -> API
      let fileData = new FormData();
      fileData.append("file", photoFile);
      fileData.append("upload_preset", "music-app-project-qspider");
      fileData.append("cloud_name", "dzqgw31gb");

      //! Upload your binary data to Cloudinary
      let response = await fetch(
        "https://api.cloudinary.com/v1_1/dzqgw31gb/image/upload",
        {
          method: "POST",
          body: fileData,
        }
      );

      let result = await response.json();
      {/*console.log(result);*/}
      let imageUrl = result.url;

      //! Update the profile
      await updateProfile(authUser, {
        photoURL: imageUrl,
      });

      toast.success("Profile Photo updated successfully!");
      navigate("/user/profile");
      location.reload();
    } catch (error) {
      toast.error(error.code.slice(5));
      console.log("Error while uploading:", error);
    }
    setIsLoading(false);
  };
  return (
    <section className="h-full w-full m-5 flex justify-center items-center">
      <article className="w-[70vw] bg-gray-900 flex flex-col justify-center items-center rounded-lg overflow-hidden">
        <header className="w-full">
          <h1 className="w-full text-3xl text-center font-bold uppercase py-6 px-4">
            Upload Profile Photo
          </h1>
        </header>
        {photoPreview === null ? (
          <>
            <div className="w-[150px] h-[150px] border rounded-full flex justify-center items-center border-gray-500 bg-gray-800">
              No File Selected
            </div>
          </>
        ) : (
          <>
            <img
              className="w-[150px] h-[150px] border rounded-full flex justify-center items-center border-gray-500 bg-gray-800 object-fill"
              src={photoPreview}
              alt=""
            />
          </>
        )}
      
      <main className="w-full bg-gray-900">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center  my-3 px-6 ">
            <label htmlFor="">Upload your profile photo here</label>
            <input
              type="file"
              accept="image/*"
              name="photoFile"
              id="profile"
              className="border py-2 px-4 border-gray-500 border-dotted file:bg-white file:text-black file:rounded file:cursor-pointer file:p-2 file:border-none file:mr-3"
              onChange={handleFileInputChange}
            />
          </div>
          <div className="flex justify-center items-center mt-3 mb-5">
            <button className="bg-blue-600 py-2 px-6 hover:bg-blue-700 cursor-pointer text-lg font-semibold rounded-lg">
              Upload Profile
            </button>
          </div>
        </form>
      </main>
      {isLoading && (
        <section className="w-[100%] h-[100vh] bg-black/50 fixed top-0">
          <Spinner />
        </section>
      )}
      </article>
    </section>
  );
};

export default UploadProfilePhoto;
