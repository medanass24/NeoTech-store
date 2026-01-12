// --- VARIABLES ---
let isLogin = true;
let currentUser = JSON.parse(localStorage.getItem("user")) || null;

// --- MODAL AUTH ---
const openAuthModal = () => {
    document.getElementById("auth-modal").style.display = "flex";
};

// Switch login / register
const switchAuth = () => {
    isLogin = !isLogin;
    document.getElementById("auth-title").innerText = isLogin ? "Connexion" : "Inscription";
    document.getElementById("switch-auth").innerText = isLogin ? "Créer un compte" : "Déjà inscrit ?";
};

// Gérer connexion / inscription
const handleAuth = () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        showToast("Tous les champs sont requis !");
        return;
    }

    if (isLogin) {
        // Connexion
        const stored = JSON.parse(localStorage.getItem("user"));
        if (!stored || stored.username !== username || stored.password !== password) {
            showToast("Identifiants incorrects ❌");
            return;
        }
        currentUser = stored;
        showToast("Connexion réussie ✅");
    } else {
        // Inscription
        currentUser = { username, password, points: 0 };
        localStorage.setItem("user", JSON.stringify(currentUser));
        showToast("Compte créé 🎉");
    }

    document.getElementById("auth-modal").style.display = "none";
    updateUserUI();
};

// --- METTRE À JOUR L'UI HEADER ---
const updateUserUI = () => {
    const userInfo = document.getElementById("user-info");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (currentUser) {
        // Afficher infos + bouton logout
        userInfo.innerHTML = `
            <span>👤 ${currentUser.username}</span>
            <span style="margin-left:10px;color:var(--neon-green)">⭐ ${currentUser.points} pts</span>
        `;
        loginBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
    } else {
        // Afficher bouton connexion
        userInfo.innerHTML = "";
        loginBtn.style.display = "inline-block";
        logoutBtn.style.display = "none";
    }
};

// --- DECONNEXION ---
const logout = () => {
    currentUser = null;
    localStorage.removeItem("user");
    updateUserUI();
    showToast("Déconnecté ✅");
};

// --- INITIALISATION ---
updateUserUI();
