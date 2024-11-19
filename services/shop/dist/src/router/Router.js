import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { App } from "@/components/App";
import { Shop } from "@/pages/Shop";
var routes = [
    {
        path: '/',
        element: (_jsx(App, {})),
        children: [
            {
                path: '/shop',
                element: _jsx(Suspense, { fallback: 'Loading...', children: _jsx(Shop, {}) }),
                // element:
                // <Shop />
            },
        ],
    },
];
export var router = createBrowserRouter(routes);
export default routes;
