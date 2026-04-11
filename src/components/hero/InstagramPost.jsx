import { IoIosColorFilter } from "react-icons/io"
import { IoBagRemoveOutline } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { instagramPosts } from "../../assets/data/data";
import { Caption, Title } from "../common/CustomComponents";


const filterDiscoverItems = [
  {
    id: 1,
    title: "Filter & Discover",
    icon: <IoIosColorFilter size={70} />,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: 2,
    title: "Add To Cart",
    icon: <IoBagRemoveOutline size={70} />,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: 3,
    title: "Fast Shipping",
    icon: <MdOutlineLocalShipping size={70} />,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting",
  },
  {
    id: 4,
    title: "Enjoy The Product",
    icon: <FiBox size={70} />,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting",
  },
];



const InstagramPost = () => {
  return (
    <>
      <section className="post grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
        {instagramPosts.map((post) => (
          <div
            key={post.id}
            className="h-72 lg:h-80 overflow-hidden"
          >
            <img src={post.image} alt=""
              className='w-full h-full object-cover transition-transform ease-in-out hover:-rotate-12 hover:scale-125'
            />
          </div>
        ))}
      </section>

      <BottomFourStep />
    </>
  )
}

export default InstagramPost 

export const BottomFourStep = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white-100 overflow-hidden">
      {filterDiscoverItems.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-8 p-8 py-12 relative group"
        >
          {/* icon */}
          <div className="icon group-hover:scale-90 transition duration-300">
            <i>{item.icon}</i>
          </div>

          {/* right - details */}
          <div>
            <Title>{item.title}</Title>
            <Caption>{item.description}</Caption>
            <Title
              level={1}
              className='absolute -bottom-5 right-0 opacity-10 group-hover:scale-110 transition duration-300'
            >
              0{item.id}
            </Title>
          </div>
        </div>
      ))}
    </section>
  )
}