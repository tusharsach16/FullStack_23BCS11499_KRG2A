const products = [
  { name: "Laptop", category: "electronics", price: 999 },
  { name: "Shirt", category: "clothing", price: 25 },
  { name: "Headphones", category: "electronics", price: 199 },
  { name: "Jeans", category: "clothing", price: 45 },
  { name: "Smartphone", category: "electronics", price: 699 },
];

document.getElementById("filter").addEventListener("change", (e) => {
  const selected = e.target.value;
  const filtered =
    selected === "all"
      ? products
      : products.filter((p) => p.category === selected);
  renderProducts(filtered);
});

function renderProducts(products) {
  const container = document.getElementById("products-container");

  if (products.length === 0) {
    container.innerHTML = `<p class="text-gray-500">No products found</p>`;
    return;
  }

  container.innerHTML = products
    .map(
      (p) => `
      <div class="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
        <h3 class="text-xl font-semibold text-gray-800">${p.name}</h3>
        <p class="text-gray-500 capitalize">Category: ${p.category}</p>
        <p class="text-indigo-600 font-bold mt-2">$${p.price}</p>
      </div>
    `
    )
    .join("");
}

renderProducts(products);
