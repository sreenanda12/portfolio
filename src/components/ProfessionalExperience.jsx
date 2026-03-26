import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, CheckCircle2, Building2, ExternalLink } from 'lucide-react';
import './ProfessionalExperience.css';

const experienceData = [
    {
        company: "MULTYSENSE ASSOCIATES PVT. LTD.",
        location: "Kerala, India",
        period: "May 2022 – December 2025",
        roles: [
            {
                id: "multy-1",
                title: "UI/UX Designer – INTERACTIVE & GAMIFIED EXPERIENCES",
                tags: ["UX Design", "Gamification", "3D UI", "Figma", "Unity"],
                responsibilities: [
                    "Designed interactive UI/UX concepts integrating gamification, 3D visuals, and micro-interactions to improve engagement.",
                    "Created avatar-based layouts, interactive interface elements, and small Unity-based prototypes to support product concepts.",
                    "Collaborated on website UX enhancements including user flows, navigation systems, and responsive layouts.",
                    "Used Blender for basic 3D props, UI assets, and environment mockups for design visualization.",
                    "Built interactive prototypes in Figma & Unity (basic level) to demonstrate animated user journeys.",
                    "Designed visuals for branding, digital campaigns, and product experience strategy.",
                    "Improved UX clarity and UI accessibility across different platforms and screen sizes.",
                    "Key Contribution: Helped position the company’s design direction toward interactive, modern, experience-driven interfaces that feel more like products than static websites."
                ]
            },
            {
                id: "multy-2",
                title: "Digital Marketing & Creative Designer",
                tags: ["Digital Marketing", "Branding", "Social Media", "Creatives"],
                responsibilities: [
                    "Designed and managed digital marketing creatives for social media, websites, and campaigns.",
                    "Created high-performing visual content to increase engagement and brand visibility.",
                    "Supported social media marketing efforts through consistent branding and campaign visuals.",
                    "Designed promotional banners, ads, email creatives, and landing page visuals.",
                    "Collaborated with marketing teams to align creatives with campaign goals and lead generation.",
                    "Improved social media engagement and website interaction through design optimization.",
                    "Managed multiple creative deliverables while meeting tight deadlines."
                ]
            },
            {
                id: "multy-3",
                title: "Digital Marketing & Creative Designer (Campaign Specialists)",
                tags: ["SEO", "Campaign Design", "Storytelling", "Performance"],
                responsibilities: [
                    "Designed social media creatives, promotional ads, and digital campaign assets.",
                    "Supported SEO and performance marketing with optimized visual content.",
                    "Assisted in planning and executing digital campaigns across platforms.",
                    "Improved online reach and audience engagement through creative storytelling."
                ]
            }
        ]
    },
    {
        company: "SPOTTERONLINE PVT. LTD.",
        location: "Kerala, India",
        period: "April 2020 – April 2022",
        roles: [
            {
                id: "spotter-1",
                title: "Digital Marketing & Creative Designer",
                tags: ["SEO", "Ad Campaigns", "Storytelling", "Engagement"],
                responsibilities: [
                    "Designed digital marketing creatives for social media, websites, and campaigns.",
                    "Created visual assets to increase online engagement and conversion rates.",
                    "Supported SEO and performance marketing through optimized visual content.",
                    "Designed email marketing creatives, banners, and promotional graphics.",
                    "Coordinated with marketing teams to align creative outputs with campaign goals.",
                    "Developed brand-consistent creatives across multiple digital platforms.",
                    "Analyzed creative performance metrics and optimized designs accordingly.",
                    "Managed multiple campaign creatives simultaneously.",
                    "Supported website visuals and landing page designs.",
                    "Enhanced brand visibility & audience engagement through creative storytelling."
                ]
            },
            {
                id: "spotter-2",
                title: "Graphic Designer",
                tags: ["Branding", "Print Design", "UI Visualization", "Consistency"],
                responsibilities: [
                    "Designed social media creatives, posters, banners, and advertisements.",
                    "Created promotional graphics for digital marketing campaigns.",
                    "Developed branding materials including logos, brochures, and flyers.",
                    "Designed online advertisements for marketing platforms.",
                    "Assisted with website layout design and UI-related visual elements.",
                    "Worked extensively with Adobe Photoshop and Adobe Illustrator.",
                    "Ensured brand consistency across all design outputs.",
                    "Collaborated with marketing teams on visual strategy execution."
                ]
            }
        ]
    }
];

const ExperienceCard = ({ company }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeRoleIndex, setActiveRoleIndex] = useState(0);
    const cardRef = useRef(null);
    
    // 3D Tilt Effect Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const activeRole = company.roles[activeRoleIndex];

    return (
        <motion.div 
            className="exp-glass-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, perspective: 1000 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="exp-card-glow"></div>
            
            <div className="exp-card-content">
                {/* Header */}
                <div className="exp-header">
                    <div className="exp-company-info">
                        <Building2 className="exp-building-icon" size={24} />
                        <div>
                            <h3 className="exp-company-name">{company.company}</h3>
                            <div className="exp-meta">
                                <span className="exp-meta-item"><MapPin size={14} /> {company.location}</span>
                                <span className="exp-meta-item"><Calendar size={14} /> {company.period}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Role Toggle Tabs */}
                <div className="role-switcher">
                    {company.roles.map((role, idx) => (
                        <button 
                            key={role.id}
                            className={`role-tab ${activeRoleIndex === idx ? 'active' : ''}`}
                            onClick={() => {
                                setActiveRoleIndex(idx);
                                setIsExpanded(false);
                            }}
                        >
                            {idx === 0 ? "Main Role" : `Role ${idx + 1}`}
                        </button>
                    ))}
                </div>

                {/* Active Role Content */}
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeRole.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="active-role-container"
                    >
                        <h4 className="active-role-title">{activeRole.title}</h4>
                        
                        <div className="exp-tags-row">
                            {activeRole.tags.slice(0, 4).map(tag => (
                                <span key={tag} className="exp-tag">{tag}</span>
                            ))}
                            {activeRole.tags.length > 4 && (
                                <span className="exp-tag more">+{activeRole.tags.length - 4} more</span>
                            )}
                        </div>

                        <button 
                            className={`view-details-btn ${isExpanded ? 'expanded' : ''}`}
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                            <ChevronDown size={18} />
                        </button>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div 
                                    className="details-expansion"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <ul className="details-list">
                                        {activeRole.responsibilities.map((resp, i) => (
                                            <li key={i}>
                                                <CheckCircle2 size={16} className="details-check" />
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const ProfessionalExperience = () => {
    return (
        <section id="experience" className="modern-exp-section">
            <div className="container">
                {/* NEW DUAL-GRID DIRECT RENDER */}
                <div className="exp-grid-layout">
                    {experienceData.map((company) => (
                        <div key={company.company} className="exp-card-wrapper">
                            <ExperienceCard company={company} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfessionalExperience;
