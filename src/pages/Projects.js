import React from 'react';
import './projects.css';
import chessImage from './../assets/chess/chess.png';

import { NavLink } from 'react-router-dom';

//this react component creates webpage for listing all my web projects with url to the real project

const Products = () => {
    return (
        <div className="projects">
            <h1>Projects</h1>
            <div className="project-container">
                <div className="project-card">
                    <div className="project-card-image">
                        <img src={chessImage} alt="project-image" width={200} height={200} />
                    </div>
                    <div className="project-card-content">
                        <h3>Chess</h3>
                        <p>A Chess</p>
                        <NavLink exact to="/chess" >
                            <button className="project-button">
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </NavLink>

                    </div>


                </div>
                <div className="project-card">
                    <div className="project-card-image">
                        <img src="..." alt="project-image" />
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Products;