import express, { Application, NextFunction, Request, Response } from 'express';
import UsersHandler from './handlers/users';
import uploadFileUtil from './utils/uploadFile';
import CarsHandler from './handlers/cars';

// import dotenv from 'dotenv';
// import formData from 'express-form-data';
import { v2 as cloudinary } from 'cloudinary';

const app: Application = express();
const PORT: number = 8081;

// routes
app.get('/', (req: Request, res: Response) => { res.send('HI'); });

const config = cloudinary.config({
    cloud_name: 'dzbowbs1d',
    api_key: '584729987837183',
    api_secret: 'SG6BqXAuoSRoKQeTQScq_X46VTA'
});

// Init handlers
const usersHandler = new UsersHandler();
const carsHandler = new CarsHandler();

// Define routes
app.get('/api/cars', carsHandler.getCars);
app.get('/api/cars/delete', carsHandler.deleteCar);

app.post(
    '/api/cars/edit',
    uploadFileUtil.single('picture'),
    carsHandler.editCar
);


app.post(
    '/api/cars',
    uploadFileUtil.single('picture'),
    carsHandler.createCar
);




app.get('/api/users', usersHandler.getUsers);

app.post(
    '/api/users',
    uploadFileUtil.single('profile_picture_url'),
    usersHandler.createUser
);

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
