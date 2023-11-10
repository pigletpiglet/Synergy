import { CarRequest } from '../models/dto/car';
import { UserRequest } from '../models/dto/user';
import { Car } from '../models/entity/car';
import CarsRepository from '../repositories/cars';
import cloudinary from '../../config/cloudinary';

class CarsService {
    static async getCars(queryName: string, querySize: string): Promise<Car[]> {
        const listCar = await CarsRepository.getCars(queryName, querySize);

        return listCar;
    }
    static async createCar(car: CarRequest): Promise<Car> {
        const fileBase64 = car.picture?.buffer.toString('base64');
        const file = `data:${car.picture?.mimetype};base64,${fileBase64}`;

        const uploadedFile = await cloudinary.uploader.upload(file);

        console.log(uploadedFile.secure_url);

        const carToCreate: Car = {
            price: car.price,

            name: car.name,
            size: car.size,
            picture: uploadedFile.secure_url,
        };
        const createdCar = await CarsRepository.createCar(carToCreate);

        return createdCar;
    }

    static async editCar(id: string, car: CarRequest) {
        const fileBase64 = car.picture?.buffer.toString('base64');
        const file = `data:${car.picture?.mimetype};base64,${fileBase64}`;

        const uploadedFile = await cloudinary.uploader.upload(file);

        const carToEdit: Car = {
            price: car.price,
            name: car.name,
            size: car.size,
            picture: uploadedFile.secure_url,
        };

        await CarsRepository.editCar(id, carToEdit);

    }

    static async deleteCar(id: string) {
        await CarsRepository.deleteCar(id);
    }

}

export default CarsService;
