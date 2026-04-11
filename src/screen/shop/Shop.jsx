import { productlists } from '../../assets/data/data'
import { Title } from '../../components/common/CustomComponents'
import { ProductCard } from '../../router'

const Shop = () => {
    return (
        <section className="container mt-36">
            <Title level={3}>Our Shop Page</Title>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 my-10">

                {productlists.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        images={product.images}
                        discount={product.discount}
                        rating={product.rating}
                        featured={product.featured}
                        price={product.price}
                        color={product.color}
                        basePath='/shop'
                    />
                ))}
            </div>
        </section>
    )
}

export default Shop
