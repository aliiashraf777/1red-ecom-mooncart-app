import { footerLinks } from "../../assets/data/data"
import { logo } from "../../assets/images"
import { BodyOne, Caption, CustomLink, Title } from "./CustomComponents"
 

const Footer = () => {
  return (
    <footer className="py-14">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="">
          <img src={logo} alt="" className='h-7' />

          <div className="flex flex-col gap-2 mt-5">
            <Caption>Address: 451 Wall Street, UK, London</Caption>
            <Caption>Email: example@domain.com</Caption>
            <Caption>Call: 555-555-1234</Caption>
          </div>

          <br />

          <BodyOne>Subscribe to Our Newsletter</BodyOne>
          <input
            type="text"
            className="p-3 w-full border bg-white-100 border-gray-300 rounded-md outline-none"
            placeholder="Enter your email address"
          />
        </div>

        {/* links 1 */}
        <div>
          <Title level={5}>Our Stores</Title>

          <div className='flex flex-col gap-3'>
            {footerLinks.map((link) => (
              <CustomLink key={link.id}
                className='hover:text-primary-green'
              >
                {link.value}
              </CustomLink>
            ))}
          </div>
        </div>

        {/* links 2 */}
        <div>
          <Title level={5}>Useful Links</Title>

          <div className='flex flex-col gap-3'>
            {footerLinks.map((link) => (
              <CustomLink key={link.id}
                className='hover:text-primary-green'
              >
                {link.value}
              </CustomLink>
            ))}
          </div>
        </div>

        {/* links 3 */}
        <div>
          <Title level={5}>Our Blogs</Title>

          <div className='flex flex-col gap-3'>
            {footerLinks.map((link) => (
              <CustomLink
                key={link.id}
                className='hover:text-primary-green'
              >
                {link.value}
              </CustomLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
