// Entity will define the object from database
import { Model, ModelObject } from 'objection';
import knexInstance from '../../../config/postgresql';

export class CarEntity extends Model {
    id?: number;
    name!: string;
    price!: number;
    size!: string;
    picture?: string;
    updated_at!: number;
    deleted!: boolean;


    static get tableName() {
        return 'cars';
    }
}

Model.knex(knexInstance);

export type Car = ModelObject<CarEntity>;

