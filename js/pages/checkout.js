const STORAGE_KEY = "cart";

function getCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(item) {
    const cart = getCart();
    const i = cart.findIndex(x => x.id === item.id);
    if (i >= 0) {
        cart[i].qty += item.qty || 1;
    } else {
        cart.push({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        qty: item.qty || 1
    });
    }
    saveCart(cart);
    updateCartCount();
}

function updateCartCount() {
    const el = document.querySelector("#cart-count");
    if (!el) return;
    const total = getCart().reduce((sum, x) => sum + x.qty, 0);
    el.textContent = total;
}

window.Cart = { getCart, addToCart, updateCartCount };