import reactDom from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';

const rootElement = document.getElementById('root')
if (!rootElement){
    throw new Error('Root as div element is not initilazed. Check a index.tsx and public/index.html files');
}

const root: reactDom.Root = reactDom.createRoot(rootElement);

root.render(
    <RouterProvider router={router} />    

);
