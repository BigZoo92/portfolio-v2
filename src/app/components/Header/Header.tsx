'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import './style.scss';
import HackerText from '../HackerText'; 
const Header = () => {
    const [hoverLink, setHoverLink] = useState<string | null>(null);

    const handleMouseOver = (text: string) => {
        setHoverLink(text);
    };

    const handleMouseOut = () => {
        setHoverLink(null);
    };

    return (
        <header>
            <nav>
                <Link href={'/'} onMouseOver={() => handleMouseOver('Enzo Givernaud')} onMouseOut={handleMouseOut}>
                        {hoverLink === 'Enzo Givernaud' ? <HackerText title='Enzo Givernaud' /> : 'Enzo Givernaud'}
                </Link>
                <ul>
                    <li onMouseOver={() => handleMouseOver('About')} onMouseOut={handleMouseOut}>
                        <Link href={'/about'}>
                            {hoverLink === 'About' ? <HackerText title='About' /> : 'About'}
                        </Link>
                    </li>
                    <li onMouseOver={() => handleMouseOver('Contact')} onMouseOut={handleMouseOut}>
                        {hoverLink === 'Contact' ? <HackerText title='Contact' /> : 'Contact'}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
