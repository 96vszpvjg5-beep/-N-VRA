const products = [
  {
    id: 1,
    name: "N-VRA Essential Tee",
    price: 89900,
    description: "Oversized heavyweight t-shirt."
  },
  {
    id: 2,
    name: "N-VRA Shadow Hoodie",
    price: 179900,
    description: "Premium heavyweight hoodie."
  },
  {
    id: 3,
    name: "N-VRA Street Cargo",
    price: 199900,
    description: "Relaxed urban cargo pants."
  },
  {
    id: 4,
    name: "N-VRA Core Tee",
    price: 99900,
    description: "Minimal graphic oversized tee."
  },
  {
    id: 5,
    name: "N-VRA Utility Jacket",
    price: 249900,
    description: "Urban utility jacket."
  },
  {
    id: 6,
    name: "N-VRA Cap",
    price: 69900,
    description: "Structured everyday cap."
  }
];

let cart = JSON.parse(
  localStorage.getItem("nvra-cart")
) || [];

const productsContainer =
  document.getElementById("products");

const cartElement =
  document.getElementById("cart");

const cartItems =
  document.getElementById("cartItems");

const cartCount =
  document.getElementById("cartCount");

const cartTotal =
  document.getElementById("cartTotal");

const cartButton =
  document.getElementById("cartButton");

const closeCart =
  document.getElementById("closeCart");

const overlay =
  document.getElementById("overlay");


function formatPrice(price) {
  return new Intl.NumberFormat(
    "es-CO",
    {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }
  ).format(price);
}


function renderProducts() {

  productsContainer.innerHTML =
    products.map(product => `

      <article class="product">

        <div class="product-image">
          -N-VRA
        </div>

        <div class="product-info">

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.description}
          </p>

          <div class="product-bottom">

            <strong>
              ${formatPrice(product.price)}
            </strong>

            <button
              class="add-cart"
              onclick="addToCart(${product.id})"
            >
              AÑADIR
            </button>

          </div>

        </div>

      </article>

    `).join("");
}


function addToCart(productId) {

  const product =
    products.find(
      item => item.id === productId
    );

  const existing =
    cart.find(
      item => item.id === productId
    );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  openCart();
}


function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  saveCart();
}


function saveCart() {

  localStorage.setItem(
    "nvra-cart",
    JSON.stringify(cart)
  );

  renderCart();
}


function renderCart() {

  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  const total =
    cart.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

  cartCount.textContent =
    totalItems;

  cartTotal.textContent =
    formatPrice(total);


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p>
        TU CARRITO ESTÁ VACÍO.
      </p>
    `;

    return;
  }


  cartItems.innerHTML =
    cart.map(item => `

      <div class="cart-item">

        <div>

          <strong>
            ${item.name}
          </strong>

          <br>

          <small>
            ${item.quantity} ×
            ${formatPrice(item.price)}
          </small>

        </div>

        <button
          class="remove-item"
          onclick="removeFromCart(${item.id})"
        >
          ELIMINAR
        </button>

      </div>

    `).join("");
}


function openCart() {

  cartElement.classList.add("open");
  overlay.classList.add("active");

}


function closeCartMenu() {

  cartElement.classList.remove("open");
  overlay.classList.remove("active");

}


cartButton.addEventListener(
  "click",
  openCart
);


closeCart.addEventListener(
  "click",
  closeCartMenu
);


overlay.addEventListener(
  "click",
  closeCartMenu
);


document
  .querySelector(".checkout")
  .addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        alert(
          "TU CARRITO ESTÁ VACÍO."
        );

        return;
      }

      alert(
        "CHECKOUT EN CONSTRUCCIÓN."
      );
    }
  );


renderProducts();
renderCart();
