import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { saveToken } from '../redux/slices/token';
import { useNavigate } from 'react-router-dom';

interface UserEntity {
    id: number;
    name: string;
    email: string;
    profile_picture_url: string;
}

interface CarEntity {
    id: number;
    name: string;
    size: string;
    price: number;

}




export default function Dashboard() {
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
            <div className="flex flex-col px-8">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b bg-blue-400 font-medium text-white dark:border-neutral-500 dark:bg-blue-800">
                                    <tr>
                                        <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>No</th>
                                        <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>Name</th>
                                        <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>Size</th>
                                        <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cars.map((car: CarEntity, index: number) => (
                                        <>
                                            <tr>
                                                <td>{index + 1}.  </td>
                                                <td>{car.name}</td>
                                                <td>{car.size}</td>
                                                <td>{car.price}</td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
