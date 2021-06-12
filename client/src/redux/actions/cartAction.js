export const addToCartAction = (product) => {
    let cart = [];
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    const existingItem = cart.find((item) => item._id === product._id);
    if (!existingItem) {
        cart.push({ ...product, count: 1 });
    } else {
        cart = cart.filter((item) =>
            item._id === existingItem._id ? { ...item, count: item.count++ } : item
        );
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    return {
        type: 'ADD_TO_CART',
        payload: cart,
    };
};

export const removeFromCartAction = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));

    return {
        type: 'DELETE_FROM_CART',
        payload: newCart,
    };
};

export const updateCartQuantityAction = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));

    return {
        type: 'UPDATE_CART_QUANTITY',
        payload: newCart,
    };
};

export const clearCartAction = () => {
    localStorage.removeItem('cart');
    return {
        type: 'CLEAR_CART',
        payload: [],
    };
};
