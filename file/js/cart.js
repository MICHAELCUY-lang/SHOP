let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, image) {
    const quantity = name === 'Main Product' ? parseInt(document.getElementById('inputQuantity').value) : 1;
    cart.push({ name, price, quantity, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;

    let cartContent = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartContent += `
            <div class="col mb-5">
                <div class="card h-100">
                    <img class="card-img-top" src="${item.image}" alt="${item.name}" />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${item.name}</h5>
                            $${item.price.toFixed(2)}
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">Quantity: ${item.quantity}</div>
                        <div class="text-center"><button class="btn btn-outline-dark mt-auto" onclick="removeFromCart(${index})">Remove</button></div>
                    </div>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartContent;
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) {
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
});