# ShopTestLab Frontend

A real React e-commerce website built with Vite + React, connected to the Spring Boot backend.

---

## 📁 Pages & Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home — hero banner + featured products | No |
| `/products` | Product listing — search + category filter | No |
| `/products/:id` | Product detail — quantity selector, add to cart | No |
| `/cart` | Shopping cart — update qty, remove, totals | Login |
| `/checkout` | Checkout — address form, order summary | Login |
| `/login` | Login form | No |
| `/register` | Registration form | No |
| `/orders` | Order history — expandable items | Login |

---

## 🚀 Setup (2 minutes)

### Step 1: Make sure backend is running
```bash
# In shoptestlab/ folder:
mvn spring-boot:run
# Confirm: http://localhost:8080/swagger-ui.html works
```

### Step 2: Install frontend dependencies
```bash
# In shoptestlab-frontend/ folder:
npm install
```

### Step 3: Start frontend
```bash
npm run dev
```

Open browser: **http://localhost:3000**

---

## 🧪 Pre-loaded Accounts

| Role | Username | Password |
|---|---|---|
| User | `testuser` | `test123` |
| Admin | `admin` | `admin123` |

---

## 🔬 data-testid Reference (for Selenium)

Every interactive element has a `data-testid` attribute — use these as Selenium locators:

### Navbar
| testid | Element |
|---|---|
| `navbar` | Navigation bar |
| `logo` | Site logo |
| `nav-products` | Shop link |
| `nav-cart` | Cart link |
| `cart-count` | Cart badge number |
| `nav-login` | Login link |
| `nav-register` | Sign Up button |
| `user-greeting` | "Hi, username" text |
| `logout-btn` | Logout button |

### Home
| testid | Element |
|---|---|
| `hero-shop-btn` | "Browse Collection" button |
| `featured-grid` | Featured products container |

### Products
| testid | Element |
|---|---|
| `search-input` | Search field |
| `category-All` | All category pill |
| `category-Electronics` | Electronics filter |
| `category-Footwear` | Footwear filter |
| `products-grid` | Products container |
| `product-{id}` | Individual product card |
| `product-name-{id}` | Product name |
| `product-price-{id}` | Product price |

### Product Detail
| testid | Element |
|---|---|
| `product-detail-name` | Product name heading |
| `product-detail-price` | Product price |
| `qty-decrease` | Minus button |
| `qty-value` | Quantity number |
| `qty-increase` | Plus button |
| `add-to-cart-btn` | Add to cart button |

### Cart
| testid | Element |
|---|---|
| `empty-cart` | Empty cart message |
| `cart-items` | Cart items container |
| `cart-item-{id}` | Individual cart item |
| `qty-dec-{id}` | Decrease qty button |
| `qty-{id}` | Qty value |
| `qty-inc-{id}` | Increase qty button |
| `remove-{id}` | Remove button |
| `summary-subtotal` | Cart subtotal |
| `summary-total` | Cart total with tax |
| `checkout-btn` | Proceed to checkout |

### Checkout
| testid | Element |
|---|---|
| `address-input` | Shipping address textarea |
| `place-order-btn` | Place order button |
| `checkout-total` | Order total amount |

### Login / Register
| testid | Element |
|---|---|
| `login-username` | Username input |
| `login-password` | Password input |
| `login-submit` | Login button |
| `reg-fullname` | Full name input |
| `reg-username` | Username input |
| `reg-email` | Email input |
| `reg-password` | Password input |
| `reg-submit` | Register button |

### Orders
| testid | Element |
|---|---|
| `empty-orders` | No orders message |
| `orders-list` | Orders container |
| `order-{id}` | Individual order card |
| `order-status-{id}` | Order status badge |
| `order-total-{id}` | Order total |
| `order-expand-{id}` | View items toggle |
| `order-items-{id}` | Expanded items list |

---

## Selenium Locator Example

```java
// Find element by data-testid
By.cssSelector("[data-testid='login-username']")
By.cssSelector("[data-testid='cart-count']")
By.cssSelector("[data-testid='product-1']")
```
