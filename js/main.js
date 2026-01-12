
/* RENDER PRODUITS */
function renderProducts(filter = "all", search = "") {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    const filteredProducts = products.filter(p => {
        const matchCategory = filter === "all" || p.category === filter;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;color:#888">
                Aucun produit trouvé
            </p>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-content">
                <span class="category-tag">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} €</div>
                <button class="add-btn" onclick="addToCart(${product.id})">
                    Ajouter au panier
                </button>
            </div>
        `;
        grid.appendChild(card);

        gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: "power3.out"
        });
    });
}

/* FILTRES & SEARCH */
function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("search-input");
    let activeFilter = "all";

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.dataset.filter;
            renderProducts(activeFilter, searchInput.value);
        });
    });

    searchInput.addEventListener("input", e => {
        renderProducts(activeFilter, e.target.value);
    });
}

/* TOAST */
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

/* INIT GLOBAL */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);

    initThreeJS();
    renderProducts();
    setupFilters();
    updateUserUI();

    document.getElementById("explore-3d").addEventListener("click", () => {
        showToast("Interaction 3D activée ✨");
    });
});
