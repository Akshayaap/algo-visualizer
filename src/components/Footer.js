import React from 'react'
import { Link } from "react-router-dom";
import './footer.css'



const Footer = () => {

    //html2canvas(document.querySelector("body"),document.querySelector("home"));

    return (
        <div className="footer">
            <div className="footer-content">
                <ul className='social'>
                    <li className='social-item'>
                        <a href='https://www.twitter.com/_the_akshay'>
                            <div className='social-icon'></div>
                        </a>
                        <div className='social-text'>Twitter</div>
                    </li>
                    <li className='social-item'>
                        <a href='mailto:akshaykumarparmar51@gmail.com'>
                            <div className='social-icon'></div>
                        </a>

                        <div className='social-text'>Gmail</div>
                    </li>
                    <li className='social-item'>
                        <a href='https://www.twitter.com/Akshayaap'>
                            <div className='social-icon'></div>
                        </a>
                        <div className='social-text'>GitHub</div>
                    </li>
                    <li className='social-item'>
                        <a href='lol'>
                            <div className='social-icon'></div>
                        </a>
                        <div className='social-text'>Linked in</div>
                    </li>
                </ul>
            </div>


        </div>
    );
}

export default Footer