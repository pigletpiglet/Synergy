import express, { Application } from 'express';
import CarsHandler from './handlers/cars';
import uploadFileUtil from './utils/uploadFileMemory';

// import dotenv from 'dotenv';
// import formData from 'express-form-data';
const app: Application = express();
const PORT: number = 8081;

app.use(express.json());

// Init handlers
// const usersHandler = new UsersHandler();
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

// app.get('/api/users', usersHandler.getUsers);

// app.post(
//     '/api/users',
//     uploadFileUtil.single('profile_picture_url'),
//     usersHandler.createUser
// );

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
