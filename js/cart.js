(function () {
    const STORAGE_KEY = "cart";

    function getCart() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
        catch { return []; }
    }
    function saveCart(c) { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); }
    function addToCart(item) {
        const cart = getCart();
        const i = cart.findIndex(x => x.id === item.id);
        if (i >= 0) cart[i].qty += item.qty || 1;
        else cart.push({ id: item.id, title: item.title, price: Number(item.price), image: item.image, qty: item.qty || 1 });
        saveCart(cart); updateCartCount();
    }
    function updateCartCount() {
        const el = document.querySelector("#cart-count");
        if (!el) return;
        el.textContent = getCart().reduce((s, x) => s + x.qty, 0);
    }

    window.Cart = { getCart, addToCart, updateCartCount };
    console.log("Cart ready:", !!window.Cart);
})();
