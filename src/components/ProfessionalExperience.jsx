import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import './ProfessionalExperience.css';

const experienceData = [
    {
        company: "MULTYSENSE ASSOCIATES PVT. LTD.",
        location: "Kerala, India",
        period: "May 2022 – December 2025",
        roles: [
            {
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

const RoleAccordion = ({ role, isOpen, onToggle }) => {
    return (
        <div className="role-accordion-item">
            <button 
                className={`role-toggle-btn ${isOpen ? 'active' : ''}`}
                onClick={onToggle}
            >
                <div className="role-header-content">
                    <div className="role-tags">
                        {role.tags.map(tag => (
                            <span key={tag} className="role-tag">{tag}</span>
                        ))}
                    </div>
                    <h4 className="role-title">{role.title}</h4>
                </div>
                <motion.div 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={20} className="accordion-icon" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="role-content-wrapper"
                    >
                        <motion.ul 
                            className="responsibilities-list"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                        >
                            {role.responsibilities.map((resp, idx) => {
                                const isKeyContrib = resp.startsWith("Key Contribution:");
                                return (
                                    <motion.li 
                                        key={idx} 
                                        className={isKeyContrib ? "key-contribution" : ""}
                                        variants={{
                                            hidden: { opacity: 0, x: -10 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <CheckCircle2 size={16} className="task-bullet" />
                                        <span>
                                            {isKeyContrib ? (
                                                <><strong>Key Contribution:</strong> {resp.replace("Key Contribution:", "").trim()}</>
                                            ) : resp}
                                        </span>
                                    </motion.li>
                                );
                            })}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProfessionalExperience = () => {
    const [openRoles, setOpenRoles] = useState({});

    const toggleRole = (companyIndex, roleIndex) => {
        const key = `${companyIndex}-${roleIndex}`;
        setOpenRoles(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <section id="experience" className="experience-section">
            <div className="container">
                <motion.h2 
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    Professional Experience
                </motion.h2>

                <div className="experience-timeline">
                    <div className="timeline-spine"></div>
                    
                    {experienceData.map((exp, companyIdx) => (
                        <motion.div 
                            key={exp.company}
                            className="experience-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: companyIdx * 0.1 }}
                        >
                            <div className="timeline-marker">
                                <div className="marker-inner">
                                    <Briefcase size={16} />
                                </div>
                            </div>
                            
                            <div className="card-header">
                                <h3 className="company-name">{exp.company}</h3>
                                <div className="company-meta">
                                    <span className="meta-item">
                                        <MapPin size={14} />
                                        {exp.location}
                                    </span>
                                    <span className="meta-item">
                                        <Calendar size={14} />
                                        {exp.period}
                                    </span>
                                </div>
                            </div>

                            <div className="company-roles">
                                {exp.roles.map((role, roleIdx) => (
                                    <RoleAccordion 
                                        key={role.title}
                                        role={role}
                                        isOpen={openRoles[`${companyIdx}-${roleIdx}`]}
                                        onToggle={() => toggleRole(companyIdx, roleIdx)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfessionalExperience;
