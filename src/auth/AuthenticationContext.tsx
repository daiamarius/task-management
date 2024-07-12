import React, {createContext, PropsWithChildren, useState} from "react";
import {Id} from "@/api/lib/fakeApi.ts";
import {useGetUserQuery} from "@/api/hooks/user/query/useGetUserQuery.tsx";
import {User} from "@/api/fakeTasksApi.ts";

type AuthenticationContextType = {
  isAuthenticated: boolean;
  user?: User;
  login: (userId: Id) => void;
  logout: () => void;
}


export const AuthenticationContext = createContext<AuthenticationContextType>({
  isAuthenticated: false
} as AuthenticationContextType)


export const AuthenticationContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const localStorageKey = 'user';
  const [userId, setUserId] = useState<Id | undefined>(localStorage.getItem(localStorageKey) ?? undefined)

  const {data: user} = useGetUserQuery(userId)

  const login = (userId: string) => {
    setUserId(userId);
    localStorage.setItem(localStorageKey, userId);
  }

  const logout = () => {
    setUserId(undefined)
    localStorage.removeItem(localStorageKey);
  }



  return (
    <AuthenticationContext.Provider value={{
      isAuthenticated: !!user,
      user: userId ? user : undefined,
      login,
      logout
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}


