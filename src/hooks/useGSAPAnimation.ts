import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useGSAPAnimation = (ref, animation) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
            }
        });

        // Add animation actions here
        animation(tl);

        return () => {
            tl.kill();
        };
    }, [ref, animation]);
};

export default useGSAPAnimation;