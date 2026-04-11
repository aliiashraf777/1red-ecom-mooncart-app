import { IoCart, IoClose } from "react-icons/io5"
import { IoMdHeart } from "react-icons/io"
import { NavLink, useLocation, useParams } from "react-router"
import { BodyOne, Title } from "../common/CustomComponents"
import { FaFacebook, FaRegStar, FaStar, FaStarHalfAlt, FaTwitter } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai';
import { useState } from "react"
import { useDispatch } from "react-redux"
import { cartReducerActions } from "../../redux/slice/cartSlice"
import { favoriteReducerActions } from "../../redux/slice/favouriteSlice"

export const RenderRatingStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStars = rating % 1 !== 0;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
        if (i <= fullStars) {
            stars.push(<FaStar key={i} color='#ff8a00' />)
        } else if (hasHalfStars && i === fullStars + 1) {
            stars.push(<FaStarHalfAlt key='half-star' color='#ff8a00' />)
        } else {
            stars.push(<FaRegStar key={i} color='#ff8a00' />)
        }
    }

    return stars;
};

const ProductCard = ({ id, title, description, images, discount, rating, featured, price, color, basePath = '' }) => {

    const [isProductModalOpen, setIsProductModalOpen] = useState(false)

    const openModal = () => {
        setIsProductModalOpen(true);
    }

    const closeModal = () => {
        setIsProductModalOpen(false);
    }

    const dispatch = useDispatch();

    const discountPrice = price[0].value - (price[0].value - discount) / 100;

    const addToCart = () => {
        dispatch(cartReducerActions.addToCart({
            id, title, price: discountPrice, images
        }))
    }

    const handleAddToFavorites = () => {
        dispatch(favoriteReducerActions.addToFavorites({
            id,
            title,
            images,
            price: discountPrice,
        }))
    }

    // product dynamic link based on product location in app
    // const location = useLocation();
    // const { productId } = useParams();

    const isHomePage = location.pathname === '/';
    // const isHomePage = location.pathname.startsWith('/');
    const isDetailPage = location.pathname.startsWith('/product-details/');
    const isShopPage = location.pathname === '/shop';
    const isShopDetailPage = location.pathname.startsWith('/shop/product-details/');

    // if (isHomePage) {
    //     alert(isHomePage);
    // } else if (isShopPage) {
    //     alert(isShopPage);
    // } else if (isDetailPage) {
    //     alert(isDetailPage);
    // } else if (isShopDetailPage) {
    //     alert(isShopDetailPage)
    // }

    const productLink = isShopPage || isShopDetailPage
        ? `/shop/product-details/${id}`
        : `/product-details/${id}`;

    const ProductDynamicLink = `${basePath}/product-details/${id}`;

    return (
        <>
            <div className="product card">
                <div className="images h-96">
                    {images.map((cover, idx) => (
                        <img
                            key={idx}
                            src={cover?.image}
                            alt={cover.id}
                            className='w-full h-full object-cover'
                        />
                    ))}

                    {/* discount & featured */}
                    <div className="flex justify-between w-full p-5 absolute top-0 left-0">
                        {discount &&
                            <button className='discount-btn'>
                                {discount}%
                            </button>
                        }
                        {featured && (
                            <button className="featured-btn">
                                {featured === true && 'Featured'}
                            </button>
                        )}
                    </div>

                    {/* quick view btn */}
                    <div
                        className="product-btns flex justify-center items-center gap-2 absolute bottom-0 left-0 right-0 m-5"
                    >
                        <button
                            className="quick-view-btn product-btn btn btn-primary"
                            onClick={openModal}
                        >
                            Quick View
                        </button>

                        <button
                            className="add-to-cart-btn product-btn btn btn-primary"
                            onClick={addToCart}
                        >
                            <IoCart size={23} />
                        </button>

                        <button
                            className="love-btn product-btn btn btn-primary"
                            onClick={handleAddToFavorites}
                        >
                            <IoMdHeart size={23} />
                        </button>
                    </div>
                </div>

                {/* details */}
                <div className="details flex flex-col items-center bg-white pt-4">

                    <NavLink to={ProductDynamicLink} >
                        <BodyOne>{title}</BodyOne>
                    </NavLink>

                    <div className="flex items-center gap-2 -mt-2 mb-2">
                        {RenderRatingStars(rating)}
                    </div>

                    <div>
                        {price.slice(0, 1).map((priceItem, idx) => (
                            <div
                                className="flex items-center gap-3" key={idx}
                            >
                                <BodyOne
                                    className='line-through'
                                >
                                    ${priceItem.value}
                                </BodyOne>

                                <BodyOne className='text-primary-green'>
                                    ${(priceItem.value - (priceItem.value * discount) / 100).toFixed(2)}
                                </BodyOne>
                            </div>
                        ))}
                    </div>
                </div>
            </div >

            {/* product modal */}
            {isProductModalOpen && (
                <>
                    <div className="modal-overlay-bg" onClick={closeModal}>
                        <div className="modal-overlay" onClick={closeModal}>
                            {/* content-wrap */}
                            <div className="modal-content flex justify-between h-full" onClick={(e) => e.stopPropagation()}>
                                {/* left image */}
                                <div className="w-1/2 h-full overflow-hidden">
                                    {images.slice(0, 1).map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img?.image}
                                            alt={id}
                                            className='modal-image w-full h-full object-cover'
                                        />
                                    ))}
                                </div>

                                {/* right modal details */}
                                <div className="modal-details w-1/2 h-full overflow-y-auto p-8">
                                    <button className="featured-btn bg-indigo-500">
                                        SALE {discount}% OFF
                                    </button>

                                    <Title level={2}>{title}</Title>

                                    <div className="flex items-center gap-1 -mt-2">
                                        {RenderRatingStars(rating)}
                                    </div>

                                    {price.slice(0, 1).map((priceItem, idx) => (
                                        <div key={idx} className='flex items-center gap-3'>
                                            <BodyOne className='line-throught mt-4'>
                                                ${priceItem.value}
                                            </BodyOne>

                                            <Title level={3} className='text-primary-green'>
                                                ${(priceItem.value - (priceItem.value * discount) / 100).toFixed(2)}
                                            </Title>
                                        </div>
                                    ))}

                                    <BodyOne className='text-sm leading-6'>{description}</BodyOne>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            value={1}
                                            className="w-12 h-12 text-primary outline-none border-2 border-primary px-4"
                                        />
                                        <button className="btn btn-primary">
                                            add to cart
                                        </button>
                                    </div>

                                    <hr className="my-5" />

                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <Title level={5} className='text-lg'>
                                                Category: <span className="font-normal">
                                                    Wooden Product
                                                </span>
                                            </Title>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Title level={5} className='text-lg'>
                                                Tag: <span className="font-normal">
                                                    Wooden
                                                </span>
                                            </Title>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Title level={5} className='text-lg'>
                                                Share:
                                            </Title>

                                            <div className="flex items-center -mt-1 gap-3">
                                                <FaFacebook />
                                                <AiFillInstagram />
                                                <FaTwitter />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="close-btn absolute top-0 right-0 w-12 h-12 flex justify-center items-center bg-primary-green text-white"
                                        onClick={closeModal}
                                    >
                                        <IoClose />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default ProductCard
