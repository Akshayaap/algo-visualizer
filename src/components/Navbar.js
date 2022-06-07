import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { useState } from 'react';


const Navbar = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <React.Fragment>
            <nav className="navbar">

                <div className="nav-container" >

                    <NavLink exact to="/" className="nav-logo">
                        THE AKSHAY
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" onClick={handleClick}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/projects" activeClassName="active" className="nav-link" onClick={handleClick}>
                                Projects
                            </NavLink>
                        </li >
                        <li className="nav-item">
                            <NavLink exact to="/services" activeClassName="active" className="nav-link" onClick={handleClick}>
                                Services
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/other-sites" activeClassName="active" className="nav-link" onClick={handleClick}>
                                Other Sites
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/about" activeClassName="active" className="nav-link" onClick={handleClick}>
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/contact" activeClassName="active" className="nav-link" onClick={handleClick}>
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