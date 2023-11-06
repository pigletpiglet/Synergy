import express, { Application, NextFunction, Request, Response } from 'express';
// import dotenv from 'dotenv';
// import formData from 'express-form-data';

const app: Application = express();
const PORT: number = 8080;

// routes
app.get('/', (req: Request, res: Response) => { res.send('HI'); });



app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
