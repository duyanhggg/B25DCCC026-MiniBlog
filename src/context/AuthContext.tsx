import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("miniblog_auth") === "true";
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("miniblog_auth", "true");
    } else {
      localStorage.removeItem("miniblog_auth");
    }
  }, [isAuthenticated]);

  function login(username: string, password: string): boolean {
    if (username === "admin" && password === "123456") {
      setIsAuthenticated(true);
      return true;
    }

    return false;
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải được dùng bên trong AuthProvider");
  }

  return context;
}