import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { saveToken } from '../redux/slices/token';
import { useNavigate } from 'react-router-dom';


interface CarEntity {
    id: number;
    name: string;
    size: string;
    price: number;
    deleted: boolean;

}




export default function Dashboard() {
    const [cars, setCars] = useState<CarEntity[]>([]);

    const api_base_url = 'http://localhost:8082';
    const [, setIsLoggedIn] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch(api_base_url + '/api/cars');
            const responseJSON = await response.json();
            const mobil: CarEntity[] = responseJSON.data.cars;

            setCars(mobil.filter((item) => item.deleted == false));
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
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">

                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div className='flex '>
                                    <img className="w-8 h-8 mr-4 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"></img>
                                    <span className='pr-4 text-white'> JOKO </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a onClick={() => {
                                navigate('/dashboard');

                            }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => {
                                navigate('/list');

                            }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => {
                                localStorage.removeItem('access_token')
                                navigate('/login');
                            }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:ml-64 sm:mt-10">

                <p className='font-bold text-2xl px-8 py-4'>
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
            </div>

        </>
    );
}
