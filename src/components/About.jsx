import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import { Award, Briefcase, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import CertificationModal from './CertificationModal';
import Education3DCard from './Education3DCard';
import WorkExperienceStack from './WorkExperienceStack';

const educationData = [
    {
        id: 1,
        title: "Master of Commerce, Business/Commerce, General",
        institution: "Annamalai University",
        date: "Jun 2021 – Apr 2023",
        grade: "First Class A Grade",
        skills: ["English"],
        activities: ""
    },
    {
        id: 2,
        title: "Bachelor of Commerce – BCom, Banking, Corporate, Finance, and Securities Law",
        institution: "University of Kerala",
        date: "Jun 2017 – Mar 2020",
        grade: "A",
        skills: ["Hindi", "English", "Malayalam"],
        activities: ""
    },
    {
        id: 3,
        title: "Bachelor of Commerce – BCom, Co operation",
        institution: "University of Kerala",
        date: "Jun 2017 – Feb 2020",
        grade: "",
        skills: ["Hindi", "English", "Microsoft Office", "Malayalam"],
        activities: ""
    },
    {
        id: 4,
        title: "Commerce & Computer Application, Business/Commerce, General",
        institution: "CP Higher Secondary School, Kadakkal",
        date: "2015 – 2017",
        grade: "92% marks",
        skills: ["Hindi", "English", "Malayalam"],
        activities: ""
    },
    {
        id: 4,
        title: "High School, High School Education SSLC",
        institution: "SCERT Kerala",
        date: "Jun 2012 – Mar 2015",
        grade: "95% Score",
        skills: ["Hindi", "English", "Malayalam"],
        activities: ""
    },
    {
        id: 5,
        title: "Professional Diploma in Indian and Foreign Accounting System, Accounting",
        institution: "G TEC Education Calicut",
        date: "Aug 2022 – May 2025",
        grade: "A",
        skills: ["HTML5", "User Interface Design", "Web Design", "Microsoft Office"],
        activities: ""
    },
    {
        id: 6,
        title: "Certified Unity Game Developer, Game and Interactive Media Design",
        institution: "ASAP Institute Trivandrum KINFRA",
        date: "Jun 2024 – May 2025",
        grade: "A",
        skills: ["UI/UX Designing", "Web Design"],
        activities: ""
    },
    {
        id: 7,
        title: "Social Media & Graphic Designing, Graphic Design",
        institution: "G-TEC Education",
        date: "2016 – 2016",
        grade: "A+ Grade",
        skills: ["Web Design"],
        activities: "Social Media Management, Adobe Photoshop, Illustrator, InDesign, Premiere Pro, Fresco, MS Office, Adobe XD, Figma"
    }
];

const certData = [
    {
        id: 1,
        title: "Unity Certified Associate: Game Developer",
        issuer: "ASAP Kerala",
        issuedDate: "Issued May 2025",
        imgSrc: null, // placeholder
        credentialId: null,
        skills: ["Blender", "Unity", "Game Mechanics", "C#", "Unreal Engine", "Game Development", "Game Design"]
    },
    {
        id: 2,
        title: "Adobe Certified Associate in Graphic Design & Illustration Using Adobe Illustrator",
        issuer: "G-Tec Computer Education",
        issuedDate: "Issued May 2019",
        imgSrc: "/gtec.jpeg",
        credentialId: "290655",
        skills: ["Graphic Design", "Photography", "Figma (Software)", "Adobe Lightroom", "Adobe Premiere Pro", "Social Media Marketing", "Adobe Fresco", "Adobe Illustrator", "Adobe XD", "UI/UX Designing", "Adobe Photoshop", "Adobe Creative Suite"]
    },
    {
        id: 3,
        title: "SOCIAL MEDIA EXPERT",
        issuer: "G-Tec Computer Education",
        issuedDate: "Issued May 2019",
        imgSrc: "/asap.jpeg",
        credentialId: "290656",
        skills: ["Graphic Design", "Photography", "Social Media Marketing", "Google Ads", "Digital Marketing", "Canva", "Meta Ad"]
    }
];

const workData = [
    {
        company: "MULTYSENSE ASSOCIATES PVT. LTD. | KERALA, INDIA",
        date: "May 2022 – December 2025",
        roles: [
            {
                title: "UI/UX Designer – INTERACTIVE & GAMIFIED EXPERIENCES",
                tasks: [
                    "Designed interactive UI/UX concepts integrating gamification, 3D visuals, and micro-interactions to improve engagement.",
                    "Created avatar-based layouts, interactive interface elements, and small Unity based prototypes to support product concepts.",
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
                tasks: [
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
                title: "Digital Marketing & Creative Designer",
                tasks: [
                    "Designed social media creatives, promotional ads, and digital campaign assets.",
                    "Supported SEO and performance marketing with optimized visual content.",
                    "Assisted in planning and executing digital campaigns across platforms.",
                    "Improved online reach and audience engagement through creative storytelling."
                ]
            }
        ]
    },
    {
        company: "SPOTTERONLINE PVT. LTD | KERALA, INDIA",
        date: "April 2020 – April 2022",
        roles: [
            {
                title: "Digital Marketing & Creative Designer",
                tasks: [
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
                tasks: [
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


const About = () => {
    const sectionRef = useRef(null);
    const [selectedCert, setSelectedCert] = useState(null);

    const handleCertClick = (e, cert) => {
        // Find coordinates of the clicked card to originate the shatter from
        const rect = e.currentTarget.getBoundingClientRect();
        const originX = (rect.left + rect.width / 2) / window.innerWidth;
        const originY = (rect.top + rect.height / 2) / window.innerHeight;

        // Custom fragment/shatter explosion effect using canvas confetti
        confetti({
            particleCount: 150,
            spread: 360,
            startVelocity: 45,
            decay: 0.9,
            gravity: 0.8,
            ticks: 80,
            shape: 'square', // Make them look like fragments 
            origin: { x: originX, y: originY },
            colors: ['#6366f1', '#10b981', '#f43f5e', '#ffffff', '#232338']
        });

        // After small delay (allowing shatter effect to dominate visual), mount the modal
        setTimeout(() => {
            setSelectedCert(cert);
        }, 300);
    };

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

        const elements = document.querySelectorAll('.animate-on-scroll, .animate-slide-right');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <section id="about" className="section about-section" ref={sectionRef}>
            <div className="container">

                <div className="about-hero">
                    <div className="about-hero-image-container animate-slide-right">
                        <img src="/who.jpeg" alt="Muhammed Muflih A" className="who-image" />
                        <h4 className="about-quote">"Design That Moves Minds."</h4>
                    </div>

                    <div className="about-intro-container">
                        <h2 className="animated-gradient-title animate-slide-right">Who I Am</h2>

                        <div className="about-description animate-slide-right">
                            <p>
                                I am a passionate UI/UX Designer and Digital Marketing Professional with over 5 years of experience creating engaging digital experiences. My expertise spans across web design, mobile interfaces, and interactive digital platforms. I specialize in integrating gamification, 3D visuals, and micro-interactions to enhance user engagement and create memorable experiences.
                            </p>
                            <br />
                            <p>
                                Throughout my career, I have collaborated with cross-functional teams to deliver design-led solutions that improve user experience, increase engagement, and drive business results. I believe in the power of design to transform complex problems into intuitive, beautiful solutions.
                            </p>
                        </div>
                    </div>


                </div>

                <div className="timeline-section animate-on-scroll fade-in">
                    <div className="timeline-header">
                        <div className="timeline-header-title">
                            <Briefcase size={28} className="timeline-icon" />
                            <h3 className="animated-gradient-title" style={{ marginBottom: 0 }}>WORK EXPERIENCE</h3>
                        </div>
                    </div>

                    <WorkExperienceStack experiences={workData} />
                </div>

                <div className="certifications-section animate-on-scroll fade-in">
                    <div className="timeline-header">
                        <Award size={28} className="timeline-icon" />
                        <h3 className="animated-gradient-title" style={{ marginLeft: '15px', marginBottom: 0 }}>Certifications</h3>
                    </div>
                    <div className="cert-grid">
                        {certData.map((cert) => (
                            <div
                                key={cert.id}
                                className="cert-card card"
                                onClick={(e) => handleCertClick(e, cert)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="cert-content">
                                    <Award size={32} className="cert-icon" />
                                    <h4>{cert.title}</h4>
                                    {cert.title.length < 40 && <p>Click to view credential & skills</p>}
                                </div>
                                <div className="cert-corner-img">
                                    {cert.imgSrc ? (
                                        <img src={cert.imgSrc} alt="Issuer Logo" onError={(e) => { e.target.style.display = 'none' }} />
                                    ) : (
                                        <Award size={24} style={{ color: 'var(--accent-indigo)', margin: '13px' }} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="timeline-section animate-on-scroll fade-in">
                    <div className="timeline-header">
                        <GraduationCap size={28} className="timeline-icon" />
                        <h3 className="animated-gradient-title" style={{ marginLeft: '15px', marginBottom: 0 }}>Education</h3>
                    </div>
                    <div className="education-scroll-window">
                        <div className="timeline">
                            {educationData.map((edu) => (
                                <Education3DCard key={edu.id} edu={edu} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <CertificationModal
                cert={selectedCert}
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
            />
        </section>
    );
};

export default About;
