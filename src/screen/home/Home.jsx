import { Caption, Title } from "../../components/common/CustomComponents"
import { ProductSlideCard } from "../../components/product/ProductSlider"
import { Banner, Hero, InstagramPost, Product, ProductSlider, ShippingInfo, Testimonials } from "../../router"


export const Home = () => {
  return (
    <div>
      <Hero />

      <Product />

      <ShippingInfo />

      <Banner />

      <ProductSlider />

      <Testimonials />

      {/* recent products section */}
      <div className="container my-16 slideProduct">
        <Title level={3}>Recent Products</Title>
        <Caption>DISCOVER THE MOST TRENDING PRODUCTS IN MOONCART.</Caption>
        <br />
        <ProductSlideCard />
      </div>

      {/* <InstagramPost /> */}
    </div>
  )
}
