import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { Login } from '@/routes/login/Login.tsx'
import { Board } from '@/routes/board/Board.tsx'
import { AppLayout } from '@/layout/AppLayout.tsx'
import { AuthenticationContextProvider } from '@/auth/AuthenticationContext.tsx'
import { Home } from '@/routes/home/Home.tsx'
import {
    AuthenticatedRouteGuard,
    NotAuthenticatedRouteGuard,
} from '@/auth/AuthenticationRouteGuard.tsx'
import { TaskDetails } from '@/routes/task/TaskDetails.tsx'
import { TaskLoadingContextProvider } from '@/routes/board/task/components/TaskLoadingContext.tsx'

export const AppRoutes: RouteObject[] = [
    {
        path: '',
        element: (
            <AuthenticationContextProvider>
                <AppLayout />
            </AuthenticationContextProvider>
        ),
        children: [
            {
                path: 'login',
                element: (
                    <NotAuthenticatedRouteGuard>
                        <Login />
                    </NotAuthenticatedRouteGuard>
                ),
            },
            {
                path: '',
                element: (
                    <TaskLoadingContextProvider>
                        <AuthenticatedRouteGuard />
                    </TaskLoadingContextProvider>
                ),
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: 'board',
                        element: <Board />,
                    },
                    {
                        path: 'task/:taskId',
                        element: <TaskDetails />,
                    },
                ],
            },
            {
                path: '*',
                element: <>404</>,
            },
        ],
    },
]

export const router = createBrowserRouter(AppRoutes)
