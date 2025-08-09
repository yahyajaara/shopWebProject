const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 2,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const filters = document.querySelectorAll('.filter-button');
const productContainer = document.querySelector('.tab-content');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    productContainer.classList.remove('animate-fade');
    void productContainer.offsetWidth;
    productContainer.classList.add('animate-fade');
  });
});

const modell = () => {
  const logModel = document.querySelector(".my-LogModel");
  const logIn = document.querySelector(".backImage .end-nav .logIn");
  const logInModal = document.querySelector(".my-LogModel .btn");

  logIn.addEventListener("click", () => {
    logModel.classList.remove("displayNone");
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        logModel.classList.add("displayNone");
      }
    });
  });

  logInModal.addEventListener("click", () => {
    logModel.classList.add("displayNone");
  });
};
modell();

const generateBestsellers = () => {
  const bestsellersContainer = document.querySelector('#bestsellers-container');
  const products = [
    {
      id: 1,
      image: './assets/Photo/chose1.png',
      imgClass: 'img1',
      title: 'Roshe G Next nature',
      price: 50.00,
      iconeClass: 'icone1'
    },
    {
      id: 2,
      image: './assets/Photo/shose 3.png',
      imgClass: 'img2',
      title: 'Renew Elevate 3',
      price: 85.00,
      iconeClass: 'icone2'
    },
    {
      id: 3,
      image: './assets/Photo/shose2.png',
      imgClass: 'img3',
      title: 'Air Max Flyknit Racer',
      price: 52.00,
      iconeClass: 'icone3'
    },
    {
      id: 4,
      image: './assets/Photo/shose 4.png',
      imgClass: 'img4',
      title: 'Air Max 40 Unlocked',
      price: 45.00,
      iconeClass: 'icone4'
    }
  ];

  // NEW: Load wishlist from localStorage
  let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

  products.forEach((product, index) => { 
    const productDiv = document.createElement('div');
    productDiv.classList.add('sellersProduct');
    // NEW: Check if product is in wishlist to set heart icon
    const isInWishlist = wishlistItems.some(item => item.title === product.title);
    productDiv.innerHTML = `
      <img src="${product.image}" class="card-img-top ${product.imgClass}" alt="${product.title}">
      <div class="card-body">
        <div class="${product.iconeClass}">
          <!-- MODIFIED: Added wishlist-toggle class and data attributes -->
          <a href="#" class="wishlist-toggle" data-title="${product.title}" data-image="${product.image}" data-price="${product.price}" data-id="${product.id}" data-iconeClass="${product.iconeClass}">
            <i class="${isInWishlist ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
          </a>
          <a href="#" onclick="window.location.href='product.html?id=${product.id}'"><i class="fa-regular fa-eye"></i></a>
          <a href="#"><i class="fa-solid fa-right-left"></i></a>
        </div>
        <div class="Description-Shose">
          <h3 class="card-title">${product.title}</h3>
          <div class="star">
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </div>
          <p>Shoes</p>
          <p class="priceSum">USD ${product.price.toFixed(2)}</p>
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
    bestsellersContainer.appendChild(productDiv);
  });

  // NEW: Handle wishlist toggle
  const wishlistButtons = document.querySelectorAll('.wishlist-toggle');
  wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const title = button.dataset.title;
      const image = button.dataset.image;
      const price = parseFloat(button.dataset.price);
      const id = parseInt(button.dataset.id);
      const iconeClass = button.dataset.iconeclass;
      const heartIcon = button.querySelector('i');

      // Toggle wishlist item
      let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
      const existingItem = wishlistItems.find(item => item.title === title);
      if (existingItem) {
        // Remove from wishlist
        wishlistItems = wishlistItems.filter(item => item.title !== title);
        heartIcon.classList.remove('fa-solid', 'fa-heart');
        heartIcon.classList.add('fa-regular', 'fa-heart');
      } else {
        // Add to wishlist
        wishlistItems.push({ id, title, image, price, iconeClass });
        heartIcon.classList.remove('fa-regular', 'fa-heart');
        heartIcon.classList.add('fa-solid', 'fa-heart');
      }

      // Save to localStorage
      localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

      // Show toast notification
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
        title: existingItem ? `${title} removed from wishlist` : `${title} added to wishlist`
      });
    });
  });
};

const incIndex = () => {
  generateBestsellers(); // Generate bestsellers products
  const priceElements = document.querySelectorAll(".priceSum");
  const numericPrices = Array.from(priceElements).map(el => {
    return parseFloat(el.innerText.replace("USD", "").trim());
  });

  let cartCount = 0;
  let totalPrice = 0;

  // Load existing cart from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Update UI with existing cart data
  if (cartItems.length > 0) {
    cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelector(".footswear .footswear-end .number").textContent = cartCount;
    document.querySelector(".footswear .footswear-end .sum").textContent = totalPrice.toFixed(2);
  }

  const cartButtons = document.querySelectorAll(".Cart");
  cartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const productElement = button.closest('.sellersProduct');
      const title = productElement.querySelector('.card-title').textContent;
      const price = numericPrices[index];
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
      document.querySelector(".footswear .footswear-end .number").textContent = cartCount;
      document.querySelector(".footswear .footswear-end .sum").textContent = totalPrice.toFixed(2);

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
};
incIndex();

const closeLogInBut = () => {
  const logModel = document.querySelector(".my-LogModel");
  const close = document.querySelector(".my-LogModel .btn-close");
  close.addEventListener('click', () => {
    logModel.classList.add("displayNone");
  });
};
closeLogInBut();

document.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.hidden');
  const windowHeight = window.innerHeight;
  elements.forEach(el => {
    const positionFromTop = el.getBoundingClientRect().top;
    if (positionFromTop - windowHeight <= -100) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
});

const arrows = () => {
  const backToTopButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
};
arrows();

const hideNavBar = () => {
  let lastScrollPosition = 0;
  const navbar = document.querySelector('.footswear');
  window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > lastScrollPosition) {
      navbar.classList.add('hiddenNav');
      lastScrollPosition = currentScrollPosition;
    } else {
      navbar.classList.remove('hiddenNav');
      navbar.classList.add('ScrollNav');
      lastScrollPosition = currentScrollPosition;
      if (currentScrollPosition == 0) {
        navbar.classList.remove('ScrollNav');
      }
    }
  });
};
hideNavBar();