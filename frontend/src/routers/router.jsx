import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import VoviChat from "../pages/VoviChat";
import Profile from "../pages/user/Profile";
import Logout from "../pages/user/Logout";
import MatchesPage from "../pages/Matches";
import DashboardPage from "../pages/Dashboard";
import FightersPage from "../pages/Fighters";
import AdminLogin from "../components/AdminLogin";
import AutoSort from "../pages/AutoSort";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/fighters",
        element: <FightersPage/>,
        children: [
        {
          path: "auto-sort", // KHÔNG có dấu "/" ở đầu -> sẽ thành /fighters/auto-sort
          element: <AutoSort />
        }]
      },
        {
        path: "/matches",
        element: <MatchesPage />
      },
        {
        path: "/dashboard",
        element: <DashboardPage />
      },
      {
        path: "/vovichat",
        element: <VoviChat/>
      },
      {
        path: "/profile",
        element: <Profile />
      },
         {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/admin",
        element: <AdminLogin/>
      },

    ]
  },
]);

export default router;