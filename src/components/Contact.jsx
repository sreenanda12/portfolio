import React from 'react';
import { Phone, Mail, Linkedin, Briefcase, Globe, MessageSquare, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Contact.css';

// Custom SVG for WhatsApp
const WhatsappIcon = ({ size = 20, color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65-3.8A9 9 0 1 1 20 18.5 9 9 0 0 1 6.8 20L3 21Z" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
        <path d="M14 14a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" />
        <path d="M9.5 8.5c.33-.33.33-.83 0-1.16-.33-.33-.83-.33-1.16 0L7.5 8.2c-.33.33-.33.86 0 1.2a11.5 11.5 0 0 0 6.6 6.6c.34.33.87.33 1.2 0l.86-.86c.33-.33.33-.83 0-1.16-.33-.33-.83-.33-1.16 0l-.5.5" />
    </svg>
);

const Contact = () => {
    const contactMethods = [
        {
            icon: <WhatsappIcon size={24} />,
            label: "WhatsApp",
            value: "+971 50 503 4907",
            link: "https://wa.me/971505034907",
            color: "#25D366"
        },
        {
            icon: <Mail size={24} />,
            label: "Email",
            value: "muflinml8@gmail.com",
            link: "mailto:muflinml8@gmail.com",
            color: "#E76F2E"
        },
        {
            icon: <Phone size={24} />,
            label: "Phone",
            value: "+971 50 503 4907",
            link: "tel:+971505034907",
            color: "#3B82F6"
        }
    ];

    const socials = [
        { icon: <Linkedin size={20} />, link: "https://linkedin.com/in/mhdmuflhindia", name: "LinkedIn" },
        { icon: <Briefcase size={20} />, link: "https://behance.net/muflihzayid", name: "Behance" },
        { icon: <MessageSquare size={20} />, link: "https://dribbble.com", name: "Dribbble" } // Placeholder for Dribbble
    ];

    return (
        <section id="contact" className="premium-contact-section">
            <div className="contact-glow-1"></div>
            <div className="contact-glow-2"></div>

            <div className="container">
                <div className="contact-layout-wrapper">
                    {/* LEFT CONTENT — LARGE TYPOGRAPHY */}
                    <div className="contact-typography-column">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="contact-pre-title">HAVE A PROJECT IN MIND?</span>
                            <h1 className="contact-main-heading">
                                Let's build <br />
                                <span className="highlight-text">something</span> <br />
                                amazing.
                            </h1>
                            <p className="contact-sub-description">
                                I'm currently available for freelance projects and full-time roles. 
                                Reach out and let's turn your ideas into reality.
                            </p>

                            <div className="availability-status">
                                <span className="pulse-dot"></span>
                                Available for new opportunities
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT CONTENT — CONTACT CARDS & SOCIALS */}
                    <div className="contact-actions-column">
                        <div className="contact-cards-grid">
                            {contactMethods.map((method, idx) => (
                                <motion.a
                                    key={method.label}
                                    href={method.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-method-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                >
                                    <div className="method-icon-wrap" style={{ '--accent-c': method.color }}>
                                        {method.icon}
                                    </div>
                                    <div className="method-info">
                                        <span className="method-label">{method.label}</span>
                                        <span className="method-value">{method.value}</span>
                                    </div>
                                    <ArrowUpRight className="method-arrow" size={20} />
                                </motion.a>
                            ))}
                        </div>

                        <motion.div 
                            className="social-links-footer"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <span className="social-footer-label">OR FOLLOW ME AT</span>
                            <div className="social-pill-container">
                                {socials.map((social) => (
                                    <a 
                                        key={social.name} 
                                        href={social.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="social-glass-pill"
                                    >
                                        {social.icon}
                                        <span>{social.name}</span>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

