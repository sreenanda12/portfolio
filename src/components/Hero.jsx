import React, { useEffect, useState } from 'react';
import FloatingToolsGrid from './FloatingToolsGrid';
import './Hero.css';



const Hero = () => {
    const [typedText, setTypedText] = useState('');
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [showDesc, setShowDesc] = useState(false);

    // Custom typing effect if css animation typing is too rigid
    useEffect(() => {
        const title = "MUHAMMED MUFLIH A";
        let index = 0;
        const timer = setInterval(() => {
            setTypedText(title.substring(0, index + 1));
            index++;
            if (index === title.length) {
                clearInterval(timer);
                setTimeout(() => setShowSubtitle(true), 500);
                setTimeout(() => setShowDesc(true), 1200);
            }
        }, 100);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="hero-section">
            {/* Background Orbs */}
            <div className="hero-orb-1"></div>
            <div className="hero-orb-2"></div>

            {/* Ambient Background Text */}
            <div className="ambient-bg-text">
                <div className="ambient-row animate-scroll-left">
                    <span>THE DESIGNER THE DESIGNER THE DESIGNER THE DESIGNER THE DESIGNER THE DESIGNER</span>
                </div>
                <div className="ambient-row animate-scroll-right">
                    <span>THE DESIGNER THE DESIGNER THE DESIGNER THE DESIGNER THE DESIGNER THE DESIGNER</span>
                </div>
                <div className="ambient-row animate-scroll-left">
                    <span>THE DESIGNER THE DESIGNER THE DESIGNER THE DESIGNER THE DESIGNER THE DESIGNER</span>
                </div>
            </div>


            <div className="hero-container container">

                {/* LEFT SIDE CONTENT */}
                <div className="hero-content">


                    <h1 className="hero-title">
                        <span className="typing-text-manual">{typedText}</span>
                    </h1>

                    <h2 className={`hero-subtitle ${showSubtitle ? 'visible' : ''}`}>
                        <span className="cursor">|</span> UI/UX Designer <span className="separator">|</span> Graphic Designer <span className="separator">|</span> Digital Marketing Professional
                    </h2>

                    <p className={`hero-description ${showDesc ? 'visible' : ''}`}>
                        Creative UI/UX Designer with 5+ years of experience across web, mobile, and digital platforms. Specialized in creating engaging user experiences through gamification, 3D visuals, and micro-interactions. Passionate about blending marketing, branding, and digital experience design.
                    </p>
                </div>

                {/* CENTER / HERO IMAGE */}
                <div className="hero-image-wrapper">
                    <img src="/hero-new.png" alt="Muhammed Muflih A" className="hero-profile-img" />
                </div>

                {/* RIGHT SIDE / TOOL CLUSTER */}
                <div className="hero-tools-cluster-3d">
                    <FloatingToolsGrid />
                </div>
            </div>
        </section>
    );
};

export default Hero;
