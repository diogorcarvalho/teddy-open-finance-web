import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import CustomerList from "../pages/CustomerList";
import NotFound from "../pages/NotFound";
import { UserProvider } from "../providers/UserContext";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/customer-list", element: <CustomerList /> },
    { path: "*", element: <NotFound /> }, // Página 404
]);

export default function AppRoutes() {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}
