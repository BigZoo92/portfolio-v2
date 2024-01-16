'use client'

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './style.scss'; 
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger);

const Gallery = ({images} : {images: string[]}) => {
    const extraLongContainerRef = useRef<HTMLDivElement>(null);
    const [isExtended, setIsExtended] = useState<number | null>(null);  
    
    const imageClick = (index: number) => {
        setIsExtended(index === isExtended ? null : index)
    }

    useEffect(() => {    
        const extraLongContainer = extraLongContainerRef.current;
        let scrollTween = gsap.to(extraLongContainer, {
            xPercent: -100,
            x: () => window.innerWidth,
            ease: "none",
            scrollTrigger: {
                trigger: extraLongContainer,
                start: "top top",
                end: () => `+=${extraLongContainer?.offsetWidth}px`,
                scrub: 3,
                pin: true,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });

        gsap.utils.toArray('.square1').forEach((square: any) => {
            gsap.to(square, {
                scrollTrigger: {
                    trigger: square,
                    start: "center 100%",
                    end: "center 00%",  
                    scrub: 2,
                    containerAnimation: scrollTween,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const height = progress < 0.5 ? (1 + progress) * 50 : (1 + (1 - progress)) * 50;
                        gsap.set(square, { height: `${height}%` });
                    }
                }
            });
        });

        gsap.utils.toArray('.img_project').forEach((img: any) => {
            gsap.to(img, {
                scrollTrigger: {
                    trigger: img,
                    start: "center 100%",
                    end: "center 00%",  
                    containerAnimation: scrollTween,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = progress === 0.5 ? progress * 2 * 0.4 + 1 : (1 - progress) * 2 * 0.4 + 1;
                        gsap.set(img, { scale: scale });
                    }
                }
            });
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [images]);

    const galleryWidth = useMemo(() => `calc(100vw + ${((100 * images.length) + (25 * images.length)) - 25}px)`, [images.length]);
    const galleryLeft = useMemo(() => `calc(100vw - ${((100 * images.length) + (25 * images.length)) - 25}px)`, [images.length]);

    return (
            <div className='scroll_galery' ref={extraLongContainerRef} style={{width: galleryWidth}}>
                <div className='cd_gallery'  style={{left: galleryLeft}}>
                    {images.map((image: string, index: number) => (
                        <div className={"cd_image square1"} key={index} onClick={() => imageClick(index)} style={{width: isExtended === index ? "300px" : "100px"}}>    
                            <Image 
                                src={image}
                                alt={"Picture" + image}
                                width={800}
                                loading={index === 0 ? 'eager' : 'lazy'}
                                height={800}
                                priority={index === 0}
                                className='img_project'
                                
                            />
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default Gallery;