import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboardNav = () => (
    <Menu style={{ height: '100vh' }}>
        <Menu.Item key="dashboard">
            <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="product">
            <Link to="/admin/product">Product</Link>
        </Menu.Item>
        <Menu.Item key="products">
            <Link to="/admin/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="category">
            <Link to="/admin/category">Category</Link>
        </Menu.Item>
        <Menu.Item key="sub-category">
            <Link to="/admin/subcategory">Sub Category</Link>
        </Menu.Item>
        <Menu.Item key="coupon">
            <Link to="/admin/coupon">Coupon</Link>
        </Menu.Item>
    </Menu>
);

export default AdminDashboardNav;
