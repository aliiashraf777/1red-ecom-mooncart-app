import Slider from "react-slick"
import { BodyOne, Title } from "../common/CustomComponents"
import { productlists } from "../../assets/data/data"
import ProductCard from "./ProductCard"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className='absolute top-[32%] -right-5 lg:right-5 rounded-full z-10 slider-btn'
            onClick={onClick}
        >
            <button className="next">
                <MdKeyboardArrowRight size={50} />
            </button>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            className='absolute top-[32%] left-5 lg:left-5 rounded-full slider-btn z-10'
            onClick={onClick}
        >
            <button className="next">
                <MdKeyboardArrowLeft size={50} />
            </button>
        </div>
    );
}

const ProductSlider = () => {
    return (
        <section className="py-20 bg-white relative slideProduct">
            <div className="container overflow-hidden relative">
                <Title level={4}>What is trending now</Title>

                <div className="flex items-center gap-3 uppercase">
                    <BodyOne className='text-sm'>
                        DISCOVER THE MOST TRENDING PRODUTS IN MOONCART.
                    </BodyOne>
                </div>
            </div>

            <ProductSlideCard />
        </section>
    )
}

export default ProductSlider


export const ProductSlideCard = () => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        // autoplay: true,
        // speed: 7000,
        // autoplaySpeed: 7000,
        // cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                },
            },
        ]
    };

    return (
        <Slider {...settings}>
            {productlists.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    images={product.images}
                    discount={product.discount}
                    rating={product.rating}
                    featured={product.featured}
                    price={product.price}
                    color={product.color}
                />
            ))}
        </Slider>
    )
}