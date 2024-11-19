import { Link, Outlet } from 'react-router-dom';
import { adminRoutes } from '@packages/shared/src/routes/admin';
import { shopRoutes } from '@packages/shared/src/routes/shop';

export const App = () => {
     
    return (
        <div data-testid="App.DATATESTID">
            <h1>PAGE1</h1>
            <Link to={adminRoutes.about}>About</Link>
            <br />
            <Link to={shopRoutes.main}>Shop</Link> 
            <Outlet/>
        </div>
    );
};