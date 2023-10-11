import React, { useEffect, useState } from "react";
import image1 from "../../assets/igor-miske-bsMFZ1957Zg-unsplash.jpg";
import image2 from "../../assets/sam-mcnamara-p0ZvBVpW3KY-unsplash.jpg";
import image3 from "../../assets/signup-side-image.jpg";
import image4 from "../../assets/simon-maage-tXiMrX3Gc-g-unsplash.jpg";
import "./Carousel.css";

const Carousel = () => {
  const imageList = [image1, image2, image3, image4];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    let time = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % imageList.length);
    }, 4000);

    return () => clearInterval(time);
  }, [imageList.length]);

  return (
    <img
      src={imageList[currentImage]}
      alt="signup"
      className="carousel-image"
    />
  );
};

export default Carousel;
