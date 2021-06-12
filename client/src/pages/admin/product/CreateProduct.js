import { UploadOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AdminDashboardNav from '../../../components/AdminDashboardNav';
import InputField from '../../../components/InputField';
import commonError from '../../../functions/commonError';
import config from '../../../functions/httpConfig';

// initial State
const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'Brown', 'Sliver', 'White', 'Blue'],
    color: '',
    brand: '',
};

const CreateProduct = () => {
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        // get all categories from database
        axios
            .get('https://complete-ecommerce-web-app.herokuapp.com/category/', config(user.token))
            .then(({ data }) => setCategories(data))
            .catch((error) => commonError(error));
        // get all subcategories from database
        axios
            .get(
                'https://complete-ecommerce-web-app.herokuapp.com/subcategory/',
                config(user.token)
            )
            .then(({ data }) => setSubCategories(data))
            .catch((error) => commonError(error));
    }, [user.token]);

    // input fields onChange handler function
    const onChangeHandler = (e) => {
        const newValues = { ...values };
        newValues[e.target.name] = e.target.value;
        setValues(newValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                'https://complete-ecommerce-web-app.herokuapp.com/product',
                values,
                config(user.token)
            )
            .then(() => {
                toast.success('Product created successfully');
                window.location.reload();
            })
            .catch((error) => {
                commonError(error);
            });
    };

    // upload image handle change
    const handleFileChange = (e) => {
        // files
        const { files } = e.target;
        // store images in a local variable
        const uploadImages = values.images;
        if (files) {
            // eslint-disable-next-line no-restricted-syntax
            for (const file of files) {
                // image resize and convert to base64
                Resizer.imageFileResizer(
                    file,
                    720,
                    420,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        axios
                            .post(
                                'https://complete-ecommerce-web-app.herokuapp.com/upload',
                                { image: uri },
                                config(user.token)
                            )
                            .then(({ data }) => {
                                uploadImages.push(data);
                                setValues({ ...values, images: uploadImages });
                            });
                    },
                    'base64'
                );
            }
        }
    };

    // upload image remove handler
    const handleRemoveImage = (imageId) => {
        axios
            .delete(
                `https://complete-ecommerce-web-app.herokuapp.com/upload/${imageId}`,
                config(user.token)
            )
            .then(() => {
                const remainingImages = values.images.filter(
                    (image) => image.public_id !== imageId
                );
                setValues({ ...values, images: remainingImages });
            })
            .catch((error) => commonError(error.message));
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-3">
                    <AdminDashboardNav />
                </div>
                <div className="col-xl-4 col-md-9">
                    <h1 className="mt-3">Create a new product</h1>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <InputField value={values.title} handler={onChangeHandler} name="Title" />
                        <InputField
                            value={values.description}
                            handler={onChangeHandler}
                            name="Description"
                        />
                        <InputField
                            value={values.price}
                            type="number"
                            handler={onChangeHandler}
                            name="Price"
                        />
                        <InputField
                            value={values.quantity}
                            type="number"
                            handler={onChangeHandler}
                            name="Quantity"
                        />
                        <InputField value={values.brand} handler={onChangeHandler} name="Brand" />

                        <div className="form-group">
                            <label className="mb-0 text-secondary">Color</label>
                            <select className="form-control" onBlur={onChangeHandler} name="color">
                                <option>Select a color</option>
                                {values.colors.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="mb-0 text-secondary">Shipping</label>
                            <select
                                className="form-control"
                                onBlur={onChangeHandler}
                                name="shipping"
                            >
                                <option>Select shipping</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="mb-0 text-secondary">Category</label>
                            <select
                                className="form-control"
                                onChange={onChangeHandler}
                                name="category"
                            >
                                <option>Select category</option>
                                {categories.map((item) => (
                                    <option value={item._id} key={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {!!values.category && (
                            <div className="form-group">
                                <label className="mb-0 text-secondary">Sub Category</label>
                                <select
                                    className="form-control"
                                    onChange={onChangeHandler}
                                    name="subcategory"
                                >
                                    <option>Select subcategory</option>
                                    {subCategories
                                        .filter((sub) => sub.parent === values.category)
                                        .map((item) => (
                                            <option value={item._id} key={item._id}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="btn btn-outline-primary">
                                <UploadOutlined className="mr-2" />
                                Upload image
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </label>

                            <div>
                                {values.images.map((item) => (
                                    <Badge
                                        count="x"
                                        className="m-2"
                                        onClick={() => handleRemoveImage(item.public_id)}
                                        key={item.public_id}
                                    >
                                        <Avatar shape="square" size={64} src={item.url} />
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="mt-2 btn btn-outline-primary">
                            submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
