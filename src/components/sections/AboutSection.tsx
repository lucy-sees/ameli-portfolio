import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AboutSection = () => {
    const aboutRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ paused: true });

        tl.from(aboutRef.current, { duration: 1, opacity: 0, y: 50 });

        tl.play();
    }, []);

    return (
        <div ref={aboutRef} className="about-section">
            <h2>About Me</h2>
            <p>This is the about section of my portfolio.</p>
        </div>
    );
};

export default AboutSection;
