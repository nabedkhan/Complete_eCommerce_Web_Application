import {
    HomeOutlined,
    LoginOutlined,
    SettingOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserAddOutlined,
    // eslint-disable-next-line prettier/prettier
    UserOutlined
} from '@ant-design/icons';
import { Badge, Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, cart } = useSelector((state) => ({ ...state }));
    const [current, setCurrent] = useState('home');
    // handle selectedKeys
    const handleClick = (e) => setCurrent(e.key);
    // handle log out
    const handleLogOut = () => {
        auth().signOut();
        dispatch({
            type: 'LOGOUT_USER',
            payload: {},
        });
        // redirect to login page
        history.push('/login');
    };
    return (
        <div className="container-fluid">
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="shop" icon={<ShopOutlined />}>
                    <Link to="/shop">Shop</Link>
                </Menu.Item>
                <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                    <Badge count={cart.length} size="small" offset={[5, 0]}>
                        <Link to="/cart">Cart</Link>
                    </Badge>
                </Menu.Item>
                {!user.token && (
                    <Menu.Item key="register" icon={<UserAddOutlined />} className="float-right">
                        <Link to="/register">Register</Link>
                    </Menu.Item>
                )}
                {!user.token && (
                    <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                )}

                {user && user.token && (
                    <Menu.SubMenu
                        key="SubMenu"
                        className="float-right"
                        icon={<SettingOutlined />}
                        title={user.email.split('@')[0]}
                    >
                        <Menu.Item>
                            <Link
                                to={
                                    user && user.role === 'admin'
                                        ? '/admin/dashboard'
                                        : '/user/history'
                                }
                            >
                                Dashboard
                            </Link>
                        </Menu.Item>
                        <Menu.Item icon={<LoginOutlined />} onClick={handleLogOut}>
                            Logout
                        </Menu.Item>
                    </Menu.SubMenu>
                )}
            </Menu>
        </div>
    );
};

export default Header;
