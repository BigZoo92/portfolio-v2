'use client'

import { useRef, useEffect } from "react";
import gsap from 'gsap';
import './style.scss'

const Cursor = () => {
    const cursorRef = useRef(null);
  
    useEffect(() => {
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2
        });
      };
  
      window.addEventListener('mousemove', moveCursor);
  
      return () => {
        window.removeEventListener('mousemove', moveCursor);
      };
    }, []);
  
    return <div className="custom-cursor" ref={cursorRef}></div>;
  };
  
  export default Cursor