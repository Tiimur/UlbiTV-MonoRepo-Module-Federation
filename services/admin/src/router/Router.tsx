import { Suspense } from "react";
import { App } from "@/components/App";
import { About } from "@/pages/About";
import { createBrowserRouter } from "react-router-dom";

const routes = [
    // RouteObject instances and fields from IndexRouteObject interface
    {
        path: '/admin',
        element: (<App />),
        children: [
            {
                path: '/admin/about',
                element: 
                <Suspense fallback = {'Loading...'}>
                    <About />
                </Suspense>,
                // element:
                // <About />,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);

export default routes;
