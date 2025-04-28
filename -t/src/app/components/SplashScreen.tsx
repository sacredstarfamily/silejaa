'use client';
import { useEffect, useRef, useState } from 'react';
import { createTimeline, createTimer, animate, utils } from 'animejs';

export default function SplashScreen() {
    const [isMounted, setIsMounted] = useState(false);
    const tRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        const timeline = createTimeline({
            duration: 1000,
            loop: true,
        });
        const timer2 = createTimer({
            duration: 1000,
            onUpdate: (t) => {
                if (tRef.current) {
                    tRef.current.style.opacity = (0 + t.progress).toString();
                    tRef.current.style.transform = `translateY(${t.progress * 100}px)`;
                }
            },
            onComplete: () => {
                setIsMounted(true);
            },
        });
        timeline.add({
            duration: 1000,
            onUpdate: timer2.onUpdate,
            
        });
    }, []);

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center bg-white">
                <img
                    ref={tRef}
                    src="/sileejaa.svg"
                    alt="Sileejaa"
                    className={`transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
            <div className={`absolute top-0 left-0 w-full h-full bg-white transition-opacity duration-1000 ${isMounted ? 'opacity-0' : 'opacity-100'}`}></div>
        </>
    );
}