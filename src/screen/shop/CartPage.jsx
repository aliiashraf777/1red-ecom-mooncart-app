import { useDispatch, useSelector } from 'react-redux'
import { cartReducerActions, selectCartItems, selectCartTotalBilling, selectTotalPrice, selectTotalQty } from '../../redux/slice/cartSlice'
import { frame } from '../../assets/images';
import { BodyOne, Title } from '../../components/common/CustomComponents';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';

const CartPage = () => {

  const dispatch = useDispatch();
  const totalQuantity = useSelector(selectTotalQty);
  const cartStateItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  const { subTotal, deliveryFee, taxes, total } = useSelector(selectCartTotalBilling)

  return (
    <>
      <section className="mt-16 mb-16">
        <div className="h-[50vh]">
          <div className="images absolute top-0 left-0 w-full h-1/2">
            <img
              src={frame}
              alt=""
              className='w-full h-full object-cover'
            />
          </div>

          <div className="text absolute top-[140px] left-[45%]">
            <Title level={1}>Cart</Title>
          </div>
        </div>

        {/* table wrap container */}
        <div className="container flex flex-col lg:flex-row justify-between">
          {/* left side */}
          <div className="w-2/3">
            <div className="relative overflow-x-auto sm:rounded-lg">
              {/* table */}
              <table className="w-full text-sm text-left rtl:text-lg">
                {/* table head */}
                <thead className="text-xs text-primary uppercase bg-gray-50">
                  <tr>
                    <th scope='col' className="px-10 py-5">
                      Thumbnail
                    </th>
                    <th scope='col' className="px-6 py-5">
                      Product
                    </th>
                    <th scope='col' className="px-6 py-5">
                      Price
                    </th>
                    <th scope='col' className="px-6 py-5">
                      Quantity
                    </th>
                    <th scope='col' className="px-6 py-5">
                      Subtotal
                    </th>
                    <th scope='col' className="px-6 py-3"></th>
                  </tr>
                </thead>

                {/* tbody */}
                <tbody>
                  {cartStateItems.map((item) => (
                    <CartPageCard
                      key={item.id}
                      id={item?.id}
                      // images={item?.images}
                      images={item?.cover}
                      title={item?.title}
                      price={item?.price}
                      quantity={item?.quantity}
                      totalPrice={item?.totalPrice}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* right side */}
          <div className="w-1/3 w-2/6x ml-16">
            <div className="bg-gray-100 p-5">
              <p className="text-base font-medium text-primary">
                Cart Totals
              </p>
              <hr className="border-none my-2 h-[2px] bg-gray-200" />

              <div className="text-sm font-medium text-primary flex justify-between items-center gap-5">
                <p className="w-32">Subtotal</p>
                <p className="text-sm font-normal">
                  {/* ${totalPrice.toFixed(2)} */}
                  ${subTotal.toFixed(2)}
                </p>
              </div>
              <hr className="border-none my-2 h-[2px] bg-gray-200" />

              <div className="text-sm font-medium text-primary flex justify-between items-center gap-5">
                <p className="w-32">Shipping</p>
                <p className="text-sm font-normal">
                  Enter your address for shipping.
                </p>
              </div>
              <hr className="border-none my-2 h-[2px] bg-gray-200" />

              <div className="text-sm font-medium text-primary flex justify-between items-center gap-5">
                <p className="w-32">Delivery Fee</p>
                <p className="text-sm font-normal">
                  ${deliveryFee}
                </p>
              </div>
              <hr className="border-none my-2 h-[2px] bg-gray-200" />

              <div className="text-sm font-medium text-primary flex justify-between items-center gap-5">
                <p className="w-32">Taxes</p>
                <p className="text-sm font-normal">
                  ${taxes.toFixed(2)}
                </p>
              </div>
              <hr className="border-none my-2 h-[2px] bg-gray-200" />

              <div className="text-sm font-medium text-primary flex justify-between items-center gap-5">
                <p className="w-32">Total</p>
                <p className="text-sm font-normal">
                  {/* ${totalPrice.toFixed(2)} */}
                  ${total.toFixed(2)}
                </p>
              </div>
              <hr className="border-none my-2 h-[2px] bg-gray-200" />

              <button className="btn btn-primary w-full mt-5">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CartPage


export const CartPageCard = ({ id, images, title, price, quantity, totalPrice }) => {

  const dispatch = useDispatch();

  const incCartItems = () => {
    dispatch(cartReducerActions.addToCart({ id, title, images, price, quantity, totalPrice }))
  }

  const removeCartItem = () => {
    dispatch(cartReducerActions.removeFromCart(id));
  }

  const removeCompleteFromCart = () => {
    dispatch(cartReducerActions.removeCompleteFromCart(id))
  }

  return (
    <>
      <tr className="bg-white border-b-hover:bg-gray-50">
        <td className="p-4">
          {images?.slice(0, 1).map((img, i) => (
            <img
              key={i}
              src={img.image}
              alt=""
              className="2-24 h-24 object-cover"
            />
          ))}
        </td>

        <td className="px-6 py-4">
          <BodyOne>{title}</BodyOne>
        </td>

        <td className="px-6 py-4">
          <BodyOne>${price.toFixed(2)}</BodyOne>
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              className="w-12 h-12 grid place-content-center bg-gray-100 text-primary border border-gray-300"
              onClick={incCartItems}
            >
              <BiPlus size={20} />
            </button>

            <input
              type="text"
              name=""
              id=""
              readOnly
              value={quantity}
              className="w-16 h-12 text-primary outline-none border border-gray-300 px-6"
            />

            <button
              className="w-12 h-12 grid place-content-center bg-gray-100 text-primary border border-gray-300"
              onClick={removeCartItem}
            >
              <BiMinus size={20} />
            </button>
          </div>
        </td>

        <td className="px-6 py-4">
          <BodyOne>${totalPrice.toFixed(2)}</BodyOne>
        </td>

        <td className="px-6 py-4">
          <button
            className="w-12 h-12 grid place-content-center bg-gray-100 text-primary border border-gray-300"
            onClick={removeCompleteFromCart}
          >
            <IoCloseOutline size={25} />
          </button>
        </td>
      </tr>
    </>
  )
}