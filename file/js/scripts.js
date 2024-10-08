document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add to cart function
    window.addToCart = function(name, price, image) {
        const quantity = name === 'Main Product' ? parseInt(document.getElementById('inputQuantity').value) : 1;
        cart.push({ name, price, quantity, image });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    };

    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
    }

    // Redirect to cart page when cart button is clicked
    if (cartButton) {
        cartButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'cart.html';
        });
    }

    // Display cart items if on cart page
    const cartItemsContainer = document.getElementById('cartItems');
    if (cartItemsContainer) {
        displayCartItems();
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
                        <!-- Product image-->
                        <img class="card-img-top" src="${item.image}" alt="${item.name}" />
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">${item.name}</h5>
                                <!-- Product price-->
                                $${item.price.toFixed(2)}
                            </div>
                        </div>
                        <!-- Product actions-->
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
});