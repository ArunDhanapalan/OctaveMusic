import React, { useContext, useState } from "react";
import Languages from "./JSON/languages.json";
import Country from "./JSON/countries.json";
import City from "./JSON/city.json";
import State from "./JSON/states.json";
import toast from "react-hot-toast";
import { AuthUserContext } from "../../context/AuthContextApi";
import { doc, setDoc } from "firebase/firestore";
import { __DB } from "../../backend/firebaseconfig";
import { useLocation, useNavigate } from "react-router-dom";

const Addprofile = () => {
  let {authUser} = useContext(AuthUserContext);
  let navigate = useNavigate();
  let location = useLocation()
  let [userDetails, setUserDetails] = useState({
    username: location?.state?.username,
    contactNumber: location?.state?.contactNumber,
    gender: location?.state?.gender,
    dob: location?.state?.dob,
    age: location?.state?.age,
    lang: location?.state?.lang,
    country: location?.state?.country,
    state: location?.state?.state,
    city: location?.state?.city,
    address: location?.state?.address,
    role: "user",
  });

  //! Destructuring the userDetails
  let {
    username,
    contactNumber,
    gender,
    dob,
    age,
    lang,
    country,
    state,
    city,
    address,
  } = userDetails;

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //! Extracting 4 properties from authUser
      let { displayName, photoURL, email, uid } = authUser;

      //! Create an object to send to DB
      //~ Payload - the actual object sent to the DB
      let payload = {
        ...userDetails,
        displayName,
        photoURL,
        email,
        uid,
      };

      //! Step-1: Create the doucment reference inside the DB (Cloud Firestore)
      let user_profile_collection = doc(__DB, "user_details", uid)

      //! Step-2: Set or store the data inside the database
      await setDoc(user_profile_collection, payload)
      navigate("/user/profile")
      toast.success("User Details has been updated successfully.");
    } catch (error) {
      toast.error(error.code.slice(5));
      console.log("Error while uploading data:", error);
    }
    {/*console.log("User Details:", userDetails);*/}
  };

  return (
    <section className="w-full m-5 min-h-full flex flex-col justify-center items-center">
      <article className="w-full h-full bg-gray-900 p-5 rounded-lg shadow-lg">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white uppercase">
            Add Profile
          </h1>
        </header>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:grid grid-cols-3 gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-300 mb-2">
              Name:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="contactNumber" className="text-gray-300 mb-2">
              Contact Number:
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={contactNumber}
              onChange={handleInputChange}
              placeholder="Enter your contact number"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="gender" className="text-gray-300 mb-2">
              Gender:
            </label>
            <div className="flex flex-col justify-center">
              <div className="flex gap-2">
                <input onChange={handleInputChange}  type="radio" name="gender" value="male" checked={gender === "male"} />
                Male
              </div>
              <div className="flex gap-2">
                <input onChange={handleInputChange}  type="radio" name="gender" value="female" checked={gender === "female"} />
                Female
              </div>
              <div className="flex gap-2">
                <input onChange={handleInputChange}  type="radio" name="gender" value="others" checked={gender === "others"} />
                Other
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="dob" className="text-gray-300 mb-2">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={handleInputChange}
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="age" className="text-gray-300 mb-2">
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lang" className="text-gray-300 mb-2">
              Language:
            </label>
            <input
              type="text"
              id="lang"
              name="lang"
              value={lang}
              onChange={handleInputChange}
              placeholder="Enter your language"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              list="langList"
              required
            />
            <datalist id="langList">
              {Languages.map((language, index) => {
                return <option key={index}>{language}</option>;
              })}
            </datalist>
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="text-gray-300 mb-2">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={handleInputChange}
              placeholder="Enter your city"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              list="cityList"
            />
            <datalist id="cityList">
              {City.map((city, index) => {
                return <option key={index}>{city}</option>;
              })}
            </datalist>
          </div>

          <div className="flex flex-col">
            <label htmlFor="state" className="text-gray-300 mb-2">
              State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={state}
              onChange={handleInputChange}
              placeholder="Enter your state"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              list="stateList"
            />
            <datalist id="stateList">
              {State.map((state, index) => {
                return <option key={index}>{state}</option>;
              })}
            </datalist>
          </div>

          <div className="flex flex-col">
            <label htmlFor="country" className="text-gray-300 mb-2">
              Country:
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={handleInputChange}
              placeholder="Enter your country"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              list="countryList"
              required
            />
            <datalist id="countryList">
              {Country.map((country, index) => {
                return <option key={index}>{country}</option>;
              })}
            </datalist>
          </div>

          <div className="flex flex-col col-span-3">
            <label htmlFor="address" className="text-gray-300 mb-2">
              Address:
            </label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="col-span-3 flex justify-center">
            <button
              type="submit"
              className="p-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Add Profile
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default Addprofile;
