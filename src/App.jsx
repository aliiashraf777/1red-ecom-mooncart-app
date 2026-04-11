import { Routes, Route } from 'react-router'
import { CartPage, Home, Layout, Product, ProductDetails, Shop } from "./router"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
        </Route>

        <Route path='/shop' element={<Layout />} >
          <Route index element={<Shop />} />

          <Route
            path='product-details/:productId'
            element={<ProductDetails />}
          />
        </Route>

        <Route
          path='/product-details/:productId'
          element={<Layout />}
        >
          <Route index element={<ProductDetails />} />
        </Route>

        <Route
          path='/cart'
          element={<Layout />}
        >
          <Route index element={<CartPage />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
