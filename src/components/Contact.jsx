import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Linkedin, Briefcase, MessageSquare, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Contact.css';

// Magnetic Hook for reusable magnetic elements
const Magnetic = ({ children }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        mouseX.set((clientX - centerX) * 0.3);
        mouseY.set((clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
        >
            {children}
        </motion.div>
    );
};

// Ripple Effect Hook
const useRipple = () => {
    const [ripples, setRipples] = useState([]);

    const createRipple = (event) => {
        const container = event.currentTarget.getBoundingClientRect();
        const size = Math.max(container.width, container.height);
        const x = event.clientX - container.left - size / 2;
        const y = event.clientY - container.top - size / 2;

        const newRipple = { x, y, size, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);
    };

    useEffect(() => {
        if (ripples.length > 0) {
            const timer = setTimeout(() => {
                setRipples((prev) => prev.slice(1));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [ripples]);

    return { ripples, createRipple };
};

const WhatsappIcon = ({ size = 20 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
        <path d="M14 14a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1Z" />
    </svg>
);

const Contact = () => {
    const { ripples, createRipple } = useRipple();
    const sectionRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };
        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, []);

    const contactMethods = [
        { icon: <WhatsappIcon size={24} />, label: "WhatsApp", value: "+971 50 503 4907", link: "https://wa.me/971505034907", color: "rgba(37, 211, 102, 0.15)" },
        { icon: <Mail size={24} />, label: "Email", value: "muflinml8@gmail.com", link: "mailto:muflinml8@gmail.com", color: "rgba(231, 111, 46, 0.15)" },
        { icon: <Phone size={24} />, label: "Phone", value: "+971 50 503 4907", link: "tel:+971505034907", color: "rgba(59, 130, 246, 0.15)" }
    ];

    const socials = [
        { icon: <Linkedin size={20} />, link: "https://linkedin.com/in/mhdmuflhindia", name: "LinkedIn" },
        { icon: <Briefcase size={20} />, link: "https://behance.net/muflihzayid", name: "Behance" },
        { icon: <MessageSquare size={20} />, link: "https://dribbble.com", name: "Dribbble" }
    ];

    return (
        <section 
            id="contact" 
            className="luxury-contact-section" 
            ref={sectionRef}
            onClick={createRipple}
        >
            {/* NOISE TEXTURE OVERLAY */}
            <div className="grain-overlay"></div>

            {/* CURSOR GLOW */}
            <div 
                className="cursor-glow-bubble"
                style={{
                    left: `${mousePos.x}px`,
                    top: `${mousePos.y}px`
                }}
            ></div>

            {/* PARALLAX GRADIENT BLOBS */}
            <div className="parallax-blobs">
                <div className="blob-1" style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}></div>
                <div className="blob-2" style={{ transform: `translate(${mousePos.x * -0.015}px, ${mousePos.y * -0.015}px)` }}></div>
            </div>

            {/* CLICK RIPPLES */}
            {ripples.map(ripple => (
                <span 
                    key={ripple.id} 
                    className="click-ripple"
                    style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
                />
            ))}

            <div className="container luxury-layout">
                {/* LEFT: EMOTIONAL SECTION */}
                <div className="luxury-left">
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="luxury-availability">
                            <span className="availability-dot"></span>
                            <span>Available for new opportunities</span>
                        </div>

                        <h1 className="luxury-headline">
                            Let's build <br />
                            something <span className="amazing-gradient">amazing.</span>
                        </h1>

                        <p className="luxury-subtext">
                            I'm available for freelance projects and full-time roles. <br />
                            Let's create something meaningful together.
                        </p>
                    </motion.div>
                </div>

                {/* RIGHT: CONTACT CARDS */}
                <div className="luxury-right">
                    <div className="luxury-cards-stack">
                        {contactMethods.map((method, idx) => (
                            <Magnetic key={method.label}>
                                <motion.a
                                    href={method.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="luxury-glass-card"
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: idx * 0.15 }}
                                >
                                    <div className="luxury-card-icon" style={{ backgroundColor: method.color }}>
                                        {method.icon}
                                    </div>
                                    <div className="luxury-card-info">
                                        <span className="luxury-card-label">{method.label}</span>
                                        <span className="luxury-card-value">{method.value}</span>
                                    </div>
                                    <ArrowUpRight className="luxury-card-arrow" strokeWidth={2.5} size={20} />
                                </motion.a>
                            </Magnetic>
                        ))}
                    </div>

                    {/* SOCIAL FOOTER */}
                    <motion.div 
                        className="luxury-social-footer"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <span className="social-tagline">Or follow me at</span>
                        <div className="luxury-social-row">
                            {socials.map((social) => (
                                <Magnetic key={social.name}>
                                    <a 
                                        href={social.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="luxury-social-icon"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
