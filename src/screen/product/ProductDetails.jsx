import { useParams } from "react-router";
import { productlists } from "../../assets/data/data";
import { RenderRatingStars } from "../../components/product/ProductCard";
import { BodyOne, Caption, Title } from "../../components/common/CustomComponents";
import { useState } from "react";
import { BiPlus, BiMinus, BiHeart } from 'react-icons/bi'
import { ProductSlideCard } from "../../components/product/ProductSlider";

import Slider from 'react-slick'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const colorsValue = {
    red: "#fe7fef",
    yellow: "#ffff00",
    green: "#008000",
    blue: "#0000ff",
    white: "#f8f8f8",
    brown: "#a52a2a",
    clear: "#ffffff",
    "dark brown": "#654321",
    light: "#f5f5dc",
    black: "#000000",
    natural: "#8b4513",
    "light brown": "#deb887",
    dark: "#696969",
    gray: "#808080",
    beige: "#f5f5dc",
};

const ProductDetails = () => {

    const { productId } = useParams();
    const product = productlists.find(
        (product) => product.id === parseInt(productId)
    );

    if (!product) {
        return <div>Product not Found</div>
    }

    const { id, title, description, images, discount, rating, featured, price, color, specifications } = product;

    const [selectedColor, setSelectedColor] = useState(color[0].value)
    const [selectedPrice, setSelectedPrice] = useState(
        price.find((priceClr) => priceClr.color === color[0].value)
    )

    const [inputQty, setInputQty] = useState(1);

    const handleColorClick = (color) => {
        setSelectedColor(color);

        const newSelectedPrice = price.find((priceClr) => priceClr.color === color);

        setSelectedPrice(newSelectedPrice);
    }

    const CustomPage = ({ index, onClick }) => (
        <div>
            <img src={images[index].image} alt="" onClick={onClick} />
        </div>
    )

    const settings = {
        customPaging: (i) => <CustomPage index={i} />,
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <section className="container mt-32 slideProduct">
                <div className="flex flex-col lg:flex-row justify-between">

                    {/* left - image */}
                    <div className="images lg:w-1/2">
                        <div className="">
                            <Slider {...settings}>
                                {images.map((image, idx) => (
                                    <img
                                        key={idx}
                                        src={image.image}
                                        alt={image.id}
                                        className="w-full h-full object-cover"
                                    />
                                ))}
                            </Slider>
                        </div>
                    </div>

                    {/* right - details */}
                    <div className="borderx details lg:w-1/2 px-16 pt-16">
                        <button className="featured-btn bg-indigo-600">
                            SALE {discount}% OFF
                        </button>

                        <Title level={2} className='my-2'>
                            {title}
                        </Title>

                        <div className="flex items-center gap-2 -mt-5">
                            <div className="flex items-center gap-1">
                                {RenderRatingStars(rating)}
                            </div>

                            <p>{product.rating} Reviews</p>
                        </div>

                        <p className="text-[15px]">{description}</p>

                        <br />

                        {/* colors */}
                        <div className="">
                            <Caption>Colors</Caption>

                            <div className="flex items-center gap-3 mt-5">
                                {color.map((colorOption, idx) => (
                                    <div key={idx}
                                        className={`w-4 h-4 rounded-full -mt-3 cursor-pointer border-gray-300 ${selectedColor === colorOption.value ? 'selected' : ''}`}
                                        style={{ backgroundColor: colorsValue[colorOption.value] }}
                                        onClick={() => handleColorClick(colorOption.value)}
                                    >
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* prices */}
                        <div className="mt-5">
                            <Caption>Prices</Caption>

                            <div className="flex items-center gap-3">
                                <BodyOne className='line-through mt-4'>
                                    ${selectedPrice.value}
                                </BodyOne>

                                <Title level={4} className='text-primary-green'>
                                    ${" "}
                                    {(
                                        selectedPrice.value - (selectedPrice.value * product.discount) / 100
                                    ).toFixed(2)}
                                </Title>
                            </div>
                        </div>

                        <br />

                        {/* quantity */}
                        <div className="flex items-center gap-3">
                            <button className="w-12 h-12 grid place-items-center bg-gray-100 text-primary border border-gray-300">
                                <BiPlus size={20} />
                            </button>

                            <input
                                type="text"
                                className="w-16 h-12 text-primary outline-none border border-gray-300 px-6"
                                value={inputQty}
                                placeholder="1"
                                onChange={(e) => setInputQty(e.target.value)}
                            />

                            <button className="w-12 h-12 grid place-items-center bg-gray-100 text-primary border border-gray-300">
                                <BiMinus size={20} />
                            </button>

                            <button className="btn btn-primary">
                                ADD TO CART
                            </button>
                        </div>

                        <div className="flex items-center gap-3 mt-6">
                            <button className="btn btn-secondary flex items-center gap-2">
                                <BiHeart size={20} />
                                Add to Wishlist
                            </button>

                            <button className="btn btn-secondary flex items-center gap-2">
                                Compare
                            </button>
                        </div>

                        <hr className="my-5 border-gray-400" />

                        {/* labels */}
                        <label htmlFor="">
                            <span className="text-primary font-bold"> SKU: </span> PRT84E63A
                        </label>
                        <br />
                        <label htmlFor="">
                            <span className="text-primary font-bold"> CATEGORY: </span> Baby Products
                        </label>
                    </div>
                </div>

                {/* product footer details */}
                <div className="flex flex-col lg:flex-row justify-between my-10">
                    <div className="lg:w-1/2">
                        <Title level={3}>Fits Your Child</Title>
                        <Caption>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, consequatur consequuntur corporis magnam exercitationem numquam iste laboriosam perspiciatis commodi impedit et placeat possimus earum, at vitae vero esse quam reprehenderit optio dolorem doloremque? Harum quae architecto tenetur, nemo provident ab unde labore voluptatem sint magni?
                        </Caption>

                        <Title level={3} className='mt-5'>
                            Specifications
                        </Title>

                        <div className='flex flex-col gap-3 mt-2'>
                            {specifications.map((specifics, idx) => (
                                <Caption key={idx}>
                                    {specifics.value}
                                </Caption>
                            ))}
                        </div>
                    </div>

                    {/* right footer details */}
                    <div className="lg:w-1/2 grid grid-cols-2 gap-5 lg:px-8 mt-5">
                        <ProductDetailsBox
                            title='All-in-One Car Seat'
                            desc='Lorem ipsum dolor sit amet consectetur adipisicing.'
                        />

                        <ProductDetailsBox
                            title='Space saving design'
                            desc='Lorem ipsum dolor sit amet consectetur adipisicing.'
                        />

                        <ProductDetailsBox
                            title='Easiest to install correctly'
                            desc='Lorem ipsum dolor sit amet consectetur adipisicing.'
                        />

                        <ProductDetailsBox
                            title='No added chemicals'
                            desc='Lorem ipsum dolor sit amet consectetur adipisicing.'
                        />
                    </div>
                </div>

                {/* related products */}
                <div className="my-8">
                    <Title level={3} className='my-5'>
                        Related Products
                    </Title>

                    <ProductSlideCard />
                </div>
            </section>
        </>
    )
}

export default ProductDetails


export const ProductDetailsBox = ({ title, desc }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 text-center bg-gray-100 p-8 lg:p-0">
            <Title level={5} className='capitalize'>{title}</Title>

            <Caption>{desc}</Caption>
        </div>
    )
}