import express from 'express';
import config from './config/config.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/dbConnect.js';
import fs from 'fs';
import productModel from './models/productModel.js';
dotenv.config();

const data = fs.readFileSync('./utils/data.json', 'utf8');
const app = express();

app.use(cors());
app.use(express.static('./uploads'));
app.use(express.json());
// middlewares
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

const importData = async () => {
	await productModel.insertMany(JSON.parse(data));
	console.log('Data Imported!');
};
app.listen(config.PORT, () => {
	dbConnect();
	// importData();
	console.log(`Server started at http://localhost:${config.PORT}`);
});
