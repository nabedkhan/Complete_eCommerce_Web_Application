import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryBar = ({ categories, link }) => (
    <div className="col-lg-12">
        <hr className="my-0" />
        <Menu style={{ borderRight: 0, textAlign: 'center' }} mode="horizontal">
            {categories.map((category) => (
                <Menu.Item key={category._id}>
                    <Link to={`/${link}/${category.slug}`}>
                        <span className="font-weight-bold">{category.name}</span>
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    </div>
);

export default CategoryBar;
