import express, { Application } from 'express';
import CarsHandler from './handlers/cars';
import uploadFileUtil from './utils/uploadFileMemory';
import UsersHandler from './handlers/users';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerConfig } from './utils/swaggerOption';

import dotenv from 'dotenv';
import AuthHandler from './handlers/auth';
import AuthMiddleware from './middlewares/auth';
dotenv.config();

// import formData from 'express-form-data';
const app: Application = express();

app.use(express.json());

// Init handlers
const usersHandler = new UsersHandler();
const carsHandler = new CarsHandler();
const authHandler = new AuthHandler();

//swagger
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Define routes

// routes for users
app.get(
    '/api/users',
    AuthMiddleware.authenticate,
    // TODO: add role checking middleware
    usersHandler.getUsers
);
app.post(
    '/api/users',
    // uploadFileUtil.single('profile_picture_url'), // single file
    uploadFileUtil.array('profile_pictures'), // multiple files
    usersHandler.createUser
);

// authentication routes
app.post('/api/auth/register', authHandler.register);
app.post('/api/auth/login', authHandler.login);
app.get('/api/auth/me', AuthMiddleware.authenticate, authHandler.getLoggedInUser);

// cars routes
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

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});
