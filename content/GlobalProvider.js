import { getCurrentUser } from "@/lib/appwrite";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

// Create the context with proper typing

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ isLoggedIn,setIsLoggedIn ,user, setUser,isLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
