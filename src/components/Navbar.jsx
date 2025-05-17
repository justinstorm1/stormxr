import React from 'react';
import './Navbar.css';

const navbarLinks = [
    {
        title: 'About',
        link: 'about',
    },
    {
        title: 'Focus',
        link: 'focuses',
    },
    {
        title: 'Founder',
        link: 'founder',
    },
    {
        title: 'Contact',
        link: 'contact',
    },
];

export default function Navbar(props) {
    return (
        <nav className={`navbar navbar-expand-md fixed-top ${props.filled && 'filled'}`} id="navbar">
            <div className="container px-4 px-lg-5">
                <a href="/" className="navbar-brand">
                    StormXR
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-headset-vr ms-1" viewBox="0 0 16 16">
                        <path d="M8 1.248c1.857 0 3.526.641 4.65 1.794a5 5 0 0 1 2.518 1.09C13.907 1.482 11.295 0 8 0 4.75 0 2.12 1.48.844 4.122a5 5 0 0 1 2.289-1.047C4.236 1.872 5.974 1.248 8 1.248"/>
                        <path d="M12 12a4 4 0 0 1-2.786-1.13l-.002-.002a1.6 1.6 0 0 0-.276-.167A2.2 2.2 0 0 0 8 10.5c-.414 0-.729.103-.935.201a1.6 1.6 0 0 0-.277.167l-.002.002A4 4 0 1 1 4 4h8a4 4 0 0 1 0 8"/>
                    </svg>
                </a>
                <button className="navbar-toggler navbar-toggler-right" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <i className="bi bi-list fs-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ms-auto">
                        {navbarLinks.map((item, index) =>(
                            <li 
                                key={index} 
                                className='nav-item'
                            >
                                <a
                                    href={`#${item.link}`}
                                    className='nav-link'
                                >{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}