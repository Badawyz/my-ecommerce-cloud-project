import { connect } from 'mongoose';
import config from './config.js';

export default async () => {
	try {
		await connect(config.MONGODB_URL);
		console.log('connected to db');
	} catch (e) {
		console.log('error in connecting db: ', e);
	}
};
