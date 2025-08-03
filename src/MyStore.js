import { useState } from "react"
import './Mystore.css'

// Sample product data
const products = [
  { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://picsum.photos/seed/picsum/200/300" },
  { id: 2, name: "Smart Watch", price: 199.99, image: "https://picsum.photos/id/160/200/300" },
  { id: 3, name: "Laptop Stand", price: 49.99, image: "https://picsum.photos/id/48/200/300" },
  { id: 4, name: "USB-C Cable", price: 19.99, image: "https://picsum.photos/id/96/200/300" },
  { id: 5, name: "Bluetooth Speaker", price: 79.99, image: "https://picsum.photos/id/175/200/300" },
  { id: 6, name: "Phone Case", price: 24.99, image: "https://picsum.photos/id/9/200/300" },
  { id: 7, name: "Wireless Mouse", price: 39.99, image: "https://picsum.photos/id/180/200/300" },
  { id: 8, name: "Keyboard", price: 89.99, image: "https://picsum.photos/id/7/200/300" },
  { id: 9, name: "Monitor", price: 299.99, image: "https://picsum.photos/id/60/200/300" },
  { id: 10, name: "Webcam", price: 69.99, image: "https://picsum.photos/id/3/200/300" },
  { id: 11, name: "Power Bank", price: 34.99, image: "https://picsum.photos/id/4/200/300" },
  { id: 12, name: "Tablet", price: 399.99, image: "https://picsum.photos/id/39/200/300" },
]

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage, cartCount }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>TechStore</h2>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <button
              className={`nav-link ${currentPage === "home" ? "active" : ""}`}
              onClick={() => setCurrentPage("home")}
            >
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${currentPage === "products" ? "active" : ""}`}
              onClick={() => setCurrentPage("products")}
            >
              Products
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${currentPage === "about" ? "active" : ""}`}
              onClick={() => setCurrentPage("about")}
            >
              About
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link cart-link ${currentPage === "cart" ? "active" : ""}`}
              onClick={() => setCurrentPage("cart")}
            >
              Cart ({cartCount})
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

// Product Card Component
const ProductCard = ({ product, onAddToCart, isInCart }) => {
  return (
    <div className="product-card">
      <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <button
          className={`add-to-cart-btn ${isInCart ? "in-cart" : ""}`}
          onClick={() => onAddToCart(product)}
          disabled={isInCart}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}

// Home Page Component
const HomePage = ({ cart, onAddToCart }) => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to TechStore</h1>
        <p>Discover amazing tech products at great prices!</p>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            isInCart={cart.some((item) => item.id === product.id)}
          />
        ))}
      </div>
    </div>
  )
}

// Products Page Component
const ProductsPage = ({ cart, onAddToCart }) => {
  return (
    <div className="products-page">
      <h1>All Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            isInCart={cart.some((item) => item.id === product.id)}
          />
        ))}
      </div>
    </div>
  )
}

// Cart Page Component
const CartPage = ({ cart, onRemoveFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                </div>
                <button className="remove-btn" onClick={() => onRemoveFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h2>Total: ${total.toFixed(2)}</h2>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}

// About Page Component
const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About TechStore</h1>
      <p>
        TechStore is your one-stop destination for the latest technology products. We offer high-quality electronics at
        competitive prices with excellent customer service.
      </p>
      <div className="features">
        <div className="feature">
          <h3>🚚 Fast Shipping</h3>
          <p>Free shipping on orders over $50</p>
        </div>
        <div className="feature">
          <h3>🔒 Secure Payment</h3>
          <p>Your payment information is always protected</p>
        </div>
        <div className="feature">
          <h3>📞 24/7 Support</h3>
          <p>Customer support available around the clock</p>
        </div>
      </div>
    </div>
  )
}

// Main App Component
function MyStore() {
  const [currentPage, setCurrentPage] = useState("home")
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, product])
    }
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage cart={cart} onAddToCart={addToCart} />
      case "products":
        return <ProductsPage cart={cart} onAddToCart={addToCart} />
      case "cart":
        return <CartPage cart={cart} onRemoveFromCart={removeFromCart} />
      case "about":
        return <AboutPage />
      default:
        return <HomePage cart={cart} onAddToCart={addToCart} />
    }
  }

  return (
    <div className="App">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cart.length} />
      <main className="main-content">{renderPage()}</main>
    </div>
  )
}

export default MyStore
