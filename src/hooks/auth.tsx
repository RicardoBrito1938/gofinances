import React, { createContext, ReactNode, useContext } from "react";
import * as AuthSession from "expo-auth-session";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWIthGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const user: User = {
    id: "111",
    name: "Ricardo Brito",
    email: "ricardo.jucrist@hotmail.com"
  };

  const signInWIthGoogle = async () => {
    try {
      const CLIENT_ID =
        "230561673075-lcu9i9v5gfhubn9a3h3bqnlulnn226g2.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@ricktb/gofinances";
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const response = await AuthSession.startAsync({ authUrl });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const providerValues = {
    user,
    signInWIthGoogle
  };

  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
