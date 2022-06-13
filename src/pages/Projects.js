import React from 'react';
import './projects.css';
import chessLogo from './../assets/chess/chess.png';
import h6502Logo from './../assets/6502/6502.png';
import SortingLogo from './../assets/sorting/sorting.png';

import { NavLink } from 'react-router-dom';

//this react component creates webpage for listing all my web projects with url to the real project

const Projects = () => {
    return (
        <div className="projects">
            <h1 id='title'>Projects</h1>
            <div className="project-container">
                <div className="project-card">
                    <div className='project-details'>
                        <div className="project-card-image">
                            <img src={chessLogo} alt="project-image" width={200} height={200} />
                        </div>
                        <div className="project-card-content">
                            <h3>Chess</h3>
                            <p>A Chess</p>

                        </div>
                    </div>

                    <NavLink to="/chess" >
                        <button className="project-button">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </NavLink>
                </div>
                <div className="project-card">
                    <div className='project-details'>
                        <div className="project-card-image">
                            <img src={h6502Logo} alt="project-image" width={200} height={200} />
                        </div>
                        <div className="project-card-content">
                            <h3>6502</h3>
                            <p>6502 is 8 bit microprocessor used in many commputers like Atari 400, comodore 64, Apple II</p>

                        </div>
                    </div>

                    <NavLink to="/h6502" >
                        <button className="project-button">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </NavLink>
                </div>
                <div className="project-card">
                    <div className='project-details'>
                        <div className="project-card-image">
                            <img src={SortingLogo} alt="project-image" width={200} height={200} />
                        </div>
                        <div className="project-card-content">
                            <h3>Sorting Viualization</h3>
                            <p>Viualization of Various Sorting Algorithms</p>

                        </div>
                    </div>

                    <NavLink to="/sorting" >
                        <button className="project-button">
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Projects;