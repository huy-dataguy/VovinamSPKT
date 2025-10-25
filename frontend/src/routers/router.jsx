import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import VoviChat from "../pages/VoviChat";
import Profile from "../pages/user/Profile";
import Logout from "../pages/user/Logout";

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
    ]
  },
]);

export default router;