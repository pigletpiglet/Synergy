import { QueryResult } from 'pg';
import pool from '../../config/postgresql';
import { CarRequest } from '../models/dto/car';
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
    static async deleteCar(queryName: string) {
        await pool.query(
            'DELETE FROM cars WHERE cars.id = $1',
            [`%${queryName}%`]
        );
    }
    static async editCar(id: string, car: CarRequest): Promise<Car> {


        for (const [key, value] of Object.entries(car)) {
            console.log(key, value);
            await pool.query(
                this.getSQL(key),
                [value, id]
            );
        }
        console.log("notRepeat");
        const getCar = await pool.query(
            'SELECT id, name, price, size, picture FROM cars WHERE id = $1',
            [id]
        );
        console.log(getCar);

        const edittedCar: Car = {
            id: getCar.rows[0].id,
            name: getCar.rows[0].name,
            price: getCar.rows[0].price,
            size: getCar.rows[0].size,
            picture: getCar.rows[0].picture
        };

        return edittedCar;
    }

    static getSQL(par: string): string {
        let sql = `UPDATE cars SET `;

        sql = sql + `${par} = $1`

        sql = sql + ' WHERE cars.id = $2 returning *';
        return sql;
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
