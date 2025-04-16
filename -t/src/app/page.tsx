'use client';

import {useEffect, useRef, useState} from 'react';
import { createTimeline, createTimer, animate, svg, utils } from 'animejs';


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const tRef = useRef<HTMLImageElement>(null);
 
useEffect(() => {
  const [ $path1, $path2 ] = utils.$('polygon');
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
  
  // A function to generate random points on #path-2 on each iteration
  // For demo purpose only
  function generatePoints() {
    const total = utils.random(4, 64);
    const r1 = utils.random(4, 56);
    const r2 = 56;
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
  duration: 1000,
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
}, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div>
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
        </div>
      {isMounted && (
        <div className="flex flex-col mt-25 items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-center">
            Sileejaa
          </h1>
          <p className="text-lg text-center">
            A simple and fast way to create a website
          </p>
        </div>
      )}
      <svg viewBox="0 0 304 112">
  <g strokeWidth="2" stroke="currentColor" strokeLinejoin="round" fill="none" fillRule="evenodd">
    <polygon id="path-1" points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"></polygon>
    <polygon style={{ opacity: 0 }} id="path-2" points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"></polygon>
  </g>
</svg>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      
      </footer>
    </div>
  );
}
