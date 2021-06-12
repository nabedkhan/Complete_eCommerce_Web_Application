const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return action.payload;

        case 'DELETE_FROM_CART':
            return action.payload;

        case 'UPDATE_CART_QUANTITY':
            return action.payload;

        case 'CLEAR_CART':
            return action.payload;

        default:
            return state;
    }
};

export default cartReducer;
