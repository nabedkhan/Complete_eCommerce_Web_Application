import React from 'react';
import CartDrawer from '../components/cart/CartDrawer';
import Footer from '../components/Footer';
import NewAndBestProduct from '../components/home/NewAndBestProduct';
import Slider from '../components/home/Slider';

const Home = () => (
    <div className="container-fluid">
        <CartDrawer />
        <Slider />
        <NewAndBestProduct url="list/6" title="New Arrival" />
        <NewAndBestProduct url="selling/6" title="Best Selling" />
        <Footer />
    </div>
);
export default Home;
