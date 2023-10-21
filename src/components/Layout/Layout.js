import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'
import Header from './Header'
import { BreadcrumbItem, Breadcrumb } from 'reactstrap'

export default function Layout() {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    const containerClassName = isHovered ? 'hovered main_inner' : 'main_inner ';
    return (
        <main className="main">
            <Navbar
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
            />
            <div className={containerClassName}>
                <Header />
                <div className='main_container'>
                    <Outlet />
                </div>
            </div>
        </main>
    )
}
