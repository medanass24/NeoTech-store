let cart = [];

/* OUVRIR / FERMER PANIER */
function toggleCart() {
    document.getElementById("cart-modal").classList.toggle("open");
}

/* AJOUT AU PANIER */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    cart.push(product);
    updateCartUI();
    showToast(`${product.name} ajouté au panier 🛒`);

    const badge = document.getElementById("cart-count");
    badge.style.transform = "scale(1.5)";
    setTimeout(() => badge.style.transform = "scale(1)", 200);
}

/* SUPPRESSION */
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

/* MISE À JOUR UI */
function updateCartUI() {
    const itemsContainer = document.getElementById("cart-items");
    const countEl = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total-price");

    countEl.innerText = cart.length;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p style="text-align:center;color:#888">Votre panier est vide.</p>`;
        totalEl.innerText = "0 DH";
        return;
    }

    let total = 0;
    itemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div style="flex:1">
                <strong>${item.name}</strong>
                <p>${item.price} DH</p>
            </div>
            <span onclick="removeFromCart(${index})" style="cursor:pointer;color:#ff4d4d">&times;</span>
        `;
        itemsContainer.appendChild(div);
    });

    totalEl.innerText = total + " DH";
}

/* CHECKOUT */
function checkout() {
    if (!currentUser) {
        showToast("Veuillez vous connecter 🔐");
        return;
    }

    if (cart.length === 0) {
        showToast("Panier vide ❌");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const earnedPoints = Math.floor(total / 10);

    currentUser.points += earnedPoints;
    localStorage.setItem("user", JSON.stringify(currentUser));

    cart = [];
    updateCartUI();
    updateUserUI();
    toggleCart();

    showToast(`Commande validée 🎉 +${earnedPoints} pts`);
}
