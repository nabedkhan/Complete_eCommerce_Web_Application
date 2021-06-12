import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBarNav from '../components/SideBarNav';
import { auth } from '../firebase/firebase';
import config from '../functions/httpConfig';
import { userLoginAction } from '../redux/actions/userAction';

const UserProfile = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('');
    // redux hook
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    // send data in server
    const postDataInServer = async (data) =>
        axios.post(
            'https://complete-ecommerce-web-app.herokuapp.com/auth/user',
            data,
            config(user.token)
        );

    const handleSubmit = async () => {
        const userCurrent = auth().currentUser;
        userCurrent.updateProfile({
            displayName: name,
            photoURL: image,
        });
        const { data } = await postDataInServer({ name, image, address });
        console.log(data);

        dispatch(userLoginAction(data, user.token));
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-3">
                    <SideBarNav />
                </div>
                <div className="col-lg-8 mt-3">
                    <h1 className="text-info mb-0">User Profile</h1>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label mb-0 text-secondary">User Name</label>
                            <input
                                type="text"
                                className="form-control py-1"
                                defaultValue={user.name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label mb-0 text-secondary">Email</label>
                            <input
                                type="email"
                                className="form-control py-1"
                                defaultValue={user.email}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label mb-0 text-secondary">Image URL</label>
                            <input
                                type="text"
                                className="form-control py-1"
                                defaultValue={user.image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label mb-0 text-secondary">Address</label>
                            <input
                                type="text"
                                className="form-control py-1"
                                defaultValue={user.address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-info bg-light">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
