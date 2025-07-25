import { deleteUser } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthUserContext } from "../../context/AuthContextApi";

const DeleteAccount = () => {
  //! We will write the logic for the delete account

  let { authUser } =  useContext(AuthUserContext);
  let navigate = useNavigate();

  let [confirmText, setConfirmText] = useState("")

  let handleInputChange = (e) => {
    let value = e.target.value
    setConfirmText(value)
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(confirmText !== "DELETE"){
        toast.error("Please enter the confirmation text.")
      }
      toast.success("Account Deleted. We're sorry to see you go!")

      await deleteUser(authUser);

      setTimeout(() => {
        navigate("/")
      }, 2000);

    } catch (error) {
      toast.error(error.code.slice(5))
    }
  }

  return (
    <section className="w-full min-h-full m-5 flex flex-col justify-center items-center">
      <div className="w-full rounded-lg overflow-hidden">
      <article className="w-full bg-gray-900 px-4 py-2">
        <header className="w-full">
          <h1 className="text-3xl font-bold text-center uppercase py-8 px-4">
            Delete Account
          </h1>
        </header>
        <div className="py-2 px-4 text-lg">
          <p>
            Deleting your account will remove all of your information from our
            database.
          </p>
          <p className="mt-2 text-red-600">⚠️ This cannot be undone!</p>
        </div>
      </article>
      <main className="w-full bg-gray-900 px-4 py-2">
        <form onSubmit={handleSubmit}>
          <div className="py-2 px-4 text-lg w-full">
            <label htmlFor="confirmText">
              To confirm this, type
              <code className="bg-gray-700 mx-2">"DELETE"</code>
            </label>
          </div>
          <div className="mb-6 w-full px-4 py-2 text-lg flex flex-col md:flex-row gap-3 justify-between items-center">
            <input
              type="text"
              name="confirmText"
              id="confirmText"
              value={confirmText}
              onChange={handleInputChange}
              className="p-2 w-full bg-white outline-none rounded-md font-semibold focus:ring-2 focus:ring-red-600 text-red-600"
            />
            <button
              className={`p-3 rounded-lg font-semibold ${
                confirmText === "DELETE"
                  ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
              disabled={confirmText !== "DELETE"}
            >
              Delete
            </button>
          </div>
        </form>
      </main>
      </div>
    </section>
  );
};

export default DeleteAccount;
