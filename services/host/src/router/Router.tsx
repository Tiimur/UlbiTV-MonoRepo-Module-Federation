import { createBrowserRouter } from "react-router-dom";
import { App } from "@/components/App";
// @ts-ignore
import shopRoutes from 'shop/Router';
// @ts-ignore
import adminRoutes from 'admin/Router';
const routes = [
    // RouteObject instances and fields from IndexRouteObject interface
    {
        path: '/',
        element: (<App />),
        children: [
            ...shopRoutes,
            ...adminRoutes
        ],
    },
];

export const router = createBrowserRouter(routes);
export default routes;