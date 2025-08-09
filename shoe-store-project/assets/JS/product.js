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

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  if (product) {
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').classList.add(product.imgClass);
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-price').textContent = `USD ${product.price.toFixed(2)}`;
    document.getElementById('product-icons').classList.add(product.iconeClass);
  } else {
    document.querySelector('.product-container').innerHTML = '<p>Product not found.</p>';
  }
});

function addToCart() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  if (product) {
    const title = product.title;
    const price = product.price;
    const image = product.image;
    const colorSelect = document.querySelector('.form-select');
    const color = colorSelect.options[colorSelect.selectedIndex].text;

    // Load existing cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
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
    let cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update UI
    const cartCountElement = document.querySelector(".footswear .footswear-end .number");
    const totalPriceElement = document.querySelector(".footswear .footswear-end .sum");
    if (cartCountElement && totalPriceElement) {
      cartCountElement.textContent = cartCount;
      totalPriceElement.textContent = totalPrice.toFixed(2);
    }

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
  }
}