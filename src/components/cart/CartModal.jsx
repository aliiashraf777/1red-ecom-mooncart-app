import { IoCartOutline, IoCloseOutline, IoHeartOutline } from "react-icons/io5"
import { Badges, BodyOne, Title } from "../common/CustomComponents"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { cartReducerActions, selectCartItems, selectTotalPrice, selectTotalQty } from "../../redux/slice/cartSlice";
import { NavLink } from "react-router";
import { favoriteReducerActions, selectFavoriteItems, selectFavoriteState, selectTotalFavorites } from "../../redux/slice/favouriteSlice";

 
const CartModal = () => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCartClose, setIsCartClose] = useState(false);
    const [activeTab, setActiveTab] = useState('cart');

    const totalQuantity = useSelector(selectTotalQty);
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);

    const selectFavItems = useSelector(selectFavoriteItems);
    const totalFavorites = useSelector(selectTotalFavorites);

    const dispatch = useDispatch()

    const openCart = () => {
        setIsCartOpen(true);
        document.body.style.overflowX = 'hidden';
    };

    const closeCart = () => {
        setIsCartClose(true);
        document.body.style.overflowX = 'auto';

        setTimeout(() => {
            setIsCartOpen(false);
            setIsCartClose(false);
        }, 300);
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    const handleCartModalClearAll = () => {
        dispatch(cartReducerActions.clearCart());
        alert('Empty Cart...!');
    }

    const handleClearAllFavorites = () => {
        dispatch(favoriteReducerActions.clearAllFavorites())
        alert('Empty All Favorites...!');
    }

    return (
        <>
            {/* heart Icon */}
            <button className="relative z-20 cursor-pointer" onClick={openCart}>
                <IoHeartOutline size={23} />

                <div className="absolute -top-2 -right-1.5">
                    <Badges bgColor='bg-primary-green'>
                        {totalFavorites}
                    </Badges>
                </div>
            </button>

            {/* cart icon */}
            <button className="relative z-20 cursor-pointer" onClick={openCart}>
                <IoCartOutline size={23} />

                <div className="absolute -top-2 -right-1.5">
                    <Badges bgColor='bg-primary-green'>
                        {totalQuantity}
                    </Badges>
                </div>
            </button>

            {isCartOpen && (
                <>
                    <div className="cartOverlay" onClick={closeCart}></div>

                    {/* cart wrap */}
                    <div className={`cartModal py-10 px-6 text-primary ${isCartClose ? 'cartClose' : ''} overflow-y-auto `}>

                        {/* btns wrap */}
                        <div className="flex justify-between gap-5">
                            <button
                                onClick={() => handleTabChange('cart')}
                                className={`cursor-pointer flex items-center gap-2 font-medium ${activeTab === 'cart' ? 'text-primary' : 'text-gray-400'}`}
                            >
                                Shopping Cart
                                <span className="w-7 h-7 text-[12px] font-normal rounded-full text-white bg-primary grid place-content-center">
                                    {totalQuantity}
                                </span>
                            </button>

                            {/* wishtlist tab btn */}
                            <button
                                onClick={() => handleTabChange('wishlist')}
                                className={`cursor-pointer flex items-center gap-2 font-medium ${activeTab === 'wishlist' ? 'text-primary' : 'text-gray-400'}`}
                            >
                                Wishlist
                                <span className="w-7 h-7 text-[12px] font-normal rounded-full text-white bg-primary grid place-content-center">
                                    {totalFavorites}
                                </span>
                            </button>
                        </div>

                        <div className="line-container">
                            <div className={`line ${activeTab === 'cart' ? 'active' : ''}`}></div>

                            <div className={`line ${activeTab === 'wishlist' ? 'active' : ''}`}></div>
                        </div>

                        {activeTab === 'cart'
                            ? (<>

                                {cartItems.length > 0 ? (
                                    ''
                                ) : (
                                    <div className='mt-54 text-5xl text-gray-200 font-bold capitalize text-center '>
                                        Empty Cart
                                    </div>
                                )}

                                {cartItems.map((item) => (
                                    <CartProduct
                                        key={item.id}
                                        id={item.id}
                                        cover={item.cover}
                                        title={item.title}
                                        price={item.price}
                                        quantity={item.quantity}
                                    />
                                ))}

                                {cartItems.length > 0 ? (<>
                                    <div className="total flex items-center justify-between mt-10">
                                        <Title level={6}>
                                            SubTotal:
                                        </Title>
                                        <Title level={6}>
                                            ${totalPrice.toFixed(2)}
                                        </Title>
                                    </div>

                                    <div className="checkout">
                                        <NavLink to='/cart'>
                                            <button className="btn btn-primary capitalize w-full mt-5">
                                                veiw cart
                                            </button>
                                        </NavLink>

                                        <button className="btn btn-secondary capitalize w-full mt-4" onClick={handleCartModalClearAll}>
                                            Clear All
                                        </button>
                                    </div>
                                </>)
                                    :
                                    (
                                        ''
                                    )}
                            </>)

                            // favorite items container
                            : (<>
                                {/* favorite items */}

                                {selectFavItems.length > 0 ? (
                                    ''
                                ) : (
                                    <div className='mt-54 text-5xl text-gray-200 font-bold capitalize text-center '>
                                        Empty Wishlist
                                    </div>
                                )}

                                {selectFavItems.map((fav, idx) => (
                                    <FavoriteProductCard
                                        key={fav.id}
                                        id={fav.id}
                                        cover={fav.cover}
                                        title={fav.title}
                                        price={fav.price}
                                        quantity={fav.quantity}
                                    />
                                ))}

                                {selectFavItems.length > 0 ? (<>
                                    <NavLink to='/favorite'>
                                        <button className="btn btn-primary w-full mt-8">
                                            Check Your Favorites
                                        </button>
                                    </NavLink>

                                    <button className="btn btn-secondary capitalize w-full mt-4" onClick={handleClearAllFavorites}>
                                        Clear All
                                    </button>
                                </>) : (
                                    ''
                                )}


                            </>)
                        }
                    </div>
                </>
            )}
        </>
    )
}

export default CartModal


export const CartProduct = ({ id, cover, title, price, quantity }) => {
    const dispatch = useDispatch();

    const removeCartItems = () => {
        dispatch(cartReducerActions.removeCompleteFromCart(id));
    }
 
    const handleCartToFavorites = () => {
        dispatch(favoriteReducerActions.addToFavorites({
            id, images: cover, title, price
        }))
    }

    return (
        <>
            <div className="my-5 border-b-2 border-gray-200 pb-5">
                <div className="flex items-center gap-5">
                    <div className="images w-20 h-20">
                        {cover?.slice(0, 1).map((img, i) => (
                            <img
                                key={i}
                                src={img?.image}
                                alt=""
                                className='w-full h-full object-cover'
                            />
                        ))}
                    </div>

                    <div className="details w-1/2">
                        <BodyOne className=''>
                            {title}
                        </BodyOne>

                        <p className="text-primary-green">
                            {quantity} x ${price?.toFixed(2)}
                        </p>
                    </div>

                    <button className="w-10 h-10 bg-gray-200 text-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 hover:text-white transition duration-300"
                        onClick={handleCartToFavorites}
                    >
                        <IoHeartOutline size={23} />
                    </button>

                    <button className="w-10 h-10 bg-gray-200 text-primary flex items-center justify-center rounded-full cursor-pointer">
                        <IoCloseOutline
                            size={25}
                            onClick={removeCartItems}
                        />
                    </button>
                </div>
            </div>
        </>
    )
}


export const FavoriteProductCard = ({ id, cover, title, price, quantity }) => {
    const dispatch = useDispatch();

    const removeCartItems = () => {
        dispatch(favoriteReducerActions.removeFromFavorites(id));
    }

    const handleFavAddToCartClick = () => {
        dispatch(cartReducerActions.addToCart({
            id, images: cover, title, price, quantity
        }))
        console.log('adding fav to carrt', newItem);
    }

    return (
        <>
            <div className="mt-5 border-b-2 border-gray-200 pb-5">
                <div className="flex items-center gap-5">
                    <div className="images w-20 h-20">
                        {cover?.slice(0, 1).map((img, i) => (
                            <img
                                key={i}
                                src={img.image}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        ))}
                    </div>

                    <div className="details w-1/2">
                        <BodyOne>{title}</BodyOne>

                        <p className="text-primary-green">
                            {quantity} x ${price?.toFixed(2)}
                        </p>
                    </div>

                    <button className="w-10 h-10 bg-gray-200 text-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 hover:text-white transition duration-300"
                        onClick={handleFavAddToCartClick}
                    >
                        <IoCartOutline size={23} />
                    </button>

                    <button className="w-10 h-10 bg-gray-200 text-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 hover:text-white transition duration-300"
                        onClick={removeCartItems}
                    >
                        <IoCloseOutline size={25} />
                    </button>
                </div>
            </div>
        </>
    )
}