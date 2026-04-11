import PropTypes from "prop-types"
import { heroList } from "../../assets/data/data"
import { BodyOne, Caption, Title } from "../common/CustomComponents"
import { useState } from "react"
import Slider from 'react-slick'
 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { product1_hero, product2, product2_hero, product3, product3_hero } from "../../assets/images"

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className='absolute bottom-0 left-96 lg:left-1/2 slider-btn'
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
            className='absolute bottom-0 left-96 lg:left-[45%] bg-white text-primary slider-btn z-10'
            onClick={onClick}
        >
            <button className="next">
                <MdKeyboardArrowLeft size={50} />
            </button>
        </div>
    );
}

export const Hero = () => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <>
            <section className="h-[50vh] lg:h-[90vh] mt-20 bg-white-100 relative z-1">
                <Slider {...settings}>
                    {/* {heroList.slice(0, 1).map((item, idx) => { */}
                    {heroList.map((item) => {
                        return (
                            <HeroItem
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                price={item.price}
                                color={item.color}
                            />
                        )
                    })}
                </Slider>
            </section>

            <Banner />
        </>
    )
}


export const HeroItem = ({ title, description, image, price, color }) => {

    const [selectedColor, setSelectedColor] = useState(color[0].value);

    const [selectedPrice, setSelectedPrice] = useState(
        price.find((pri) => pri.color === color[0].value)
    )

    const handleColorClick = (color) => {
        setSelectedColor(color);

        const newSelectedPrice = price.find((pri) => pri.color === color);

        setSelectedPrice(newSelectedPrice);
    }

    return (
        <div className='content flex justify-between lg:px-16 h-[50vh] lg:h-[90vh] relative z-20'>
            <div className="left w-1/2 py-8 lg:p-16x lg:py-16">
                <Title
                    level={1}
                    className='leading-none font-medium md:text-3xl lg:text-[70px] lg:leading-snug'
                >
                    {title}
                </Title>

                <BodyOne>{description}</BodyOne>

                <div className="flex items-start gap-8 my-5">
                    <div>
                        <Caption>Prices</Caption>

                        <div className="mt-3">
                            <Title level={5}>${selectedPrice.value.toFixed(2)}</Title>
                        </div>
                    </div>

                    <div>
                        <Caption>Colors</Caption>

                        <div className="flex items-center justify-center gap-3 mt-5">
                            {color.map((clr, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleColorClick(clr.value)}
                                    className={`w-4 h-4 rounded-full cursor-pointer border-gray-300 ${selectedColor === clr.value ? 'selected' : ''}
                                    `}
                                    style={{ backgroundColor: clr.value }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <button className="btn btn-primary uppercase">View details</button>

                    <button className="btn btn-secondary uppercase">View shop</button>
                </div>
            </div>

            {/* right hero */}
            <div className="right bg-white p-5 w-1/2 h-full flex justify-center items-center relative z-50">
                <img src={image} alt="hero-img" className='h-[60vh] w-full object-contain' />
            </div>
            <div className={`lg:bg-black lg:h-[90vh] lg:absolute lg:top-0 lg:right-0 lg:w-1/3 lg:-z-10`}></div>
        </div>
    )
}


const Banner = () => {
    return (
        <div className="py-20 container flex flex-col lg:flex-row items-center gap-5">
            <div>
                <BannerCard
                    title='Wooden Water Bottles'
                    desc='UP TO 60% OFF'
                    cover={product1_hero}
                />
            </div>

            <div className="flex justify-between flex-col gap-8">
                <BannerCard
                    title='Wooden Brown Bowl'
                    desc='UP TO 40% OFF'
                    cover={product2_hero}
                    className={true}
                />
                <BannerCard
                    title='Wooden Deep Cup'
                    desc='UP TO 30% OFF'
                    cover={product3_hero}
                    className={true}
                    classSecond={true}
                />
            </div>
        </div>
    )
}

const BannerCard = ({ title, desc, cover, className, classSecond }) => {
    return (
        <>
            <div className="w-full h-full relative overflow-hidden">
                <img src={cover} alt="cover" />

                <div
                    className={`absolute bottom-0 p-8 w-full ${className ? '' : 'flex'} ${className && classSecond ? 'left-0 lg:left-[220px] top-0 w-[150px] borderx' : ''}
                    `}
                >
                    <div>
                        <Title level={2}>{title}</Title>
                        <p className="text-lg font-normal leading-none">{desc}</p>
                    </div>
                    <div className="w-1/2 mt-5">
                        <button className="btn btn-secondary flex justify-end">
                            shop now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


HeroItem.propTypes = {
    title: PropTypes.isRequired,
    description: PropTypes.isRequired,
    price: PropTypes.isRequired,
    color: PropTypes.isRequired,
    image: PropTypes.isRequired,
};