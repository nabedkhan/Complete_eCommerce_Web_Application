import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminDashboardNav from '../../../components/AdminDashboardNav';
import commonError from '../../../functions/commonError';
import config from '../../../functions/httpConfig';
import useCreate from '../../../hooks/useCreate';
import useDelete from '../../../hooks/useDelete';

const CreateCategory = () => {
    const [name, setName] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    // custom hooks
    const createNewCategory = useCreate();
    const deleteCategory = useDelete();

    // get all categories from server
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(
                'https://complete-ecommerce-web-app.herokuapp.com/category',
                config(user.token)
            );
            setCategories(data);
            setLoading(false);
        } catch (error) {
            commonError(error);
        }
    };

    useEffect(() => {
        getAllCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handler for create a new category
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        // use custom hook
        createNewCategory({
            data: { name },
            token: user.token,
            url: 'category',
            loadData: getAllCategories,
        });
        // reset the state
        setName('');
    };

    // category remove handler
    const handleRemove = async (category) => {
        // eslint-disable-next-line no-alert
        const alert = window.confirm('Are you sure you want to remove this category?');
        if (alert) {
            setLoading(true);
            // use custom hook
            deleteCategory({
                token: user.token,
                url: `category/${category.slug}`,
                loadData: getAllCategories,
            });
        }
    };

    // search category
    const filterCategory = categories.filter((category) =>
        category.name.toLowerCase().includes(search)
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-3">
                    <AdminDashboardNav />
                </div>
                <div className="col-lg-6 col-md-9">
                    <h1 className="mt-3">Create a new category</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter new category name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                        <button type="submit" className="btn btn-raised btn-primary mt-3">
                            Create
                        </button>
                    </form>

                    <h3>All Category List</h3>
                    <hr />

                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Search category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {loading ? (
                        <Spin tip="Loading..." size="large" />
                    ) : (
                        filterCategory.map((category) => (
                            <div className="alert alert-dark" key={category._id}>
                                <h5 className="mb-0">
                                    {category.name}
                                    <span className="float-right">
                                        <DeleteOutlined
                                            className="text-danger pr-4"
                                            onClick={() => handleRemove(category)}
                                        />
                                        <Link to={`/admin/category/${category.slug}`}>
                                            <EditOutlined className="text-info" />
                                        </Link>
                                    </span>
                                </h5>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
