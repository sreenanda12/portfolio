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
        { name: 'Portfolio', to: 'portfolio' },
        { name: 'About', to: 'who-i-am' },
        { name: 'Contact', to: 'contact' },
    ];

    return (
        <div className={`top-header ${scrolled ? 'scrolled' : ''}`}>
            {/* Left side Theme Toggle (was Logo) */}
            <div className="left-controls">
                 <ThemeToggle />
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-navbar">
                <ul className="desktop-nav-list">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                activeClass="active"
                                to={link.to}
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={700}
                                className="desktop-nav-link"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Right side controls (Hamburger only) */}
            <div className="header-controls">
                <button
                    className={`hamburger-btn ${isOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Overlay Menu */}
            <div className={`nav-overlay-menu ${isOpen ? 'active' : ''}`}>
                <ul className="nav-menu-list">
                    {navLinks.map((link) => (
                        <li key={link.name} className="nav-item">
                            <Link
                                activeClass="active"
                                to={link.to}
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={700}
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
