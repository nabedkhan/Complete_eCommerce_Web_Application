export const userLoginAction = (data, token) => ({
    type: 'LOGGED_IN_USER',
    payload: {
        name: data.name,
        role: data.role,
        email: data.email,
        image: data.image,
        address: data.address,
        _id: data._id,
        token,
    },
});
