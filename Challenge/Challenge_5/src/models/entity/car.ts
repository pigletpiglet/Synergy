// Entity will define the object from database
interface Car {
    id?: number;
    name: string;
    price: number;
    size: string;
    picture?: string;
}

export { Car };
