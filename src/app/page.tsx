import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Gallery from "./components/Gallery";
import Overlay from "./components/Overlay";
import './title.scss'
import { Postertoastermono } from "./layout";

export default function Home() {
  const images = [
    '/images/image-1.webp',
    '/images/image-2.webp',
    '/images/image-1.webp',
    '/images/image-2.webp',
    '/images/image-1.webp',
    '/images/image-2.webp',
  ];
  return (
    <>
      <Gallery images={images}/>
      <h1 className={`title`}>
          <div className="word">
            <div>w</div><div>e</div><div>b</div>
          </div>
          <div className="word">
            <div>d</div><div>e</div><div>v</div><div>e</div><div>l</div><div>o</div><div>p</div><div>e</div><div>r</div>
          </div>
        </h1>
      <Overlay></Overlay>
    </>
  );      
}
