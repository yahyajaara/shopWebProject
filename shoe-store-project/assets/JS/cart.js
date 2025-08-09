document.addEventListener('DOMContentLoaded', () => {
    // Fetch navbar and footer
    fetch('static html/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        });

    fetch('static html/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Cart functionality
    const cartItemsContainer = document.querySelector('.cart-items');
    const itemCount = document.getElementById('cart-item-count');
    const summaryItemCount = document.getElementById('summary-item-count');
    const subtotal = document.getElementById('subtotal');
    const total = document.getElementById('total');

    // Load cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-5">
                    <h3>Your cart is empty</h3>
                    <p>Browse our collection and add some items to your cart!</p>
                    <a href="index.html" class="btn btn-primary">Shop Now</a>
                </div>
            `;
        } else {
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('card', 'mb-3');
                cartItem.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.title}">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body">
                                <h3 class="card-title">${item.title}</h3>
                                <p class="card-text">Shoes</p>
                                <div class="price">
                                    <p class="newPrice priceSum">USD ${item.price.toFixed(2)}</p>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="me-2">Color:</span>
                                    <select class="form-select w-auto me-3" aria-label="Select color">
                                        <option selected>${item.color}</option>
                                        <option value="1">Green</option>
                                        <option value="2">Black</option>
                                        <option value="3">White</option>
                                    </select>
                                    <span class="me-2">Quantity:</span>
                                    <div class="input-group w-auto">
                                        <button class="btn btn-outline-secondary decrease-quantity" type="button">-</button>
                                        <input type="number" class="form-control text-center quantity" value="${item.quantity}" min="1">
                                        <button class="btn btn-outline-secondary increase-quantity" type="button">+</button>
                                    </div>
                                    <button class="btn btn-danger ms-3 remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i> Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
    }

    function updateCartSummary() {
        let totalPrice = 0;
        let totalItems = 0;
        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
            totalItems += item.quantity;
        });
        itemCount.textContent = totalItems;
        summaryItemCount.textContent = totalItems;
        subtotal.textContent = `USD ${totalPrice.toFixed(2)}`;
        total.textContent = `USD ${(totalPrice + 5.00).toFixed(2)}`; // Adding shipping
    }

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('increase-quantity')) {
            const input = e.target.previousElementSibling;
            const index = e.target.closest('.card').querySelector('.remove-item').dataset.index;
            cartItems[index].quantity += 1;
            input.value = cartItems[index].quantity;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartSummary();
        } else if (e.target.classList.contains('decrease-quantity')) {
            const input = e.target.nextElementSibling;
            const index = e.target.closest('.card').querySelector('.remove-item').dataset.index;
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
                input.value = cartItems[index].quantity;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                updateCartSummary();
            }
        } else if (e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')) {
            const index = e.target.closest('.remove-item').dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
            updateCartSummary();
        }
    });

    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity')) {
            const index = e.target.closest('.card').querySelector('.remove-item').dataset.index;
            const newQuantity = parseInt(e.target.value);
            if (newQuantity < 1) {
                e.target.value = 1;
                cartItems[index].quantity = 1;
            } else {
                cartItems[index].quantity = newQuantity;
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartSummary();
        } else if (e.target.classList.contains('form-select')) {
            const index = e.target.closest('.card').querySelector('.remove-item').dataset.index;
            cartItems[index].color = e.target.value;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    });

    document.querySelector('.checkout-btn').addEventListener('click', () => {
        Swal.fire({
            title: 'Proceed to Checkout',
            text: 'You will be redirected to the payment page.',
            icon: 'info',
            confirmButtonText: 'Continue'
        });
    });

    // Initial render
    renderCartItems();
    updateCartSummary();
});