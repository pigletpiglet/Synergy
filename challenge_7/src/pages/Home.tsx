import { Menu } from '@headlessui/react'
import Header from '../components/Header';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
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



export default function Home() {

  const api_base_url = 'http://localhost:8082';
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <>
      {Header()}
      <div style={{ height: 120 }}></div>
      <section id="main-section" className="container pl-0">
        <div className="px-4 py-5 position-relative">
          <div className='grid grid-cols-2 align-middle'>
            <div className="col-span-1 p-5">
              <img className="" src="https://i.ibb.co/zPKWNft/img-car.png" alt="PNG Mobil"></img>
            </div>
            <div className="col-span-1 align-middle m-auto">
              <div className="">
                <div className=" py-4">
                  <h1 className="font-bold text-xl">Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)</h1>
                </div>
                <p className=''>
                  Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga
                  terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.
                </p>


              </div>

            </div>
          </div>
          <div style={{ bottom: "5px", paddingBottom: "20px" }}
            className=" container grid grid-cols-12 rounded-lg p-6 shadow-xl border-indigo-200">
            <div className='col-span-3'>
              <Menu>
                <Menu.Button className="inline-flex w-50% justify-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">Tipe Driver <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5 text-black hover:text-gray-800"
                  aria-hidden="true"
                />
                </Menu.Button>
                <Menu.Items className="mt-2 w-56 divide-y origin-top-right flex-auto rounded-md shadow-lg ring-1 ring-white focus:outline-none">
                  <Menu.Item >
                    {({ active }) => (
                      <button
                        onClick={() => { active }}
                      >
                        Dengan Driver
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item >
                    {({ active }) => (
                      <button
                        onClick={() => { active }}
                      >
                        Tanpa Driver
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
            <div className="col-span-3">
              <p>
                Tanggal
              </p>
              <input className="form-control" type="date" name="date" id="input-date">
              </input>

            </div>
            <div className="col-span-3">
              <p>
                Waktu Jemput/Ambil
              </p>
              <input className="form-control" type="time" name="time" id="input-time">
              </input>

            </div>
            <div className="col-span-2">
              <p>
                Jumlah (Optional)
              </p>
              <input className="" id="input-amount">
              </input>
            </div>
            <div className="col-span-1">
              <button onClick={() => { }} type="button" className="text-white py-2 px-5"
                style={{ backgroundColor: "#5CB85F" }}>Cari</button>
            </div>
          </div>
        </div>

      </section >


    </>
  );
}
