// app/admin/AdminContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  username: string;
  rights: string[];
}

interface AdminContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AdminContext.Provider value={{ user, setUser }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
