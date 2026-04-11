import { promotionalInfo } from "../../assets/data/data"
import { BodyOne, Title } from "../common/CustomComponents"

const Banner = () => {
  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-between pt-20">
        {promotionalInfo.map((info, idx) => (
          <div key={idx} className="box relative w-full">

            {/* image */}
            <div className="w-full h-[70vh]">
              <img
                src={info.image}
                alt="info_img"
                className='w-full h-full object-cover'
              />
            </div>

            {/* content */}
            <div className="absolute top-0 left-0 p-3 md:p-8 lg:w-2/3">
              <span className="bg-white px-6 py-2 text-sm">
                {info.title}
              </span>

              <Title level={2} className='my-3'>
                {info.title}
              </Title>

              <BodyOne>{info.description}</BodyOne>

              <button className="btn btn-secondary">Shop Now</button>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default Banner
