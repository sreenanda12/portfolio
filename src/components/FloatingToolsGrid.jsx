import React from 'react';
import './FloatingToolsGrid.css';

const toolsInfo = [
    {
        name: 'Figma',
        color: '#F24E1E',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 5.5A3.5 3.5 0 0 0 12.5 2h-4A3.5 3.5 0 0 0 5 5.5v7h3.5a3.5 3.5 0 0 0 3.5-3.5H8.5V5.5h4zm0 7A3.5 3.5 0 0 0 12.5 9h-4A3.5 3.5 0 0 0 5 12.5v0A3.5 3.5 0 0 0 8.5 16H12a3.5 3.5 0 0 0 3.5-3.5c0-.98-.4-1.86-1-2.5a3.5 3.5 0 0 0 1.5-1zm-7.5 3.5v3.5a3.5 3.5 0 0 0 7 0 3.5 3.5 0 0 0-7 0z" />
            </svg>
        )
    },
    {
        name: 'Meta',
        color: '#1877F2',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11.6 12A4.4 4.4 0 1 0 16 7.6 4.4 4.4 0 0 0 11.6 12zM21 12H16M3 12h5.6" />
                <path d="M12 12c-1.3-1.6-3.2-2.5-5.2-2.5C4 9.5 2 11.2 2 13.5c0 2.2 2 4 4.8 4 2.1 0 4-1 5.2-2.5 1.3 1.6 3.2 2.5 5.2 2.5 2.8 0 4.8-1.8 4.8-4 0-2.3-2-4-4.8-4-2.1 0-4 1-5.2 2.5z" fill="currentColor" stroke="none" />
            </svg>
        )
    },
    {
        name: 'Photoshop',
        color: '#31A8FF',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2" />
                <text x="12" y="15" fill="currentColor" stroke="none" fontSize="10" fontWeight="bold" textAnchor="middle">Ps</text>
            </svg>
        )
    },
    {
        name: 'Illustrator',
        color: '#FF9A00',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2" />
                <text x="12" y="15" fill="currentColor" stroke="none" fontSize="10" fontWeight="bold" textAnchor="middle">Ai</text>
            </svg>
        )
    },
    {
        name: 'WordPress',
        color: '#21759B',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-.9 16.3c-1.7-1.3-2.9-3.2-3.1-5.3L12 21c-3.1-1.6-5.8-4.2-6.5-7h.6l4 10.3zm4.5.3L12.5 10H11L8.5 18.6c1.1.2 2.3.2 3.4 0l1.8-6h.4l3.5 6zm2.3-1c-.2-1.9-1.2-3.6-2.8-4.7l2.5-6.5c1.6 2.3 2.1 5.2 1.2 7.8-.3 1.2-.7 2.3-1.3 3.4zM12 3.5c4 0 7.3 2.8 8.2 6.5h-2.1l-2.4 6L13.2 8h-2L8.5 14l-1.9-4.8H5.2c1.2-3.4 4.5-5.7 8.5-5.7z" />
            </svg>
        )
    },
    {
        name: 'HTML5',
        color: '#E34F26',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h20l-1.8 17.5L12 22l-8.2-2.5L2 2zm15 6H8.5l-.2-2H17l.2-2H6l.8 8h8.6l-.4 3.5-3 1-3.2-1-.2-1.5H6.5l.3 3.5 5 1.5 5.2-1.5L17 8z" />
            </svg>
        )
    },
    {
        name: 'Premiere Pro',
        color: '#9999FF',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2" />
                <text x="12" y="15" fill="currentColor" stroke="none" fontSize="10" fontWeight="bold" textAnchor="middle">Pr</text>
            </svg>
        )
    },
    {
        name: 'After Effects',
        color: '#9999FF',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2" />
                <text x="12" y="15" fill="currentColor" stroke="none" fontSize="10" fontWeight="bold" textAnchor="middle">Ae</text>
            </svg>
        )
    }
];

const FloatingToolsGrid = () => {
    return (
        <div className="floating-tools-super">
            <div className="floating-tools-container">
                <div className="floating-tools-grid">
                    {toolsInfo.map((tool, index) => {
                        const isTopRow = index < 4;
                        const colIndex = index % 4;
                        const isLeftCol = colIndex < 2;

                        const rotateX = isTopRow ? 15 : -5;
                        const rotateY = isLeftCol ? -10 : 10;
                        const translateZBase = 25 + index * 5;

                        // staggered duration 3.2s to 4.25s
                        const duration = `${3.2 + (index * 0.15)}s`;
                        const delay = `${index * 0.3}s`;

                        return (
                            <div
                                key={tool.name}
                                className="tool-wrapper"
                                style={{
                                    '--rx': `${rotateX}deg`,
                                    '--ry': `${rotateY}deg`
                                }}
                            >
                                <div
                                    className="tool-animator"
                                    style={{
                                        '--tz': `${translateZBase}px`,
                                        '--dur': duration,
                                        '--del': delay
                                    }}
                                >
                                    <div className="tool-shadow" style={{ '--brand': tool.color }}></div>
                                    <div
                                        className="tool-card"
                                        style={{
                                            '--brand': tool.color,
                                            '--brand-glow': tool.color + '80'
                                        }}
                                    >
                                        <div className="tool-icon-wrapper">
                                            {tool.icon}
                                        </div>
                                        <span className="tool-tooltip">{tool.name}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FloatingToolsGrid;
