import React from "react"
import Image from "next/image"
import './style.scss'

const Home = () => {
    return(
        <section className="project">
            <Image 
                src={'/images/image-2.webp'}
                alt={"Picture" + '/images/image-2.webp'}
                width={800}
                loading={'eager'}
                height={800}
                priority={true}
                className='img_project'
                
            />
        </section>
        
    )
}

export default Home