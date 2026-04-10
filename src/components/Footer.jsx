import React from 'react';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-scroll';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">

                <div className="footer-top">
                    <div className="footer-socials" style={{ width: '100%', justifyContent: 'flex-start' }}>
                        <a href="https://linkedin.com/in/mhdmuflhindia" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
                        <a href="https://behance.net/muflihzayid" target="_blank" rel="noreferrer" aria-label="Behance" className="behance-icon">Bē</a>
                        <a href="mailto:muflinml8@gmail.com" aria-label="Email"><Mail size={20} /></a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-copyright-info">
                        <p>&copy; 2025 MUHAMMED MUFLIH A. All Rights Reserved.</p>
                        <a 
                            href="https://www.instagram.com/intellex.web?igsh=MWZyenU0bWc3M2RxOQ==" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="developer-link"
                        >
                            Meet the Developers
                        </a>
                    </div>
                    <Link to="home" smooth={true} duration={500} className="back-to-top">
                        Back to Top &uarr;
                    </Link>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
