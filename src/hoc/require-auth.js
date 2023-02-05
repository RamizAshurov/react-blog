import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth({ children }) {
    const { value } = useAuth();

    if (value) {
        return children
    }

    return <Navigate to="/" />
}

export default RequireAuth