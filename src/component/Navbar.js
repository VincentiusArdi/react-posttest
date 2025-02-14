import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import navLogo from '../assets/image/SPONSOR-UPDATE.png';
import { Avatar } from 'primereact/avatar';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
   

    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-chart-bar',
            path: '/'
        },
        {
            label: 'Inventaris',
            icon: 'pi pi-warehouse',
            path: '/inventaris'
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            path: '/profile'
        }
    ];

    return (
        <header className="nav-header">
            <nav className="nav">
                {/* Logo */}
                <img
                    src={navLogo}
                    alt="Logo"
                    className="nav-logo"
                    onClick={() => navigate("/")}
                />

                {/* Menu Toggle (for mobile) */}
                <i className="pi pi-bars menu-toggle" onClick={() => setMenuOpen(!menuOpen)}></i>

                {/* Menu */}
                <ul className={menuOpen ? "show" : ""}>
                    {items.map((item, index) => (
                        <li key={index} className="custom-menu-item" onClick={() => navigate(item.path)}>
                            <i className={item.icon}></i> {item.label}
                        </li>
                    ))}
                </ul>

                {/* User Avatar */}
                <div className="nav-user">
                    <Avatar label="O" shape="circle" className="user-icon" />
                    <span className="user-text">Hi, Ogya</span>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
