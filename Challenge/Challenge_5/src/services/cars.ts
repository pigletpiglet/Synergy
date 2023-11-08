import { UserRequest } from '../models/dto/user';
import { Car } from '../models/entity/car';
import CarsRepository from '../repositories/cars';

class CarsService {
    static async getCars(queryName: string): Promise<Car[]> {
        const listCar = await CarsRepository.getCars(queryName);

        return listCar;
    }
}

export default CarsService;
