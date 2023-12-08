import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { saveToken } from '../redux/slices/token';
import { useNavigate } from 'react-router-dom';
import { ClockIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";




interface CarEntity {
    id: number;
    name: string;
    size: string;
    price: number;
    picture: string;
    updated_at: string;
    deleted: boolean;
}




export default function ListCar() {
    const [cars, setCars] = useState<CarEntity[]>([]);

    const api_base_url = 'http://localhost:8082';
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [itemId, setItemId] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState("0");

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

            <div className='w-screen h-screen'>
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
                    <div className='w-[100%] flex'>

                        <p className='font-bold text-2xl px-8 py-4'>
                            List Car
                        </p>
                        <button key="add"
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-auto'
                            onClick={async () => {
                                navigate("/create")
                            }}
                        >
                            <span className='font-bold'>+ Add New Car</span>
                        </button>
                    </div>
                    <div className='grid grid-cols-3 px-8 w-[40%]'>
                        <button
                            onClick={() => {
                                setFilter("2")
                            }}
                            className={filter == "2" ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-auto' : "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 m-auto"}>
                            Small
                        </button>
                        <button
                            onClick={() => {
                                setFilter("4")
                            }}

                            className={filter == "4" ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-auto' : "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 m-auto"}>
                            Large
                        </button>
                        <button
                            onClick={() => {
                                setFilter("0")
                            }}

                            className={filter == "0" ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-auto' : "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 m-auto"}>
                            All
                        </button>
                    </div>
                    <div className='grid grid-cols-3 px-8 w-[100%]'>
                        {cars.map((car: CarEntity) => (
                            <>
                                {!car.deleted && (filter == "2" ? Number(car.size) <= 4 : filter == "4" ? Number(car.size) >= 4 : true) ? <div className='rounded border border-gray-200 overflow-hidden shadow-lg px-8 py-4 mx-2 my-2'>
                                    <img src={car.picture}>
                                    </img>
                                    <p className='pb-1 text-lg'>
                                        {car.name}
                                    </p>
                                    <p className='pb-1 font-bold'>
                                        Rp. {car.price} / hari
                                    </p>

                                    <div className='flex'>
                                        <ClockIcon className='w-8 pr-2'></ClockIcon>
                                        <p className='pb-1'>
                                            Updated At : {new Date(Number(car.updated_at)).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className='grid grid-cols-2 pt-2'>
                                        <button onClick={() => { setShowModal(true); setItemId(car.id) }} className='bg-red-500 hover:bg-red-700 text-white text-center font-bold py-2 mx-4 px-4 rounded'>
                                            <TrashIcon className="w-5 m-auto" ></TrashIcon> Delete
                                        </button>
                                        <button onClick={
                                            () => {
                                                navigate("/create", {
                                                    state: {
                                                        id: car.id,
                                                        name: car.name,
                                                        price: car.price,
                                                        size: car.size
                                                    }
                                                })
                                            }
                                        } className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 mx-4 px-4 rounded'>
                                            <PencilSquareIcon className="w-5 m-auto" ></PencilSquareIcon>
                                            Edit
                                        </button>
                                    </div>
                                </div> : null}

                            </>
                        ))}
                    </div>
                    <Dialog open={showModal} handler={() => { }} className='w-2/5 place-items-center'>
                        <DialogHeader>
                            <img className='m-auto' src="../src/assets/mobil.png"></img>
                        </DialogHeader>
                        <DialogBody>
                            <p className='font-bold text-lg'> Menghapus Mobil </p>
                            Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?
                        </DialogBody>
                        <DialogFooter className='flex flex-auto' >
                            <button key="yes"
                                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-auto'
                                color="red"
                                onClick={async () => {
                                    const response = await fetch(api_base_url + '/api/cars/delete/?id=' + itemId, {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                                        },
                                    });
                                    const responseJSON = await response.json();
                                    let carIndex = cars.findIndex(car => car.id === itemId)
                                    carIndex >= 1 ? cars.splice(carIndex) : null;
                                    setShowModal(false);
                                    alert("Succesfuly Deleted")
                                }}
                            >
                                <span className='font-bold'>Ya</span>
                            </button>
                            <button className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 m-auto' key="no" color="green"
                                onClick={() => { setShowModal(false) }}
                            >
                                <span className='font-bold'>Tidak</span>
                            </button>
                        </DialogFooter>
                    </Dialog>
                </div>

            </div>

        </>
    );
}
