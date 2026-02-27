import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', to: 'home' },
        { name: 'About', to: 'about' },
        { name: 'Work Gallery', to: 'gallery' },
        { name: 'Contact', to: 'contact' },
    ];

    return (
        <div className={`top-header ${scrolled ? 'scrolled' : ''}`}>
            {/* Logo on the left */}
            <div className="logo-container">
                <span className="logo-text">MM</span>
                <span className="logo-hover-text">MUHAMMED MUFLIH A</span>
            </div>

            {/* Right side controls */}
            <div className="header-controls">
                <ThemeToggle />

                <button
                    className={`nav-btn ${isOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* The overlay popup menu */}
            <div className={`nav-overlay-menu ${isOpen ? 'active' : ''}`}>
                <ul className="nav-menu-list">
                    {navLinks.map((link) => (
                        <li key={link.name} className="nav-item">
                            <Link
                                activeClass="active"
                                to={link.to}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="nav-links"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
