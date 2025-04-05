import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
    User
  } from "firebase/auth";
  import { createContext, useContext, useEffect, useState } from "react";
  import { auth } from "../firebase";
  
  interface AuthContextProps {
    currentUser: User | null;
    signup: (email: string, password: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextProps | null>(null);
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
  };
  
  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => {
        setCurrentUser(user);
      });
      return unsub;
    }, []);
  
    const signup = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
    const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);
    const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);
  
    const value = { currentUser, signup, login, logout, resetPassword };
  
    return <AuthContext.Provider value={value as AuthContextProps}>{children}</AuthContext.Provider>;
  }