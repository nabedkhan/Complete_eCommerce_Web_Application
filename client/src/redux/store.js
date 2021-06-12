import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './reducers/cartReducer';
import drawerReducer from './reducers/drawerReducer';
import userReducer from './reducers/userReducer';

// combine all reducers
const reducers = combineReducers({
    user: userReducer,
    cart: cartReducer,
    drawer: drawerReducer,
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware()));

export default store;
