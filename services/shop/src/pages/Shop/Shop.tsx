import React from 'react';
import { Link } from 'react-router-dom';
import { adminRoutes } from '@packages/shared/src/routes/admin';
import { shopRoutes } from '@packages/shared/src/routes/shop';

const Shop = () => {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());

    setInterval( () => {
        setTime(prev =>
            prev = new Date().toLocaleTimeString());
        },
        1000);

    return (
        <div>
            <h3>SHOP</h3>
            <h2>{time}</h2>
            <div>
                <Link to={shopRoutes.second}>go to second page</Link>
            </div>
        </div>
    );
}

export default Shop;

