import pool from '../../config/postgresql';
import { Car } from '../models/entity/car';

class CarsRepository {
    static async getCars(queryName: string): Promise<Car[]> {
        const getCars = await pool.query(
            'SELECT id, name, price, size, picture FROM cars WHERE name like $1',
            [`%${queryName}%`]
        );

        const response: Car[] = getCars.rows;

        return response;
    }
    static async createCar(car: Car): Promise<Car> {
        const createCar = await pool.query(
            'INSERT INTO cars (name, price, size, picture) VALUES ($1, $2, $3, $4) returning *',
            [car.name, car.price, car.size, car.picture]
        );

        const createdCar: Car = {
            name: createCar.rows[0].name,
            price: createCar.rows[0].price,
            size: createCar.rows[0].size,
            id: createCar.rows[0].id,
            picture: createCar.rows[0].picture
        };

        return createdCar;
    }
}

export default CarsRepository;
