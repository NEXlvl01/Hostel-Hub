import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("User");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!Cookies.get("token");
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("User");
    if (savedUser && Cookies.get("token")) {
      setUser(JSON.parse(savedUser));
      console.log(isAuthenticated);
    }
  }, []);

  const data = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
