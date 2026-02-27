import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './WorkExperienceStack.css';

const WorkExperienceStack = ({ experiences }) => {
    // Scroll handling for active card
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);
    const [expandedExp, setExpandedExp] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const cards = containerRef.current.querySelectorAll('.we-card-wrapper');
            let closestIndex = 0;
            let minDiff = Infinity;

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const centerNode = rect.top + rect.height / 2;
                const centerViewport = window.innerHeight / 2;
                const diff = Math.abs(centerNode - centerViewport);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestIndex = index;
                }
            });
            setActiveIndex(closestIndex);
        };

        window.addEventListener('scroll', handleScroll);
        // initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const processTasks = (tasks) => tasks.map((task, idx) => {
        if (task.startsWith("Key Contribution:")) {
            return <li key={idx}><strong>Key Contribution:</strong> {task.replace("Key Contribution:", "").trim()}</li>
        }
        return <li key={idx}>{task}</li>;
    });

    return (
        <div className="we-stack-container" ref={containerRef}>
            {experiences.map((exp, idx) => {
                const isActive = idx === activeIndex;
                const isBlurBg = !isActive && !expandedExp;

                return (
                    <div
                        key={idx}
                        className={`we-card-wrapper ${isActive ? 'we-active' : ''} ${isBlurBg ? 'we-blur' : ''}`}
                        onClick={() => setExpandedExp(exp)}
                        style={{ '--idx': idx }}
                    >
                        <div className="we-card-inner card">
                            <h4 className="we-company">{exp.company}</h4>
                            <p className="we-date">{exp.date}</p>

                            <div className="we-preview">
                                {exp.roles.map((role, rIdx) => (
                                    <div key={rIdx} className="we-role-preview">
                                        <h5>{role.title}</h5>
                                    </div>
                                ))}
                            </div>
                            <span className="we-click-text">Click to view details</span>
                        </div>
                    </div>
                )
            })}

            {/* EXPANDED MODAL */}
            {expandedExp && (
                <div className="we-modal-overlay fadeInOverlay" onClick={() => setExpandedExp(null)}>
                    <div className="we-modal-content fragmentReveal" onClick={e => e.stopPropagation()}>
                        <button className="we-modal-close" onClick={() => setExpandedExp(null)}>
                            <X size={24} />
                        </button>
                        <h3 className="we-modal-company">{expandedExp.company}</h3>
                        <p className="we-modal-date">{expandedExp.date}</p>

                        <div className="we-modal-roles">
                            {expandedExp.roles.map((role, rIdx) => (
                                <div key={rIdx} className="we-modal-role">
                                    <h4 className="we-role-title">{role.title}</h4>
                                    <ul className="we-role-tasks">
                                        {processTasks(role.tasks)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default WorkExperienceStack;
