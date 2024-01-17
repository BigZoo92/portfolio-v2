'use client'

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './style.scss'; 
import Image from 'next/image'
import HackerText from '../HackerText';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const Gallery = ({images} : {images: string[]}) => {
    const extraLongContainerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isExtended, setIsExtended] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null)
    const [isChanged, setIsChanged] = useState(false);  
    const router = useRouter()
    
    const imageClick = (index: number) => {
        if (index === isExtended){
            setIsChanged(true)
        }else{
            setName("Project" + index)
            setIsExtended(index)
        }
    }

    useEffect(() => {
        if(!isChanged && !isExtended) return
        const extendedImage = extraLongContainerRef?.current?.children[0].children[isExtended || 0]
        if(!extendedImage) return
        gsap.set(`#image${isExtended}`, {
            transition: '',
            filter:'brightness(1)'
        });
        gsap.set(`#cd_image${isExtended}`, {
            transition: 'height cubic-bezier(0.15, 0.01, 0.15, 0.99) .15s',
            zIndex: 1000,
        });
        gsap.to(`#cd_image${isExtended}`, {
            duration: 0.75,
            x: (extendedImage.getBoundingClientRect().left * -1) + 25,
            width: 'calc(100dvw - 50px)',
            height: 'calc(50dvh - 50px)',
            onStart: () => {
                gsap.to(`.cd_image`, {
                    opacity: 0,
                });
                gsap.to(`h1`, {
                    opacity: 0,
                });
                gsap.to(`.name_project`, {
                    opacity: 0,
                });
                gsap.to(`#cd_image${isExtended}`, {
                    opacity: 1,
                });
            },
            onComplete: () => {
                gsap.to(`#cd_image${isExtended}`, {
                    duration: 0.5,
                    y:  (extendedImage.getBoundingClientRect().top * -1) + 100,
                });
            }
        });
        gsap.to(`#image${isExtended}`, {
            duration: 1.25,
            ease: 'ease',
            scale: 1,
            filter: 'brightness(1)',
        });
        setTimeout(() => {
            router.push('/project')
        }, 2000);
        
    }, [isChanged])

    useEffect(() => {    
        if(isChanged) return
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
                anticipatePin: 1,
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
                        const height = progress < 0.5 ? (1 + progress) * 75 : (1 + (1 - progress)) * 75;
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
    }, [images, isChanged]);

    const [startX, setStartX] = useState<number>(0);
    const [initialTranslateX, setInitialTranslateX] = useState<number>(0);
    
    const getTranslateX = (element: HTMLDivElement | null) => {
        if(!element) return 0
        const match = element.style.transform.match(/translateX\((-?\d+(\.\d+)?)px\)/);
        if (match) {
            return parseFloat(match[1]);
        }
        return 1;
    };


    const isMobile = () => {
        // Une vérification basique de l'agent utilisateur pour les appareils mobiles
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.matchMedia('(pointer: coarse)').matches;
    };

    const handleTouchStart = (e: any) => {
        if (!galleryRef.current) return;
        const touch = e.touches[0];
        setStartX(touch.clientX);
        setInitialTranslateX(getTranslateX(galleryRef.current));
    };

    const handleTouchMove = (e: any) => {
        if (!galleryRef.current) return;
        const touch = e.touches[0];
        const currentX = touch.clientX;
        const moveX = currentX - startX + initialTranslateX;
        galleryRef.current.style.transform = `translateX(${moveX}px)`;
    };


    useEffect(() => {
        if (isMobile()) {
            if(!galleryRef.current || !containerRef.current) return
            containerRef.current.style.overflow ='hidden'
            galleryRef.current.addEventListener('touchstart', handleTouchStart);
            galleryRef.current.addEventListener('touchmove', handleTouchMove);

            return () => {
                if(!galleryRef.current) return
                galleryRef.current.removeEventListener('touchstart', handleTouchStart);
                galleryRef.current.removeEventListener('touchmove', handleTouchMove);
            };
        }
    }, [galleryRef, containerRef, startX, initialTranslateX]);


    const galleryWidth = useMemo(() => `calc(100vw + ${((100 * images.length) + (25 * images.length)) - 25}px)`, [images.length]);

    return (
        <section className='gallery' ref={containerRef}>
            <div className='scroll_galery' ref={extraLongContainerRef} style={{width: galleryWidth}}>
                <div className='cd_gallery' ref={galleryRef}>
                    {images.map((image: string, index: number) => (
                        <div className={"cd_image square1"} key={index} id={'cd_image' + index} onClick={() => imageClick(index)} style={{width: isExtended === index ? "300px" : "100px"}}>    
                            <Image 
                                src={image}
                                alt={"Picture" + image}
                                width={800}
                                loading={index === 0 ? 'eager' : 'lazy'}
                                height={800}
                                priority={index === 0}
                                className='img_project'
                                id={'image' + index}
                                
                            />
                        </div>
                    ))}
                </div>
            </div>
            { typeof isExtended ===  'number' &&( <div onClick={() => setIsChanged(true)} className='name_project'><HackerText title={name || ''}/><span> <span className='red'>|</span> </span>Open Project</div>)}
        </section>
    );
};

export default Gallery;