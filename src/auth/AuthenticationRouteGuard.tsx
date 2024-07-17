import React, { PropsWithChildren, useContext } from 'react'
import { AuthenticationContext } from '@/auth/AuthenticationContext.tsx'
import { Navigate, Outlet } from 'react-router-dom'

export const AuthenticatedRouteGuard: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const { user } = useContext(AuthenticationContext)

    if (!user) {
        return <Navigate to={'/login'} />
    }

    if (children) {
        return <>{children}</>
    }

    return <Outlet />
}

export const NotAuthenticatedRouteGuard: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const { user } = useContext(AuthenticationContext)

    if (user) {
        return <Navigate to={'/'} />
    }

    if (children) {
        return <>{children}</>
    }

    return <Outlet />
}
