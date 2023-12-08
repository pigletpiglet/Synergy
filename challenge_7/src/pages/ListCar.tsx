import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { saveToken } from '../redux/slices/token';
import { useNavigate } from 'react-router-dom';

interface CarEntity {
    id: number;
    name: string;
    size: string;
    price: number;
    picture: string;
    updated_at: string;
}




export default function ListCar() {
    const [cars, setCars] = useState<CarEntity[]>([]);

    const api_base_url = 'http://localhost:8082';
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch(api_base_url + '/api/cars');
            const responseJSON = await response.json();

            setCars(responseJSON.data.cars);
        };

        const checkIsLoggedIn = () => {
            const accessToken = localStorage.getItem('access_token');

            // Use if you want to use passing state by props
            if (accessToken) {
                setIsLoggedIn(true);

                // TODO:
                // Save token to redux store
                dispatch(saveToken(accessToken));
            } else {
                setIsLoggedIn(false);
                navigate('/login');
            }
        };

        checkIsLoggedIn();
        fetchCars();
    }, []);

    return (
        <>
            <p className='font-bold text-lg px-8 py-4'>
                Dashboard
            </p>
            <div className='grid grid-cols-3'>
                {cars.map((car: CarEntity, index: number) => (
                    <>
                        <div className=''>
                            <img src={car.picture}>
                            </img>
                            <p>
                                {car.name}
                            </p>
                            <p>
                                Rp. {car.price} / hari
                            </p>
                            <p>
                                Updated At : {Date.parse(car.updated_at).toString()}
                            </p>
                        </div>
                    </>
                ))}
            </div>

        </>
    );
}
