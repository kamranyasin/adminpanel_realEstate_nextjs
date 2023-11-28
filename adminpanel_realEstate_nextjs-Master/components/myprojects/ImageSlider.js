import React from "react";
import Slider from "react-slick";
import Img from "../utils/Img";

const ImageSlider = ({ images }) => {

    const propertySlider = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <Slider className="property-slider" {...propertySlider}>
        {images.media &&
            images.media.map((data, i) => (
            <div key={i}>
                <Img src={data.imageUrl} className="bg-img" />
            </div>
            ))}
        </Slider>
    );
};

export default ImageSlider;
