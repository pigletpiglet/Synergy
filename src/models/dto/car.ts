interface CarRequest {
    name: string;
    price: number,
    size: string,
    picture?: Express.Multer.File,
}


export { CarRequest };
