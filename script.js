// Products data
const products = [
  {
    id: 1,
    name: "Bananas Frescas",
    description: "Bananas maduras e doces, perfeitas para vitaminas",
    price: 4.99,
    image: "🍌",
  },
  {
    id: 2,
    name: "Leite Integral",
    description: "Leite fresco integral 1L",
    price: 5.49,
    image: "🥛",
  },
  {
    id: 3,
    name: "Pão Francês",
    description: "Pão francês fresquinho do dia",
    price: 8.9,
    image: "🥖",
  },
  {
    id: 4,
    name: "Arroz Branco",
    description: "Arroz branco tipo 1, pacote 5kg",
    price: 22.9,
    image: "🍚",
  },
  {
    id: 5,
    name: "Feijão Preto",
    description: "Feijão preto selecionado, pacote 1kg",
    price: 8.5,
    image: "🫘",
  },
  {
    id: 6,
    name: "Tomates",
    description: "Tomates frescos e suculentos",
    price: 6.99,
    image: "🍅",
  },
  {
    id: 7,
    name: "Ovos",
    description: "Ovos frescos, cartela com 12 unidades",
    price: 12.9,
    image: "🥚",
  },
  {
    id: 8,
    name: "Açúcar Cristal",
    description: "Açúcar cristal refinado, pacote 1kg",
    price: 4.2,
    image: "🧂",
  },
]

// Cart state
let cart = []

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
  updateCartUI()
})

// Load products into the grid
function loadProducts() {
  const productsGrid = document.getElementById("products-grid")
  productsGrid.innerHTML = ""

  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
                </button>
            </div>
        `
    productsGrid.appendChild(productCard)
  })
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
    })
  }

  updateCartUI()
  showNotification(`${product.name} adicionado ao carrinho!`)
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  updateCartUI()
}

// Update product quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(productId)
    } else {
      updateCartUI()
    }
  }
}

// Update cart UI
function updateCartUI() {
  const cartCount = document.getElementById("cart-count")
  const cartItems = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")
  const checkoutBtn = document.getElementById("checkout-btn")

  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems

  // Update cart items
  cartItems.innerHTML = ""
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">Seu carrinho está vazio</p>'
    checkoutBtn.disabled = true
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
      cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <div class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            `
      cartItems.appendChild(cartItem)
    })
    checkoutBtn.disabled = false
  }

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  cartTotal.textContent = total.toFixed(2).replace(".", ",")
}

// Cart functions
function toggleCart() {
  const cartSidebar = document.getElementById("cart-sidebar")
  const cartOverlay = document.getElementById("cart-overlay")

  cartSidebar.classList.toggle("active")
  cartOverlay.classList.toggle("active")
}

function closeCart() {
  const cartSidebar = document.getElementById("cart-sidebar")
  const cartOverlay = document.getElementById("cart-overlay")

  cartSidebar.classList.remove("active")
  cartOverlay.classList.remove("active")
}

// Checkout functions
function openCheckout() {
  if (cart.length === 0) return

  const checkoutOverlay = document.getElementById("checkout-overlay")
  const checkoutItems = document.getElementById("checkout-items")
  const checkoutTotal = document.getElementById("checkout-total")

  // Populate checkout items
  checkoutItems.innerHTML = ""
  cart.forEach((item) => {
    const checkoutItem = document.createElement("div")
    checkoutItem.className = "checkout-item"
    checkoutItem.innerHTML = `
            <span>${item.name} (${item.quantity}x)</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
        `
    checkoutItems.appendChild(checkoutItem)
  })

  // Update total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  checkoutTotal.textContent = total.toFixed(2).replace(".", ",")

  checkoutOverlay.classList.add("active")
  closeCart()
}

function closeCheckout() {
  const checkoutOverlay = document.getElementById("checkout-overlay")
  checkoutOverlay.classList.remove("active")
}

// Handle checkout form submission
document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault()

  const customerName = document.getElementById("customer-name").value
  const customerEmail = document.getElementById("customer-email").value
  const customerPhone = document.getElementById("customer-phone").value
  const paymentMethod = document.getElementById("payment-method").value

  // Generate invoice
  generateInvoice({
    customerName,
    customerEmail,
    customerPhone,
    paymentMethod,
    items: [...cart],
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
  })

  closeCheckout()
})

// Generate invoice
function generateInvoice(orderData) {
  const invoiceOverlay = document.getElementById("invoice-overlay")
  const invoiceContent = document.getElementById("invoice-content")

  const invoiceNumber = "NF-" + Date.now().toString().slice(-6)
  const currentDate = new Date().toLocaleDateString("pt-BR")
  const currentTime = new Date().toLocaleTimeString("pt-BR")

  const paymentMethods = {
    credit: "Cartão de Crédito",
    debit: "Cartão de Débito",
    pix: "PIX",
    cash: "Dinheiro",
  }

  invoiceContent.innerHTML = `
        <div class="invoice-header">
            <h2>SuperMercado Online</h2>
            <p>CNPJ: 12.345.678/0001-90</p>
            <p>Endereço: Rua das Compras, 123 - Centro</p>
            <p>Telefone: (11) 1234-5678</p>
        </div>
        
        <div class="invoice-info">
            <div>
                <h4>Dados do Cliente:</h4>
                <p><strong>Nome:</strong> ${orderData.customerName}</p>
                <p><strong>Email:</strong> ${orderData.customerEmail}</p>
                <p><strong>Telefone:</strong> ${orderData.customerPhone}</p>
            </div>
            <div>
                <h4>Dados da Compra:</h4>
                <p><strong>Nota Fiscal:</strong> ${invoiceNumber}</p>
                <p><strong>Data:</strong> ${currentDate}</p>
                <p><strong>Hora:</strong> ${currentTime}</p>
                <p><strong>Pagamento:</strong> ${paymentMethods[orderData.paymentMethod]}</p>
            </div>
        </div>
        
        <div class="invoice-items">
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Qtd</th>
                        <th>Valor Unit.</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderData.items
                      .map(
                        (item) => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>R$ ${item.price.toFixed(2).replace(".", ",")}</td>
                            <td>R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}</td>
                        </tr>
                    `,
                      )
                      .join("")}
                </tbody>
            </table>
        </div>
        
        <div class="invoice-total">
            <p>Total Geral: R$ ${orderData.total.toFixed(2).replace(".", ",")}</p>
        </div>
        
        <div style="text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
            <p><strong>Obrigado pela sua compra!</strong></p>
            <p>Volte sempre ao SuperMercado Online</p>
        </div>
    `

  invoiceOverlay.classList.add("active")
}

function closeInvoice() {
  const invoiceOverlay = document.getElementById("invoice-overlay")
  invoiceOverlay.classList.remove("active")
}

function printInvoice() {
  window.print()
}

function startNewOrder() {
  cart = []
  updateCartUI()
  closeInvoice()

  // Reset checkout form
  document.getElementById("checkout-form").reset()

  showNotification("Nova compra iniciada!")
}

// Utility function to show notifications
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `
  notification.textContent = message

  // Add animation keyframes
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style")
    style.id = "notification-styles"
    style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `
    document.head.appendChild(style)
  }

  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove()
  }, 3000)
}
