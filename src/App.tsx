import React from 'react';
import {
    RouterProvider,
    createRouter,
    createRootRoute,
    createRoute,
    Outlet
} from '@tanstack/react-router';
import MainRoute from "./routes/main.tsx";
import LoginRoute from './routes/login';
import RegisterRoute from './routes/register'
import MenuRoute from './routes/menu'
import GameLoaderRoute from "./routes/gameLoader";
import LogOutRoute from "./routes/logOut";
import GameRoute from "./routes/game";
import GameHistoryRoute from "./routes/gameHistory.tsx";

const rootRoute = createRootRoute({
    component: () => <div><Outlet /></div>,
});

const indexRoute = createRoute({
    path: '/',
    getParentRoute: () => rootRoute,
    component: MainRoute,
});

const loginRoute = createRoute({
    path: '/login',
    getParentRoute: () => rootRoute,
    component: LoginRoute,
});

const registerRoute = createRoute({
    path: '/register',
    getParentRoute: () => rootRoute,
    component: RegisterRoute,
})

const menuRoute = createRoute({
    path: '/menu',
    getParentRoute: () => rootRoute,
    component: MenuRoute,
})

const gameLoaderRoute = createRoute({
    path: '/gameLoader',
    getParentRoute: () => rootRoute,
    component: GameLoaderRoute
})

const logOutRoute = createRoute({
    path: '/logOut',
    getParentRoute: () => rootRoute,
    component: LogOutRoute
})

const gameRoute = createRoute({
    path: '/game',
    getParentRoute: () => rootRoute,
    component: GameRoute
})

const gameHistoryRoute = createRoute({
    path: '/gameHistory',
    getParentRoute: () => rootRoute,
    component: GameHistoryRoute
})

const routeTree = rootRoute.addChildren(
    [
        indexRoute,
        loginRoute,
        registerRoute,
        menuRoute,
        gameLoaderRoute,
        logOutRoute,
        gameRoute,
        gameHistoryRoute
    ]
);

const router = createRouter({ routeTree });

export default function App() {
    return <RouterProvider router={router} />;
}