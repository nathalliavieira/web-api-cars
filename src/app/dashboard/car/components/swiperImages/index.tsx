"use client"

import Image from "next/image";
import { ImageProps } from "@/lib/image.type";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props{
    images: ImageProps[];
}

export default function SwiperImage({images}: Props){
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
                {images.map((image) => (
                    <SwiperSlide key={image.id}>
                        <div style={{ position: 'relative', width: '100%', height: '384px' }}>
                            <Image 
                                src={image.url} 
                                alt="Car Image" 
                                fill
                                sizes="100vw"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        
    );
}