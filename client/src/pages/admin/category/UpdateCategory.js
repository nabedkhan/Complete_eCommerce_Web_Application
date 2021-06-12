import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminDashboardNav from '../../../components/AdminDashboardNav';
import commonError from '../../../functions/commonError';
import config from '../../../functions/httpConfig';

const UpdateCategory = ({ match, history }) => {
    const [name, setName] = useState(match.params.slug);
    const { user } = useSelector((state) => ({ ...state }));

    const fetchData = async () => {
        try {
            const { data } = await axios.put(
                `https://complete-ecommerce-web-app.herokuapp.com/category/${match.params.slug}`,
                { name },
                config(user.token)
            );
            if (data) {
                toast.success('Category Updated Successfully');
                history.push('/admin/category');
            }
        } catch (error) {
            commonError(error);
        }
    };

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
                    <h1 className="mt-3">Update Category</h1>
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
                            Update
                        </button>
                        <Link to="/admin/category">
                            <button type="submit" className="btn btn-raised btn-danger mt-3 ml-2">
                                Cancel
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;
