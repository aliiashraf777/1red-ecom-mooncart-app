import { girl, pic1_2, pic2_2, pic5, pic6 } from "../../assets/images"
import { BodyOne, Title } from "../common/CustomComponents"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div
            className='absolute bottom-0 right-0 bg-white text-primary rounded-full z-10 slider-btn'
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
            className='absolute bottom-0 right-20 bg-white text-primary rounded-full z-10 slider-btn'
            onClick={onClick}
        >
            <button className="next">
                <MdKeyboardArrowLeft size={50} />
            </button>
        </div>
    );
}


const Testimonials = () => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
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
        <section className="testimonials mt-20">
            <div className="container h-full flex items-center justify-center">

                {/* left */}
                <div className="w-1/2 flex relative z-50">

                    {/* img */}
                    <div className="box w-96 h-96 bg-white rounded-full z-50">
                        <img
                            src={girl}
                            alt="girl_img"
                            className='absolute -top-[130px] left-0 z-10 rounded-b-full'
                        />
                    </div>

                    {/* blur card on girl */}
                    <div className="bg px-5 p-3 rounded-lg backdrop-blur-sm border border-gray-300 absolute top-36 right-60 z-50">
                        <BodyOne className='leading-none'>Our Satisfied User</BodyOne>

                        <div className="flex items-center">
                            <img src={pic1_2} alt="pic1_2"
                                className='w-14 h-14 object-cover rounded-full border-2 border-gray-100'
                            />
                            <img src={pic2_2} alt="pic2_2"
                                className='-ml-4 w-14 h-14 object-cover rounded-full border-2 border-gray-100'
                            />

                            <span className='-ml-4 w-14 h-14 object-cover rounded-full border-2 border-gray-100 bg-slate-50 flex justify-center items-center'>
                                +12k
                            </span>
                        </div>
                    </div>

                </div>


                {/* right */}
                <div className="left w-1/2 relative z-50">
                    <Title level={2}>
                        What our clients say about us
                    </Title>

                    <BodyOne className='mb-8'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, cum ullam! Ullam labore esse, sint cupiditate aperiam illo totam maxime tempora fuga suscipit! Quae recusandae aliquam deserunt dolorem veritatis molestias?
                    </BodyOne>

                    <Slider {...settings}>
                        <TestimonialsCard
                            name='Kenneth Fong'
                            post='Undergraduate Student'
                            cover={pic5}
                        />

                        <TestimonialsCard
                            name='Lora Smith'
                            post='Postgraduate Student'
                            cover={pic6}
                        />
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export const TestimonialsCard = ({ name, post, cover }) => {
    return (
        <div className="flex items-center gap-8">
            <div className="w-20 h-20">
                <img
                    src={cover}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                />
            </div>

            {/* right details */}
            <div className="details">
                <Title level={5} className='font-medium leading-none'>
                    {name}
                </Title>

                <p>{post}</p>
            </div>
        </div>
    )
}

export default Testimonials
