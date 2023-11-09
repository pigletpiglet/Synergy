import { CarRequest } from '../models/dto/car';
import { UserRequest } from '../models/dto/user';
import { Car } from '../models/entity/car';
import CarsRepository from '../repositories/cars';

class CarsService {
    static async getCars(queryName: string): Promise<Car[]> {
        const listCar = await CarsRepository.getCars(queryName);

        return listCar;
    }
    static async createCar(car: CarRequest): Promise<Car> {
        const carToCreate: Car = {
            price: car.price,
            name: car.name,
            size: car.size,
            picture: car.picture,
        };
        const createdCar = await CarsRepository.createCar(carToCreate);

        return createdCar;
    }

}

export default CarsService;
