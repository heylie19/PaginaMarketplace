const products = [
  {
    id: 1,
    name: "Camisa Blanca",
    category: "Blusas",
    price: 25,
    description: "Camisa clásica de algodón, ideal para el día a día.",
    image: "imagenes/camisa.jpg"
  },
  {
    id: 2,
    name: "Pantalón Jeans",
    category: "Pantalones",
    price: 40,
    description: "Jeans azules con corte moderno.",
    image: "imagenes/jean.jpg"
  },
  {
    id: 3,
    name: "Vestido Floral",
    category: "Vestidos",
    price: 35,
    description: "Vestido fresco con estampado floral.",
    image: "imagenes/vestido-corto.webp"
  },
  {
    id: 4,
    name: "Vestido Largo",
    category: "Vestidos",
    price: 40,
    description: "Vestido largo ideal para eventos.",
    image: "imagenes/vestido-largo.webp"
  },
  {
    id: 5,
    name: "Vestido Largo Rosado",
    category: "Vestidos",
    price: 40,
    description: "Vestido elegante para ocasiones especiales.",
    image: "imagenes/vestido1.jpg"
  },
  {
    id: 6,
    name: "Vestido Largo Estampado",
    category: "Vestidos",
    price: 40,
    description: "Vestido con estampado moderno.",
    image: "imagenes/vestido2.jpg"
  },
  {
    id: 7,
    name: "Blusa Casual",
    category: "Blusas",
    price: 30,
    description: "Blusa ligera para uso diario.",
    image: "imagenes/blusa2.jpg"
  },
  {
    id: 8,
    name: "Blusa Elegante",
    category: "Blusas",
    price: 35,
    description: "Perfecta para eventos y reuniones.",
    image: "imagenes/blusa3.jpg"
  },
  {
    id: 9,
    name: "Blusa Estampada",
    category: "Blusas",
    price: 32,
    description: "Colorida y moderna.",
    image: "imagenes/blusa4.jpg"
  },
  {
    id: 10,
    name: "Blusa de Encaje",
    category: "Blusas",
    price: 38,
    description: "Diseño delicado para un look sofisticado.",
    image: "imagenes/blusa5.jpg"
  },
  {
    id: 11,
    name: "Falda Larga Negra",
    category: "Faldas",
    price: 34,
    description: "Falda elegante y versátil.",
    image: "imagenes/falda.jpg"
  },
  {
    id: 12,
    name: "Falda Estampada",
    category: "Faldas",
    price: 30,
    description: "Falda colorida para un look casual.",
    image: "imagenes/falda1.jpg"
  },
  {
    id: 13,
    name: "Falda Corta",
    category: "Faldas",
    price: 28,
    description: "Falda corta ideal para verano.",
    image: "imagenes/falda2.jpg"
  },
  {
    id: 14,
    name: "Vestido Corto",
    category: "Vestidos",
    price: 36,
    description: "Vestido casual color azul.",
    image: "imagenes/falda3.jpg"
  },
  {
    id: 15,
    name: "Vestido Corto",
    category: "Vestidos",
    price: 36,
    description: "Vestido ideal para eventos casuales o semi-formales.",
    image: "imagenes/falda4.jpg"
  }
];

// Estado global
let filteredProducts = [...products];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentDetailId = null;

// Referencias DOM
const productList = document.getElementById("product-list");
const productDetailContainer = document.getElementById("product-detail-container");
const filterCategory = document.getElementById("filter-category");
const filterPrice = document.getElementById("filter-price");
const carritoFlotante = document.getElementById("carrito-flotante");

// --- Render productos según filtro ---
function renderProducts() {
  productList.innerHTML = "";
  if (filteredProducts.length === 0) {
    productList.innerHTML = "<p>No se encontraron productos con esos filtros.</p>";
    productDetailContainer.innerHTML = "";
    return;
  }

  filteredProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
    `;
    div.onclick = () => showProductDetail(product.id);
    productList.appendChild(div);
  });

  // Si hay un producto abierto en detalle, re-mostrarlo
  if (currentDetailId) {
    showProductDetail(currentDetailId);
  } else {
    productDetailContainer.innerHTML = "";
  }
}

// --- Mostrar detalle inline ---
function showProductDetail(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentDetailId = productId;
  productDetailContainer.innerHTML = `
    <div class="product-detail">
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p><strong>$${product.price.toFixed(2)}</strong></p>
      <button id="add-to-cart-btn">Añadir al carrito</button>
      <button id="close-detail-btn">Cerrar detalle</button>
    </div>
  `;

  document.getElementById("add-to-cart-btn").onclick = () => addToCart(product.id);
  document.getElementById("close-detail-btn").onclick = () => {
    productDetailContainer.innerHTML = "";
    currentDetailId = null;
  };

  // Scroll suave al detalle
  productDetailContainer.scrollIntoView({ behavior: "smooth" });
}

// --- Filtros ---
function applyFilters() {
  const category = filterCategory.value;
  const maxPrice = parseFloat(filterPrice.value) || Infinity;

  filteredProducts = products.filter(p => {
    const matchCategory = category === "all" || p.category === category;
    const matchPrice = p.price <= maxPrice;
    return matchCategory && matchPrice;
  });

  currentDetailId = null;
  renderProducts();
}

// --- Carrito ---
function addToCart(productId) {
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Producto añadido al carrito");
  updateCarritoFlotante();
}

function removeFromCart(indexToRemove) {
  const product = products.find(p => p.id === cart[indexToRemove]);
  const confirmDelete = confirm(`¿Quieres eliminar "${product.name}" del carrito?`);
  if (confirmDelete) {
    cart.splice(indexToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCarritoFlotante();
  }
}

function updateCarritoFlotante() {
  carritoFlotante.textContent = `🛒 Carrito (${cart.length})`;
}

// --- Mostrar carrito en modal simple ---
function mostrarCarritoModal() {
  const modal = document.createElement("div");
  modal.id = "modal-carrito";
  modal.style = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;
    z-index: 50;
  `;

  const contenido = document.createElement("div");
  contenido.style = `
    background: white; padding: 20px; border-radius: 8px; max-width: 400px; width: 90%;
    max-height: 80vh; overflow-y: auto;
  `;

  contenido.innerHTML = `<h2>🛒 Tu Carrito (${cart.length})</h2>`;

  if (cart.length === 0) {
    contenido.innerHTML += `<p>Tu carrito está vacío</p>`;
  } else {
    cart.forEach((id, index) => {
      const p = products.find(prod => prod.id === id);
      const itemDiv = document.createElement("div");
      itemDiv.style = "display:flex; align-items:center; margin-bottom: 12px;";
      itemDiv.innerHTML = `
        <img src="${p.image}" alt="${p.name}" style="width:60px; height:80px; object-fit:cover; border-radius:4px; margin-right:10px;">
        <div>
          <h4 style="margin:0;">${p.name}</h4>
          <p style="margin:0; font-weight:bold;">$${p.price.toFixed(2)}</p>
        </div>
        <button style="margin-left:auto; background:none; border:none; font-size:20px; color:#e74c3c; cursor:pointer;">❌</button>
      `;
      itemDiv.querySelector("button").onclick = () => {
        removeFromCart(index);
        document.body.removeChild(modal);
      };
      contenido.appendChild(itemDiv);
    });
  }

  const cerrarBtn = document.createElement("button");
  cerrarBtn.textContent = "Cerrar";
  cerrarBtn.style = `
    margin-top: 10px; padding: 8px 16px; background: #c0392b; color: white;
    border: none; border-radius: 6px; cursor: pointer;
  `;
  cerrarBtn.onclick = () => document.body.removeChild(modal);

  contenido.appendChild(cerrarBtn);
  modal.appendChild(contenido);
  document.body.appendChild(modal);
}

// --- Inicialización ---
function init() {
  // Crear filtros dinámicamente
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // Agrega filtro categoría
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat === "all" ? "Todas" : cat;
    filterCategory.appendChild(option);
  });

  filterCategory.onchange = applyFilters;
  filterPrice.oninput = applyFilters;

  carritoFlotante.onclick = mostrarCarritoModal;

  updateCarritoFlotante();
  renderProducts();
}

// Arranca la app al cargar el DOM
document.addEventListener("DOMContentLoaded", init);
