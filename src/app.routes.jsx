import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import InterView from "./features/interview/pages/InterView";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RootLayout from "./Layout";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <RootLayout />
      </Protected>
    ),
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: "interview/:interviewId",
        element: <InterView />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile/>,
      },
    ],
  },
]);
