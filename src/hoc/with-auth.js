import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null)

function AuthProvider({children}) {
    const [value, setValue] = useState(null);
    const navigate = useNavigate();

    async function userAuth(id) {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
        return await response.json();
    } 

    const login = (callback) => {
        const id = Math.floor(Math.random() * 10) + 1;

        userAuth(id)
            .then(user => {
                setValue(user);
                callback();
            })
            .catch(error => console.log(error))
    }

    const logout = () => {
        setValue(null);
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ value, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }