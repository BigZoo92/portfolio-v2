import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Gallery from "./components/Gallery";

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
    <section className='gallery'>
      <Gallery images={images}/>
    </section>
  );      
}
