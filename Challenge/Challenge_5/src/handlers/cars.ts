import { Request, Response } from 'express';
import { DefaultResponse } from '../models/dto/default';
import { UserRequest } from '../models/dto/user';
import CarsService from '../services/cars';
import { Car } from '../models/entity/car';
import { CarRequest } from '../models/dto/car';
import { v2 as cloudinary } from 'cloudinary';

class CarsHandler {
    async getCars(req: Request, res: Response) {
        const queryName: string = req.query.name as string;

        const carList: Car[] = await CarsService.getCars(queryName);

        const response: DefaultResponse = {
            status: 'OK',
            message: 'Success retrieving data',
            data: {
                cars: carList,
            },
        };

        res.status(200).send(response);
    }

    async createCar(req: Request, res: Response) {
        const payload: CarRequest = req.body;

        const file_location = (req as any)['uploaded_picture'];
        console.log(file_location);
        const file_url = await cloudinary.uploader.upload(`storages/${file_location}`, {
            resource_type: "auto",
            function(error: any, result: any) { console.log(error, result); }
        });

        payload.picture = file_url.secure_url;

        // Payload validation
        if (!payload.name) {
            const response: DefaultResponse = {
                status: 'BAD_REQUEST',
                message: 'Name cannot be empty',
                data: {
                    created_user: null,
                },
            };

            res.status(400).send(response);
        }
        if (!payload.price) {
            const response: DefaultResponse = {
                status: 'BAD_REQUEST',
                message: 'Price cannot be empty',
                data: {
                    created_user: null,
                },
            };

            res.status(400).send(response);
        }
        if (!payload.size) {
            const response: DefaultResponse = {
                status: 'BAD_REQUEST',
                message: 'Size cannot be empty',
                data: {
                    created_user: null,
                },
            };

            res.status(400).send(response);
        }

        const createdCar: Car = await CarsService.createCar(payload);

        const response: DefaultResponse = {
            status: 'CREATED',
            message: 'Car succesfully created',
            data: {
                created_car: createdCar,
            },
        };

        res.status(201).send(response);
    }
}

export default CarsHandler;
