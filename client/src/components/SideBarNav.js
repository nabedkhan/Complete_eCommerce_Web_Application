import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const SideBarNav = () => (
    <Menu style={{ height: '100vh' }}>
        <Menu.Item key="dashboard" className="text-uppercase">
            <Link to="/user/history">My Orders</Link>
        </Menu.Item>
        <Menu.Item key="products" className="text-uppercase">
            <Link to="/user/profile">User Profile</Link>
        </Menu.Item>
    </Menu>
);
export default SideBarNav;
