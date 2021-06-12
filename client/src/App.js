import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import AdminRoute from './components/routes/AdminRoute';
import UserRoute from './components/routes/UserRoute';
import { auth } from './firebase/firebase';
import getCurrentUser from './functions/getCurrentUser';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/category/CreateCategory';
import UpdateCategory from './pages/admin/category/UpdateCategory';
import Coupon from './pages/admin/Coupon';
import CreateProduct from './pages/admin/product/CreateProduct';
import Products from './pages/admin/product/Products';
import UpdateProduct from './pages/admin/product/UpdateProduct';
import CreateSubCategory from './pages/admin/subCategory/CreateSubCategory';
import UpdateSubCategory from './pages/admin/subCategory/UpdateSubCategory';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import OrderDetails from './pages/OrderDetails';
import PaymentSuccess from './pages/PaymentSuccess';
import Product from './pages/Product';
import Register from './pages/Register';
import RegisterComplete from './pages/RegisterComplete';
import Shop from './pages/Shop';
import Subcategory from './pages/Subcategory';
import UserHistory from './pages/UserHistory';
import UserProfile from './pages/UserProfile';
import { userLoginAction } from './redux/actions/userAction';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {
            try {
                const { token } = await user.getIdTokenResult();
                const { data } = await getCurrentUser(token);
                dispatch(userLoginAction(data, token));
            } catch (error) {
                console.log(error.message);
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register/complete" component={RegisterComplete} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/products/:slug" component={Product} />
                <Route exact path="/category/:slug" component={Category} />
                <Route exact path="/subcategory/:slug" component={Subcategory} />
                <Route exact path="/payment-success" component={PaymentSuccess} />

                <UserRoute exact path="/checkout" component={Checkout} />
                <UserRoute exact path="/user/history" component={UserHistory} />
                <UserRoute exact path="/user/profile" component={UserProfile} />
                <UserRoute exact path="/user/order/:id" component={OrderDetails} />

                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/admin/category" component={CreateCategory} />
                <AdminRoute exact path="/admin/category/:slug" component={UpdateCategory} />
                <AdminRoute exact path="/admin/subcategory" component={CreateSubCategory} />
                <AdminRoute exact path="/admin/subcategory/:slug" component={UpdateSubCategory} />
                <AdminRoute exact path="/admin/product" component={CreateProduct} />
                <AdminRoute exact path="/admin/products" component={Products} />
                <AdminRoute exact path="/admin/products/:slug" component={UpdateProduct} />
                <AdminRoute exact path="/admin/coupon" component={Coupon} />
            </Switch>
        </Router>
    );
}

export default App;
