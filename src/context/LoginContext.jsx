import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({children})=>{

    const [session] = useState(() => {
        const storedToken = localStorage.getItem("token");
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            return storedUser && storedToken ? { user: storedUser, token: storedToken } : { user: null, token: null };
        } catch {
            return { user: null, token: null };
        }
    });
    const [user,setUser]=useState(session.user);
    const[token, setToken]=useState(session.token);
    const[isAuthenticated, setIsAuthenticated]=useState(Boolean(session.user && session.token));

    const login=(token,user)=>{
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(user))
        setUser(user);
        setToken(token);
        setIsAuthenticated(true);
    }

    const logout=()=>{
        localStorage.clear();
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
    }

    return <LoginContext.Provider value={{login,logout,user, token, isAuthenticated}}>
        {children}
    </LoginContext.Provider>

}
