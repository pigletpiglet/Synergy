import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const api_base_url = 'http://localhost:8082';

export default function CreateCar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [itemId, setItemId] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [currentFile, setCurrentFile] = useState<File>();
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      try {
        setName(location.state.name)
        setPrice(location.state.price)
        setSize(location.state.size)
        setItemId(location.state.id)
      } catch (error) {
        return;
      }
      return;
    }
  })

  const selectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    console.log(selectedFiles[0].name);
    await setCurrentFile(selectedFiles?.[0]);
    console.log(currentFile!.name);

  };


  return (
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
        <p className='mb-6 mt-6 font-bold text-2xl'>
          {!itemId ? "Tambah" : "Edit"} Mobil
        </p>
        <div className='grid grid-cols-3 px-8 w-[100%]'>

          <form>
            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">First name</label>
                <input value={name} onChange={({ target }) => {
                  setName(target.value);
                }} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mobil" required>
                </input>
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Price</label>
                <input value={price} onChange={({ target }) => {
                  setPrice(target.value);
                }} type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="5000" required>
                </input>
              </div>

              <div>
                <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Size</label>
                <input value={size} onChange={({ target }) => {
                  setSize(target.value);
                }}
                  type="number" id="size" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="2" required>
                </input>
              </div>
              <div>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="file_input">Upload Gambar</label>
                <input onChange={selectFile} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
                </input>
                <p className="mt-1 text-sm text-blackdark:text-black" id="file_input_help">SVG, PNG, JPG or GIF</p>
              </div>

            </div>

            <button
              onClick={async (e) => {
                e.preventDefault();
                if (!currentFile) {
                  alert('error: Gambar Tidak Boleh Kosong');
                  return;
                }

                console.log(!itemId)
                console.log(itemId)
                const formData = new FormData();
                formData.append('name', name);
                formData.append('price', price);
                formData.append('size', size);
                formData.append('picture', currentFile!);

                const response = await fetch(
                  api_base_url + (!currentFile ? '/api/cars' : ("/api/cars/edit/?id=" + itemId)),
                  {
                    method: 'post',
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                    body: formData,
                  }
                );

                const responseJson = await response.json();


                if (response.status !== 201) {
                  alert('error: ' + responseJson.message);
                }
                if (response.status == 201 || response.status == 200) {
                  navigate('/list');
                }
                // If create tweet succeed, redirect to home
              }}
              type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </div>

    </div>


  );
}
