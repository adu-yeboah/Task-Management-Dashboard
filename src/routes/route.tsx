import DashboardLayout from "@/layout/dashboardLayout"
import AddTask from "@/pages/addTask"
import Home from "@/pages/home"
import Login from "@/pages/login"
import Task from "@/pages/task"
import Tasks from "@/pages/tasks"
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
                    element: <Tasks />
                },
                {
                    path: "/tasks/:id",
                    element: <Task />
                },
                {
                    path: "/add-task",
                    element: <AddTask />
                },
            ]
        }
    ])
}