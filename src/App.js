import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { CartProvider } from './components/ContextReducer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrders';
import About from './components/about';
import Contact from './components/Contact';
import Cancel from './components/Cancel';
import Success from './components/Success';
import Profile from './components/Profile';
// import Body from './components/Body';
import Restaurant from './screens/Restaurant';
import Display from './components/Display';
import Item from './components/addItem';
import RestaurantDetail from './screens/RestaurantDetail';
import Error from './components/Error';
import PasswordGenerator from './components/passwordGenerator';


function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/addrestaurant" element={<Restaurant />} />
              <Route path="/display" element={<Display />} />
              <Route path="/display/:_id" element={<RestaurantDetail />} />
              <Route path="/addItem" element={<Item />} />
              <Route path="/auth/createuser" element={<Signup />} />
              <Route path="/myorder" element={<MyOrder />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/forgot-password" element={<PasswordGenerator />} />
              <Route element={<Error />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
