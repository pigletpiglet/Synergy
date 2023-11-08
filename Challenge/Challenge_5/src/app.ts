import express, { Application, NextFunction, Request, Response } from 'express';
import UsersHandler from './handlers/users';
import uploadFileUtil from './utils/uploadFile';

// import dotenv from 'dotenv';
// import formData from 'express-form-data';

const app: Application = express();
const PORT: number = 8081;

// routes
app.get('/', (req: Request, res: Response) => { res.send('HI'); });

// Init handlers
const usersHandler = new UsersHandler();

// Define routes
app.get('/api/users', usersHandler.getUsers);
app.post(
    '/api/users',
    uploadFileUtil.single('profile_picture_url'),
    usersHandler.createUser
);

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
