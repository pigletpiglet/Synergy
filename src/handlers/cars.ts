import { Request, Response } from 'express';
import { DefaultResponse } from '../models/dto/default';
import { UserRequest } from '../models/dto/user';
import CarsService from '../services/cars';
import { Car } from '../models/entity/car';
import { CarRequest } from '../models/dto/car';
import { v2 as cloudinary } from 'cloudinary';

class CarsHandler {
    async getCars(req: Request, res: Response) {
        let queryName: string = req.query.name as string;
        let querySize: string = req.query.size as string;
        if (queryName) {
            queryName = queryName.toLowerCase()
        }
        if (querySize) {
            querySize = querySize.toLowerCase()
        }

        const carList: Car[] = await CarsService.getCars(queryName, querySize);

        const response: DefaultResponse = {
            status: 'OK',
            message: 'Success retrieving data',
            data: {
                cars: carList,
            },
        };

        res.status(200).send(response);
    }

    async editCar(req: Request, res: Response) {
        const queryName: string = req.query.id as string;

        const payload: CarRequest = req.body;

        payload.picture = req.file;


        await CarsService.editCar(queryName, payload);


        const response: DefaultResponse = {
            status: 'OK',
            message: 'Success Edit data',
            data: {
            }
        };

        res.status(200).send(response);
    }


    async deleteCar(req: Request, res: Response) {
        const queryName: string = req.query.id as string;

        await CarsService.deleteCar(queryName);

        const response: DefaultResponse = {
            status: 'OK',
            message: 'Success delete data',
            data: {}
        };

        res.status(200).send(response);
    }

    async createCar(req: Request, res: Response) {
        const payload: CarRequest = req.body;

        payload.picture = req.file;

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
