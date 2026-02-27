import React, { useEffect, useRef } from 'react';
import './CursorSparkles.css';

const CursorSparkles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        let cachedColors = ['#6366F1', '#10B981', '#1A1A2E', '#8B5CF6'];

        const updateThemeColors = () => {
            const styles = getComputedStyle(document.documentElement);
            const textP = styles.getPropertyValue('--text-primary').trim() || '#1A1A2E';
            const indigo = styles.getPropertyValue('--accent-indigo').trim() || '#6366F1';
            const emerald = styles.getPropertyValue('--accent-emerald').trim() || '#10B981';
            // Mix of the Name text colors (textPrimary + indigo) and a little emerald/purple for magic
            cachedColors = [textP, indigo, textP, '#8B5CF6'];
        };
        updateThemeColors();

        // Update periodically in case theme toggles
        const colorInterval = setInterval(updateThemeColors, 1000);

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2.5 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1.5; // Slight upward bias

                // Uses cached theme colors
                this.color = cachedColors[Math.floor(Math.random() * cachedColors.length)];

                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.02; // How fast it fades
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.speedY += 0.05; // gravity pulls sparks down slightly over time
                this.life -= this.decay;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.life;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const handleMouseMove = (e) => {
            // Spawn a few particles on every mouse move
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(e.clientX, e.clientY));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            particles = particles.filter(p => p.life > 0);

            // reset alpha just in case
            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(colorInterval);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="cursor-sparkles" />;
};

export default CursorSparkles;
