import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminDashboardNav from '../../../components/AdminDashboardNav';
import commonError from '../../../functions/commonError';
import config from '../../../functions/httpConfig';

const UpdateSubCategory = ({ match, history }) => {
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    const fetchData = async () => {
        try {
            const { data } = await axios.put(
                `https://complete-ecommerce-web-app.herokuapp.com/subcategory/${match.params.slug}`,
                { name, parent: parentCategory },
                config(user.token)
            );
            if (data) {
                toast.success('Category Updated Successfully');
                history.push('/admin/subcategory');
            }
        } catch (error) {
            commonError(error);
        }
    };

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(
                'https://complete-ecommerce-web-app.herokuapp.com/category/',
                config(user.token)
            );
            setAllCategories(data);
        } catch (error) {
            commonError(error);
        }
    };

    useEffect(() => {
        axios
            .get(
                `https://complete-ecommerce-web-app.herokuapp.com/subcategory/${match.params.slug}`,
                config(user.token)
            )
            .then(({ data }) => {
                setName(data.name);
                setParentCategory(data.parent);
            })
            .catch((error) => commonError(error));

        // get all categories
        getAllCategories();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.slug]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetchData();
        setName('');
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminDashboardNav />
                </div>
                <div className="col-md-6">
                    <h1 className="mt-3">Update Subcategory</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control mb-3"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />

                        <select
                            className="custom-select mb-3"
                            onChange={(e) => setParentCategory(e.target.value)}
                        >
                            <option>Please select a category</option>
                            {allCategories.length > 0 &&
                                allCategories.map((category) => (
                                    <option
                                        value={category._id}
                                        key={category._id}
                                        selected={category._id === parentCategory}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                        </select>

                        <button type="submit" className="btn btn-raised btn-primary">
                            Update
                        </button>
                        <Link to="/admin/subcategory">
                            <button type="submit" className="btn btn-raised btn-danger ml-2">
                                Cancel
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateSubCategory;
