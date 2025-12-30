import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import HomePage from "../pages/homePage";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/loginPage";
import BookingPage from "../pages/bookingPage";
import DetailMovie from "../pages/moviePage/detailMovie";
import Checkout from "../pages/bookingPage/checkout";
import BookingHistory from "../pages/historyPage";

const router = createBrowserRouter([
    {
        element: <HomeLayout />,
        path: "/",
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
               {
                path: "movie/:id",
                element: <DetailMovie />,
            },
            {
                path: "booking/:id",
                element: <BookingPage />,
            },
             {
                path: "checkout",
                element: <Checkout />,
            },
             {
                path: "history",
                element: <BookingHistory />,
            }
            
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