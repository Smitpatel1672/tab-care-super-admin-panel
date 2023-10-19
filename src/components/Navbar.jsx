import React, { useState } from 'react'
import '../styles/navbar.css'
import logo from '../logo.svg';
import product from '../assets/svg/product.svg';
import category from '../assets/svg/category.svg';
import profile from '../assets/svg/profile.svg';
import logout from '../assets/svg/logout.svg';
import order from '../assets/svg/orders.svg';
import dashboardIcon from '../assets/svg/dashboard.svg'
import { useNavigate } from 'react-router';
import fullLogo from '../assets/svg/logo.svg'

export const Navbar = ({ handleMouseEnter, handleMouseLeave }) => {

  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);

  const navigateToDashboard = async (e) => {
    navigate('/dashboard');
  }

  const navigateToPage = async (e) => {
    navigate('/products');
  }

  const navigateToOrders = async (e) => {
    navigate('/orders');
  }
  // const navigateToCategories = async (e) => {
  //   navigate('/categories');
  // }

  const navigateToLogin = () => {
    localStorage.removeItem('wecare_token');
    navigate('/');
  }

  const navigateToCategories = (categoryType) => {
    if (categoryType === 'parent') {
      navigate('/categories');
    } else if (categoryType === 'sub') {
      navigate('/sub-categories');
    } else if (categoryType === 'sub-sub') {
      navigate('/sub-sub-categories');
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleMouseOut = () => {
    // setShowCategories(false);
    handleMouseLeave();
  }
  return (
    <div className="navbar" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOut}>
      <div className="menu-button mb-3 mt-2">
        <img src={fullLogo} className="logo-icon-text" alt="logo" />
        <img src={logo} className="logo-icon" alt="logo" />
      </div>
      <div className="menu-button" onClick={navigateToDashboard}>
        <img src={dashboardIcon} className="navbar-icon" alt="logo" />
        <p>Dashboard</p>
      </div>
      <div className="menu-button" onClick={toggleCategories}>
        <img src={category} className="navbar-icon" alt="logo" />
        <p>Categories</p>
      </div>
      {showCategories ? (
        <div className="sub-menu">
          <p onClick={() => navigateToCategories('parent')}>Parent Category</p>
          <p onClick={() => navigateToCategories('sub')}>Sub Category</p>
          <p onClick={() => navigateToCategories('sub-sub')}>Sub Sub Category</p>
        </div>
      ) : null}
      <div className="menu-button" onClick={() => navigate('/manufacturers')}>
        <img src={category} className="navbar-icon" alt="logo" />
        <p>Manufacturers</p>
      </div>
      <div className="menu-button" onClick={navigateToPage}>
        <img src={product} className="navbar-icon" alt="logo" />
        <p>Product</p>
      </div>
      <div className="menu-button" onClick={navigateToOrders}>
        <img src={order} className="navbar-icon" alt="logo" />
        <p>Orders</p>
      </div>
      <div className="menu-button">
        <img src={profile} className="navbar-icon" alt="logo" />
        <p>Profile</p>
      </div>
      <div className="menu-button" onClick={navigateToLogin}>
        <img src={logout} className="navbar-icon" alt="logo" />
        <p>Logout</p>
      </div>
      {/* <img src={dashboardIcon} className="navbar-icon" alt="logo" />
      <img src={dashboardIcon} className="navbar-icon" alt="logo" />
      <img src={dashboardIcon} className="navbar-icon" alt="logo" />
      <img src={dashboardIcon} className="navbar-icon" alt="logo" />
      <img src={dashboardIcon} className="navbar-icon" alt="logo" /> */}
    </div>
  )
}
