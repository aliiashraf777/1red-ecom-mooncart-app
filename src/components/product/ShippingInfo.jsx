import { FaShippingFast } from "react-icons/fa"
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md"
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { BiChat } from "react-icons/bi";
import { BodyOne, Title } from "../common/CustomComponents";

const additionalInfo = [
    {
        id: 1,
        title: 'FREE SHIPPING',
        description: 'Enjoy Free Shipping On All Orders - No Minimum Purchase Required.',
        icon: <FaShippingFast size={50} />
    },
    { 
        id: 2,
        title: '24/7 SUPPORT',
        description: 'Our Team Is Available 24/7 To Help With Any Question Or Concerns.',
        icon: <MdOutlineMarkUnreadChatAlt size={50} />
    },
    {
        id: 3,
        title: 'FREE SHIPPING',
        description: 'Enjoy Free Shipping On All Orders - No Minimum Purchase Required.',
        icon: <FaCircleDollarToSlot size={50} />
    }
]

const ShippingInfo = () => {
    return (
        <>
            <section className="container">

                {/* additional info section */}
                <div className="py-32X py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {additionalInfo.map((info, idx) => (
                        <div key={idx} className="flex-col flex items-center justify-center  text-center gap-3">
                            <div className="text-primary-green">
                                {info.icon}
                            </div>

                            <h2 className="text-xl font-bold mt-4">{info.title}</h2>

                            <p className="mt-2">
                                {info.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* newsletter section */}
                <div className="box bg-primary p-8 flex flex-col lg:flex-row items-center justify-between">

                    {/* left */}
                    <div className="left flex items-center gap-3">
                        <BiChat size={100} color='white' />

                        <div>
                            <Title level={3} className='text-white leading-none'>
                                SUBSCRIBE TO OUR NEWSLETTER
                            </Title>

                            <BodyOne className='text-gray-300'>
                                Get Latest News, Offers And Discounts.
                            </BodyOne>
                        </div>
                    </div>

                    {/* right */}
                    <div className="left w-full p-5 px-8 lg:w-1/2">
                        <input
                            type="text"
                            className="outline-none w-full p-3 bg-white"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShippingInfo
