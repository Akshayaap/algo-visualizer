import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { useState } from 'react';
import { NavbarBrand } from 'react-bootstrap';


const Navbar = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <React.Fragment>
            <nav className="navbar">

                <div className="nav-container" >

                    <NavLink to="/" className="nav-logo">
                        THE AKSHAY
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" onClick={handleClick}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/projects" activeClassName="active" className="nav-link" onClick={handleClick}>
                                Projects
                            </NavLink>
                        </li >
                        <li className="nav-item">
                            <NavLink to="/services" activeClassName="active" className="nav-link" onClick={handleClick}>
                                Services
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/other-sites" activeClassName="active" className="nav-link" onClick={handleClick}>
                                Other Sites
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" activeClassName="active" className="nav-link" onClick={handleClick}>
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" activeClassName="active" className="nav-link" onClick={handleClick}>
                                Contact
                            </NavLink>
                        </li>

                    </ul>

                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : 'fas fa-bars'}>

                        </i>
                    </div>

                </div>
            </nav>
        </React.Fragment>
    )
}


export default Navbar