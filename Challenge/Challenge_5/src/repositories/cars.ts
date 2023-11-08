import pool from '../../config/postgresql';
import { Car } from '../models/entity/car';

class CarsRepository {
    static async getCars(queryName: string): Promise<Car[]> {
        const getCars = await pool.query(
            'SELECT id, email, name, profile_picture_url FROM cars WHERE name like $1',
            [`%${queryName}%`]
        );

        const response: Car[] = getCars.rows;

        return response;
    }
}

export default CarsRepository;
