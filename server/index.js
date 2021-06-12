const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/db');
const { errorMiddleware, notFound } = require('./middlewares/errorMiddleware');
const authRoute = require('./routes/authRoute');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const productRoute = require('./routes/productRoute');
const uploadRoute = require('./routes/cloudinaryRoute');
const couponRoute = require('./routes/couponRoute');
const orderRoute = require('./routes/OrderRoute');

const app = express();

// middleware list
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// routes middleware
app.use('/auth', authRoute);
app.use('/category', categoryRoute);
app.use('/subcategory', subCategoryRoute);
app.use('/product', productRoute);
app.use('/upload', uploadRoute);
app.use('/coupon', couponRoute);
app.use('/order', orderRoute);

// all application routes
app.get('/', (req, res) => {
    res.send('Hello NodeJS Application!');
});

// Database connection
connectDB();

// error and not-found route middleware
app.use(notFound);
app.use(errorMiddleware);

// port listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
