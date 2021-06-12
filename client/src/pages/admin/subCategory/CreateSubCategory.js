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

const CreateSubCategory = () => {
    const [name, setName] = useState('');
    const [selectCategory, setSelectCategory] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [subCategories, setSubCategories] = useState([]);
    const [parentCategories, setParentCategories] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    // use custom hooks
    const createNewSubCategory = useCreate();
    const deleteSubCategory = useDelete();

    // get all subcategories from server
    const getAllSubCategories = async () => {
        try {
            const { data } = await axios.get(
                'https://complete-ecommerce-web-app.herokuapp.com/subcategory/',
                config(user.token)
            );
            setSubCategories(data);
            setLoading(false);
        } catch (error) {
            commonError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        axios
            .get('https://complete-ecommerce-web-app.herokuapp.com/category/', config(user.token))
            .then(({ data }) => setParentCategories(data))
            .catch((error) => commonError(error));

        getAllSubCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handler for create a new subcategory
    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        // custom hook -->
        createNewSubCategory({
            data: { name, parent: selectCategory },
            token: user.token,
            url: 'subcategory',
            loadData: getAllSubCategories,
        });
        setName('');
    };

    // subcategory remove handler
    const handleRemove = async (subcategory) => {
        // eslint-disable-next-line no-alert
        const alert = window.confirm('Are you sure you want to remove this subcategory?');
        if (alert) {
            setLoading(true);
            deleteSubCategory({
                token: user.token,
                url: `subcategory/${subcategory.slug}`,
                loadData: getAllSubCategories,
            });
        }
    };

    // search subcategory
    const filterCategory = subCategories.filter((category) =>
        category.name.toLowerCase().includes(search)
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-3">
                    <AdminDashboardNav />
                </div>
                <div className="col-lg-6 col-md-9">
                    <h1 className="mt-3">Create a new subcategory</h1>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter new subcategory name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />

                        <select
                            className="custom-select mb-3"
                            onBlur={(e) => setSelectCategory(e.target.value)}
                            required
                        >
                            <option>Please select a category</option>
                            {parentCategories.length > 0 &&
                                parentCategories.map((category) => (
                                    <option value={category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                        </select>

                        <button type="submit" className="btn btn-raised btn-primary">
                            Create
                        </button>
                    </form>

                    <h3>All Subcategory List</h3>
                    <hr />

                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Search subcategory..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {loading ? (
                        <Spin tip="Loading..." size="large" />
                    ) : (
                        <table className="table table-bordered">
                            <thead className="thead-light text-uppercase">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Parent Category</th>
                                    <th style={{ width: 100, textAlign: 'center' }}>Edit</th>
                                    <th style={{ width: 100, textAlign: 'center' }}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterCategory.map((sub) => (
                                    <tr key={sub._id}>
                                        <td>
                                            <h6 className="mb-0 text-primary">{sub.name}</h6>
                                        </td>
                                        <td>{sub.parent}</td>
                                        <td className=" text-center">
                                            <Link to={`/admin/subcategory/${sub.slug}`}>
                                                <EditOutlined className="text-info" />
                                            </Link>
                                        </td>
                                        <td className=" text-center">
                                            <DeleteOutlined
                                                className="text-danger"
                                                onClick={() => handleRemove(sub)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateSubCategory;
