import { useContext } from "react";
import { AuthContext } from "../hoc/with-auth";

function useAuth() {
    const auth = useContext(AuthContext);
    return auth
}

export default useAuth