    document.addEventListener('DOMContentLoaded', () => {
    // Load wishlist items
    const wishlistContainer = document.querySelector('#wishlist-container');
    let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

    // Clear container
    wishlistContainer.innerHTML = '';

    // Display wishlist items
    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = '<p class="text-center">Your wishlist is empty.</p>';
    } else {
        wishlistItems.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('sellersProduct', 'col-md-3');
        productDiv.innerHTML = `
            <img src="${item.image}" class="card-img-top ${item.iconeClass.replace('icone', 'img')}" alt="${item.title}">
            <div class="card-body">
            <div class="${item.iconeClass}">
                <a href="#" class="remove-from-wishlist" data-title="${item.title}"><i class="fa-solid fa-trash"></i></a>
                <a href="product.html?id=${item.id}"><i class="fa-regular fa-eye"></i></a>
                <a href="#"><i class="fa-solid fa-right-left"></i></a>
            </div>
            <div class="Description-Shose">
                <h3 class="card-title">${item.title}</h3>
                <div class="star">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                </div>
                <p>Shoes</p>
                <p class="priceSum">USD ${item.price.toFixed(2)}</p>
                <span>Color: </span>
                <select class="form-select" aria-label="Default select example">
                <option selected>Choose the color you prefer</option>
                <option value="1">Green</option>
                <option value="2">Black</option>
                <option value="3">White</option>
                </select>
                <button class="Cart">
                <span>Add to cart</span>
                <i class="fa-solid fa-bag-shopping"></i>
                </button>
            </div>
            </div>
        `;
        wishlistContainer.appendChild(productDiv);
        });
    }

    // Handle remove from wishlist
    const removeButtons = document.querySelectorAll('.remove-from-wishlist');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
        e.preventDefault();
        const title = button.dataset.title;
        wishlistItems = wishlistItems.filter(item => item.title !== title);
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

        // Update UI
        button.closest('.sellersProduct').remove();
        if (wishlistItems.length === 0) {
            wishlistContainer.innerHTML = '<p class="text-center">Your wishlist is empty.</p>';
        }

        // Show toast
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: `${title} removed from wishlist`
        });
        });
    });

    // Handle add to cart
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const updateCartUI = () => {
        const cartCountElement = document.querySelector(".footswear .footswear-end .number");
        const totalPriceElement = document.querySelector(".footswear .footswear-end .sum");
        if (cartCountElement && totalPriceElement) {
        cartCountElement.textContent = cartCount;
        totalPriceElement.textContent = totalPrice.toFixed(2);
        }
    };

    // Update cart UI after navbar loads
    if (document.querySelector(".footswear .footswear-end .number")) {
        updateCartUI();
    } else {
        const navbarLoadInterval = setInterval(() => {
        if (document.querySelector(".footswear .footswear-end .number")) {
            updateCartUI();
            clearInterval(navbarLoadInterval);
        }
        }, 100);
    }

    const cartButtons = document.querySelectorAll(".Cart");
    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
        const productElement = button.closest('.sellersProduct');
        const title = productElement.querySelector('.card-title').textContent;
        const price = parseFloat(productElement.querySelector('.priceSum').textContent.replace('USD ', ''));
        const image = productElement.querySelector('img').src;
        const colorSelect = productElement.querySelector('.form-select');
        const color = colorSelect.options[colorSelect.selectedIndex].text;

        // Check if item already exists in cart
        const existingItem = cartItems.find(item => item.title === title && item.color === color);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
            title,
            price,
            image,
            color,
            quantity: 1
            });
        }

        // Update cart count and total price
        cartCount++;
        totalPrice += price;

        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update UI
        updateCartUI();

        // Show success toast
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: `Item ${cartCount} has been added to your cart`
        });
        });
    });
    });