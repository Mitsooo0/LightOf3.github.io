// Your products — add new items here
const products = [
  { name: "T-Shirt", price: 20, quantity: 10 },
  { name: "Hoodie", price: 40, quantity: 5 },
  { name: "Cap", price: 15, quantity: 8 }
];

// Select the shop container
const shop = document.querySelector(".shop");

// Initialize stock in localStorage if it doesn't exist
if (!localStorage.getItem("shopStock")) {
  localStorage.setItem("shopStock", JSON.stringify(products));
}

// Load stock from localStorage
let stock = JSON.parse(localStorage.getItem("shopStock"));

// Function to display products
function displayProducts() {
  shop.innerHTML = ""; // Clear the shop

  stock.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    productDiv.innerHTML = `
      <h2>${product.name}</h2>
      <p>Price: $${product.price}</p>
      <p>In Stock: <span class="quantity">${product.quantity}</span></p>
      <button id="buy-${index}">Add to Cart</button>
    `;

    shop.appendChild(productDiv);

    // Handle buying
    const buyBtn = document.getElementById(`buy-${index}`);
    buyBtn.addEventListener("click", () => {
      if (product.quantity > 0) {
        product.quantity--;
        productDiv.querySelector(".quantity").textContent = product.quantity;
        alert(`You added 1 ${product.name} to your cart!`);

        // Save updated stock to localStorage
        localStorage.setItem("shopStock", JSON.stringify(stock));
      } else {
        alert(`Sorry, ${product.name} is out of stock!`);
      }
    });
  });
}

// Initial display
displayProducts();
