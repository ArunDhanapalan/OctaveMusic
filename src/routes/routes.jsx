import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../auth/Home";
import ResetPassword from "../auth/ResetPassword";
import ProfileContainer from "../components/UserProfile/ProfileContainer";
import MyAccount from "../components/UserProfile/MyAccount";
import AddProfile from "../components/UserProfile/AddProfile";
import UploadProfilePhoto from "../components/UserProfile/UploadProfilePhoto";
import ChangePassword from "../components/UserProfile/ChangePassword";
import DeleteAccount from "../components/UserProfile/DeleteAccount";
import AdminContainer from "../admin/AdminContainer";
import CreateAlbum from "../admin/album/CreateAlbum";
import AlbumLandingContainer from "../admin/AlbumLanding/AlbumLandingContainer";
import PopularAlbums from "../admin/AlbumLanding/PopularAlbums";
import AlbumDetails from "../admin/AlbumLanding/AlbumDetails";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

let myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AlbumLandingContainer />,
        children: [
          {
            index: true,
            element: <PopularAlbums />,
          },
          {
            path: "album-details/:title",
            element: <AlbumDetails />,
          },
        ],
      },
      {
        path: "/auth/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        ),
      },
      {
        path: "/auth/reset-password",
        element: (
          <PublicRoutes>
            <ResetPassword />
          </PublicRoutes>
        ),
      },
      {
        path: "/admin",
        element: <AdminContainer />,
        children: [
          {
            index: true,
            element: <CreateAlbum />,
          },
        ],
      },
      {
        path: "/user/profile",
        element: (
          <PrivateRoutes>
            <ProfileContainer />
          </PrivateRoutes>
        ),
        children: [
          {
            index: true,
            element: <MyAccount />,
          },
          {
            path: "add-profile",
            element: <AddProfile />,
          },
          {
            path: "upload-profile-photo",
            element: <UploadProfilePhoto />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "delete-account",
            element: <DeleteAccount />,
          },
        ],
      },
      {
        path: "*",
        element: (
          <h1 className="text-center text-3xl my-5 font-black">
            Uh oh... 404 - Page not found.
            <br />
            <br />
            That's all we know.
          </h1>
        ),
      },
    ],
  },
]);

export default myRoutes;
