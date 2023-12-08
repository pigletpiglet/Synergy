import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateCar from './pages/CreateCar';
import Dashboard from './pages/Dashboard';
import ListCar from './pages/ListCar';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/list' element={<ListCar />} />
        <Route path='/create-tweet' element={<CreateCar />} />
      </Routes>
    </>
  );
}

export default App;
