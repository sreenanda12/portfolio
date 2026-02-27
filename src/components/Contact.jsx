import React, { useEffect, useRef } from 'react';
import { Phone, Mail, Linkedin, Briefcase } from 'lucide-react';
import './Contact.css';

// Custom SVG for WhatsApp since Lucide doesn't have an exact WhatsApp logo
const WhatsappIcon = ({ size = 22, color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65-3.8A9 9 0 1 1 20 18.5 9 9 0 0 1 6.8 20L3 21Z" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
        <path d="M14 14a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" />
        <path d="M9.5 8.5c.33-.33.33-.83 0-1.16-.33-.33-.83-.33-1.16 0L7.5 8.2c-.33.33-.33.86 0 1.2a11.5 11.5 0 0 0 6.6 6.6c.34.33.87.33 1.2 0l.86-.86c.33-.33.33-.83 0-1.16-.33-.33-.83-.33-1.16 0l-.5.5" />
    </svg>
);



const Contact = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.animate-contact');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <section id="contact" className="section new-contact-section" ref={sectionRef}>
            <div className="container contact-container-inner">

                <div className="contact-left-content animate-contact fade-up" style={{ width: '100%', maxWidth: '800px' }}>
                    <h1 className="contact-hero-text" style={{ textAlign: 'left' }}>
                        <span className="text-white">LET'S</span><br />
                        <span className="text-gold">CONNECT</span>
                    </h1>

                    <div className="contact-inquiry-box" style={{ textAlign: 'left', marginTop: '3rem' }}>
                        <p className="contact-inquiry-label">FOR INQUIRIES</p>
                    </div>

                    <div className="contact-bottom-socials" style={{ justifyContent: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
                        <a href="https://wa.me/971505034907" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="WhatsApp">
                            <WhatsappIcon color="currentColor" />
                        </a>
                        <a href="tel:+971505034907" className="social-circle-btn" aria-label="Call">
                            <Phone size={22} color="currentColor" />
                        </a>
                        <a href="https://linkedin.com/in/mhdmuflhindia" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="LinkedIn">
                            <Linkedin size={22} color="currentColor" />
                        </a>
                        <a href="mailto:muflinml8@gmail.com" className="social-circle-btn" aria-label="Email">
                            <Mail size={22} color="currentColor" />
                        </a>
                        <a href="https://behance.net/muflihzayid" target="_blank" rel="noopener noreferrer" className="social-circle-btn" aria-label="Behance">
                            <Briefcase size={22} color="currentColor" />
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
