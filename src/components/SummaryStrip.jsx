import React from 'react';
import { Briefcase, Code, Award, GraduationCap } from 'lucide-react';
import './SummaryStrip.css';

const SummaryStrip = () => {
    const stats = [
        { icon: <Briefcase size={20} />, label: "5+ Years Exp.", detail: "UI/UX & Marketing" },
        { icon: <Code size={20} />, label: "15+ Tools", detail: "Figma, Adobe Suite" },
        { icon: <Award size={20} />, label: "4 Certifications", detail: "Unity, Graphic Design" },
        { icon: <GraduationCap size={20} />, label: "M.Com Graduate", detail: "Commerce & E-Com" },
    ];

    return (
        <div className="summary-strip">
            <div className="container strip-container">
                {stats.map((stat, index) => (
                    <div key={index} className="strip-item">
                        <div className="strip-icon">{stat.icon}</div>
                        <div className="strip-info">
                            <span className="strip-label">{stat.label}</span>
                            <span className="strip-detail">{stat.detail}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SummaryStrip;
