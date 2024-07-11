import React, {createContext, PropsWithChildren, useState} from "react";
import {User} from "@/api/fakeUsersApi.ts";
import {Id} from "@/api/lib/fakeApi.ts";
import {useGetUserQuery} from "@/api/hooks/user/query/useGetUserQuery.tsx";

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
  const [userId, setUserId] = useState<Id | undefined>(undefined)

  const { data: user } = useGetUserQuery(userId)

  return (
    <AuthenticationContext.Provider value={{
      isAuthenticated: !!user,
      user: userId ? user : undefined,
      login: (userId) => setUserId(userId),
      logout: () => setUserId(undefined)
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}


