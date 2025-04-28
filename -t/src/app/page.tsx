'use client';

import {useEffect, useRef, useState} from 'react';
import { createTimeline, createTimer, animate, svg, utils } from 'animejs';
import SplashScreen from './components/SplashScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const tRef = useRef<HTMLImageElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  const [ $path1, $path2 ] = utils.$('polygon');
  const $circle = utils.$('circle');
  

  function animateRandomPoints() {
    // Update the points attribute on #path-2
    utils.set($path2, { points: generatePoints() });
    // Morph the points of #path-1 into #path-2
    animate($path1, {
      points: svg.morphTo($path2),
      ease: 'inOutCirc',
      duration: 500,
      onComplete: animateRandomPoints
    });
   
  }
 
  // Start the animation
  animateRandomPoints();

  function generatePoints() {
    const total = utils.random(4, 74);
    const r1 = utils.random(3, 56);
    const r2 = 16;
    const isOdd = (n: number) => n % 2;
    let points = '';
    for (let i = 0, l = isOdd(total) ? total + 1 : total; i < l; i++) {
      const r = isOdd(i) ? r1 : r2;
      const a = (2 * Math.PI * i / l) - Math.PI / 2;
      const x = 152 + utils.round(r * Math.cos(a), 0);
      const y = 56 + utils.round(r * Math.sin(a), 0);
      points += `${x},${y} `;
    }
    return points;
  }
const timeline = createTimeline({
  autoplay: false,
  duration: 5000,
});
const timerTagline = createTimer({
  duration: 2000,
  delay: 1000,
  onUpdate: (t) => {
    if (taglineRef.current) {
      console.log(t.progress);
     if (taglineRef.current.textContent) {
      var tagline = `A simple and fast way to create a website`;
      var flyin = 
      taglineRef.current.textContent = tagline[Math.floor(tagline.length * t.progress)] + taglineRef.current.textContent;
      taglineRef.current.style.transform = `translateX(${t.progress * 100}px)`;
     }
    

      taglineRef.current.style.opacity = (0 + t.progress).toString();
      
    }
  },
  onComplete: () => {
    if (taglineRef.current) {
      taglineRef.current.textContent = 'A simple and fast way to create a website';
      taglineRef.current.style.opacity = '1';
    }
    
    setIsMounted(true);
  },
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
  duration: 2000,
  onUpdate: timer2.onUpdate,
});
timeline.add({
  duration: 3000,
  onUpdate: timerTagline.onUpdate,
});
}, []);
  return (
    <>
    <div className='absolute top-0 z-[-1] left-0 w-full h-full flex justify-center bg-black'>
    <svg viewBox="0 0 304 112">
        <g strokeWidth="0.5" stroke="currentColor" strokeLinejoin="miter" opacity='0.5' fill="none" fillRule="evenodd">
          <polygon id="path-1" points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"></polygon>
          <circle style={{ opacity: 0 }} cx="152" cy="56" r="26"></circle>
          <polygon style={{ opacity: 1 }} id="path-2" points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"></polygon>
        </g>
      </svg>
    </div>
    <div className='z-10 flex flex-col items-center justify-center'>
      
        <img
          id='logo'
          ref={tRef}
          src="/sileejaa.svg"
          alt="Next.js logo"
          width={280}
          height={58}
          className="animate-fade-in"
          suppressHydrationWarning={true}
        />

      {isMounted && (
        <div ref={taglineRef} className="tagline flex flex-col mx-[-100] mt-10 items-center justify-center gap-4">
          <p className="text-lg text-center">
            A simple and fast way to create a website
          </p>
        </div>
      )}
   

    
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>

    </>
  );
}
