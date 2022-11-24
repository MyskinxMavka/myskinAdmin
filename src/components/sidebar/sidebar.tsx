import { Block, MenuItem, Title } from './styled';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

const menuItem = [
    {
        name: 'Product',
        path: '/main/product',
    },
    {
        name: 'Brand',
        path: '/main/brand',
    },

    {
        name: 'Order',
        path: '/main/order',
    },
    {
        name: 'User',
        path: '/main/users',
    },
];


export const Sidebar = () => {
    const location = useLocation()

    return (
        <Block>
            <Title>My Skin Admin</Title>
            {menuItem.map(item => 
                <MenuItem key={item.name} className={location.pathname === item.path ? 'active' : ''}>
                    <Link to={item.path}>{item.name}</Link>
                </MenuItem>
            )}
        </Block>
    )
}

