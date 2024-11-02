import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';

export const Carrossel = () => {
  const images = [
    '/corintias.png',
    '/sao_paulo.png',
    '/internacional.png',
    '/flamengo.png',
    '/atletico.png',
    '/fluminense.png',
    '/bahia.png'
  ];

  const carouselResponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 2000, min: 1200 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1200, min: 800 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="container mx-auto my-8">
      <Carousel
        responsive={carouselResponsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        arrows={false}
      >
        {images.map((src, index) => (
          <div key={index} className="m-10 bg-gray-200 rounded-xl shadow-md p-2 transition-transform transform hover:scale-105 min-h-[90px] items-center justify-center flex ">
            <Image
              src={src}
              alt={`Imagem ${index + 1}`}
              width={50}
              height={50}
              className="  "
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
