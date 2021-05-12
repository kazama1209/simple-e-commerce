import React, { useState } from "react"
import { Elements, StripeProvider } from "react-stripe-elements"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { products } from "./data/products"
import Product from "./components/product/Product"
import Cart from "./components/cart/Cart"
import CheckoutForm from "./components/checkout/CheckoutForm"

import Header from "./components/layouts/Header"

import { CartItem as CartItemType } from "./interfaces/index"

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "3rem"
  }
}))

const App: React.FC = () => {
  const classes = useStyles()

  const [cartItems, setCartItems] = useState<CartItemType[]>([])

  const handleAddToCart = (id: number) => {
    setCartItems((cartItems: CartItemType[]) => {
      const cartItem = cartItems.find((item) => item.id === id)

      // すでに同じ商品が入っている場合は数量を追加
      if (cartItem) {
        return cartItems.map((item) => {
          if (item.id !== id) return item
          return { ...cartItem, quantity: item.quantity + 1 }
        })
      }

      // そうでない場合は新たに追加
      const item = products.find(item => item.id === id)
      return [...cartItems, { ...item, quantity: 1 }]
    })

    console.log(process.env.REACT_APP_STRIPE_SECRET_KEY)
  }

  const totalCost = cartItems.reduce(
    (acc: number, item: CartItemType) => acc + (item.price || 0) * item.quantity,
    0
  )

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="lg">
          <Grid container spacing={4} justify="center" className={classes.container}>
            {products.map(product => (
              <Grid item key={product.id}>
                <Product
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  handleAddToCart={() => handleAddToCart(product.id)}
                />
              </Grid>
            ))}
          </Grid>
          <Cart
            cartItems={cartItems}
            totalCost={totalCost}
            setCartItems={setCartItems}
          />
          { cartItems.length > 0 && (
            <StripeProvider apiKey="pk_test_51IpukVDCJ1EogeD3j6yaJ4aguH7xLeeI2hWtSHw0tn17QYZNNeQdLCfW0cXrUi70up8BOlAVUzuKHHrSc1khngsC00oWa6JXwt">
              <Elements>
                <CheckoutForm totalCost={totalCost} />
              </Elements>
            </StripeProvider>
          )}
        </Container>
      </main>
    </>
  )
}

export default App
