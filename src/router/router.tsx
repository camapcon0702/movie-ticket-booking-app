import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import HomePage from "../pages/homePage";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/loginPage";

const router = createBrowserRouter([
    {
        element: <HomeLayout />,
        path: "/",
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
    {
        element: <AuthLayout />,
        path: "/auth",
        children: [
            {
                path: "/auth/login",
                element: <LoginPage />,
            },
        ],
    },

]);

export default router;