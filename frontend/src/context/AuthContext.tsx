import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../data/seed";

export type Role = "public" | "admin";

export interface AuthUser {
  role: Role;
  name: string;
  identifier: string; // mobile for public, email for admin
}

interface AuthContextValue {
  user: AuthUser | null;
  loginPublic: (mobile: string, name: string) => void;
  loginAdmin: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = "bs-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const loginPublic = (mobile: string, name: string) => {
    setUser({ role: "public", name: name || "यूज़र", identifier: mobile });
  };

  const loginAdmin = (email: string, password: string) => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ role: "admin", name: "Admin", identifier: email });
      return { ok: true };
    }
    return { ok: false, error: "गलत ईमेल या पासवर्ड (Invalid email or password)" };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loginPublic, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
