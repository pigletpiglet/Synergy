import { Request, Response } from 'express';
import { DefaultResponse } from '../models/dto/default';
import { UserRequest } from '../models/dto/user';
import CarsService from '../services/cars';
import { Car } from '../models/entity/car';

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
}

export default CarsHandler;
