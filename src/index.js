import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './pages/SignIn';
import { OtpScreen } from './pages/OtpScreen';
import { Dashboard } from './pages/Dashboard';
import { CreateProduct } from './pages/CreateProduct';
import { Orders } from './pages/Orders'
import { OrderDetails } from './pages/OrderDetails';
import { Test } from './pages/Test';
import { Sellers } from './pages/Sellers';
import { Customers } from './pages/Customers';
import { Products } from './pages/Products';
import Categories from './pages/Category/Categories';
import ViewCategoryProduct from './pages/ViewCategoryProduct';
import SubCategories from './pages/Category/SubCategories';
import SubSubCategories from './pages/Category/SubSubCategories';
import Manufacturers from './pages/Manufacturer';
import Layout from './components/Layout/Layout';
import 'react-datepicker/dist/react-datepicker.css';
import Doctors from './pages/Doctors';
import CreateDocter from './pages/Doctors/CreateDocter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/create" element={<CreateDocter />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/details" element={<OrderDetails />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/test" element={<Test />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/sub-categories" element={<SubCategories />} />
          <Route path="/sub-sub-categories" element={<SubSubCategories />} />
          <Route path="/manufacturers" element={<Manufacturers />} />
          <Route path="/view-all" element={<ViewCategoryProduct />} />
        </Route>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/otp" element={<OtpScreen />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
