import { jsx as _jsx } from "react/jsx-runtime";
import reactDom from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
11;
import { router } from './router/Router';
var rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root as div element is not initilazed. Check a index.tsx and public/index.html files');
}
var root = reactDom.createRoot(rootElement);
root.render(_jsx(RouterProvider, { router: router }));
