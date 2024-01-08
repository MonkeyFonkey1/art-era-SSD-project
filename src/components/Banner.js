import React, { useState } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  
  const data = [
    "https://png.pngtree.com/background/20230605/original/pngtree-person-sitting-under-an-art-gallery-in-a-museum-with-pictures-picture-image_2875476.jpg",
    "https://c4.wallpaperflare.com/wallpaper/351/979/802/wall-gallery-pictures-cubism-wallpaper-preview.jpg",
     "https://i0.wp.com/www.whatsupwyoming.com/wp-content/uploads/2021/01/ArtExhibitionBanner.png",
    "https://edit.org/img/blog/ri5-exhibition-art-templates-editor-online-editable-free-poster.jpg",
    "https://cdn.filestackcontent.com/compress/output=format:jpg/cache=expiry:max/resize=width:1600/cwgaekChTmuNMpQewmbC",  
    "https://catchspaces.sfo2.digitaloceanspaces.com/nepalbuzz/2017/08/20507724_478980642488468_58594404783744925_o-940x470.jpg",
    "https://png.pngtree.com/template/20210728/ourlarge/pngtree-colorful-geometric-3d-art-exhibition-banner-image_553504.jpg",

  ];
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 3 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 3 ? 0 : (prev) => prev + 1);
  };
  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="h-[650px] w-screen relative">
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className="w-[400vw] h-full flex transition-transform duration-1000"
        >
          <img
            className="w-screen h-full object-cover"
            src={data[0]}
            alt="ImageOne"
            loading="priority"
          />
          <img
            className="w-screen h-full object-cover"
            src={data[1]}
            alt="ImageTwo"
          />
          <img
            className="w-screen h-full object-cover"
            src={data[2]}
            alt="ImageThree"
          />
          <img
            className="w-screen h-full object-cover"
            src={data[3]}
            alt="ImageFour"
          />
        </div>
        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-52">
          <div
            onClick={prevSlide}
            className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowLeft />
          </div>
          <div
            onClick={nextSlide}
            className="w-14 h-12 border-[1px] border-gray-700 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
