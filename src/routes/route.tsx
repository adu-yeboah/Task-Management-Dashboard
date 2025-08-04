import DashboardLayout from "@/layout/dashboardLayout"
import Home from "@/pages/home"
import Login from "@/pages/login"
import { createBrowserRouter } from "react-router"

export const createRouter = () => {
    return createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/",
            element: <DashboardLayout />,

            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/tasks",
                    element: <Home />
                },
                {
                    path: "/tasks/:id",
                    element: <Home />
                },
                {
                    path: "/add-task",
                    element: <Home />
                },
            ]
        }
    ])
}