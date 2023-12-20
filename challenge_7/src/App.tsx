import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CreateCar from './pages/CreateCar';
import Dashboard from './pages/Dashboard';
import ListCar from './pages/ListCar';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/list' element={<ListCar />} />
        <Route path='/create' element={<CreateCar />} />
      </Routes>
    </>
  );
}

export default App;
