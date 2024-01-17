'use client'

import React, { useState, useEffect } from 'react';
import './style.scss'

const HackerText: React.FC<{ title: string }> = ({ title }) => {
    const [displayedTitle, setDisplayedTitle] = useState("_".repeat(title.length));
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    useEffect(() => {
      let iteration = 0;
      const intervalId = setInterval(() => {
        if (iteration >= title.length * 2) {
          clearInterval(intervalId);
          setDisplayedTitle(title); 
          return;
        }
        setDisplayedTitle("_".repeat(title.length))
        setDisplayedTitle((prev) =>
          title
            .split("")
            .map((char, index) => {
              if (index < iteration / 2) return char;
              if (index === Math.floor(iteration / 2)) return letters[Math.floor(Math.random() * letters.length)];
              return prev[index];
            })
            .join("")
        );
  
        iteration++;
      }, 50);
  
      return () => clearInterval(intervalId);
    }, [title]);
  
    return <h1>{displayedTitle}</h1>;
};

export default HackerText;
