import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AddGuest from './Components/AddGuest.js';
import HotelList from './Components/HotelList.js';
import Home from './Components/Home.js';
import RoomsToHotel from './Components/RoomsToHotel.js';
import AddReservation from './Components/AddReservation.js';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">Home Page</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/HotelList">Hotel List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/AddGuest">Add Guest</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/HotelList" element={<HotelList />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/AddGuest" element={<AddGuest />} />
            <Route path="/" element={<Home />} />
            <Route path="/rooms/:hotelId" element={<RoomsToHotel />} />
            <Route path="/hotel/:hotelId" element={<RoomsToHotel />} />
            <Route path="/add-reservation/:roomId" element={<AddReservation />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
