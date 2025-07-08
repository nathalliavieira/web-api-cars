"use client"

import Image from "next/image";
import { ImageProps } from "@/lib/image.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

interface Props{
    images: ImageProps[];
}

export default function SwiperImage({images}: Props){

    const [index, setIndex] = useState<number>(-1);

    return(
        <div style={{ margin: '16px', borderRadius: '8px', overflow: 'hidden' }}>
            <Swiper
            pagination={{ clickable: true }}
            navigation
            modules={[Navigation, Pagination]}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                800: {
                    slidesPerView: 2,
                },
            }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={image.id}>
                        <div 
                            style={{ position: 'relative', width: '100%', height: '384px' }}
                            onClick={() => setIndex(index)}
                        >
                            <Image 
                                src={image.url} 
                                alt="Car Image" 
                                fill
                                sizes="100vw"
                                style={{ objectFit: 'cover', cursor: "pointer" }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Lightbox 
                open={index >= 0}
                close={() => setIndex(-1)}
                index={index}
                slides={images.map((img) => ({src: img.url}))}
            />
        </div>
        
    );
}