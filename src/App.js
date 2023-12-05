//-------Admin Access-------//
//demo@gmail.com
//0000000000
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Carscreen from './screens/Carscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Ordersscreen from './screens/Ordersscreen';
import Userslist from './screens/Userslist';
import Orderslist from './screens/Orderslist';
import Pizzaslist from './screens/Pizzaslist';
import Addpizza from './screens/Addpizza';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/cart" element={<Carscreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path='/orders' element={<Ordersscreen />} />
          <Route path='/admin' element={<Userslist />} />
          <Route path="/admin/userslist" element={<Userslist />} />
          <Route path="/admin/orderslist" element={<Orderslist />} />
          <Route path="/admin/pizzaslist" element={<Pizzaslist />} />
          <Route path="/admin/addpizza" element={<Addpizza />} />
        </Routes>
      </Router>

    </div>
  );
}


export default App;
