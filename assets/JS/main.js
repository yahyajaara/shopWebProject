const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: 2,
    loop: true,
  
    // If we need pagination
  
    // Navigation arrows
    navigation: 
    {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
  
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





  const timerr = ()=>
    {
        const ramadanDay = new Date("2025-03-01T00:00:00").getTime();
        const inday = new Date().getTime();
        const distance = (ramadanDay-inday);
    
        const day = Math.floor(distance / 86400000);
        const hours = Math.floor((distance % 86400000) / 3600000);
        const minutes = Math.floor(((distance % 86400000) % 3600000) / 60000);
        const seconds = Math.floor((((distance % 86400000) % 3600000) % 60000) / 1000);


        document.querySelector(".timer .row").innerHTML = 
        `
            <span> Remaining for discount </span>

            <div class="dicountTime">

                    <div class="day"> day : ${day}</div>
                    <div class="hours"> hours : ${hours} </div>
                    <div class="minutes"> minutes : ${minutes} </div>
                    <div class="seconds"> seconds : ${seconds} </div>
        
            </div>
            

        `;

    }

    setInterval(() => {
        timerr();
    }, 1000);


    const modell = ()=> {
                const logModel = document.querySelector(".my-LogModel");
            
                const logIn = document.querySelector(".backImage .end-nav .logIn"); 

                const logInModal = document.querySelector(".my-LogModel .btn");


                logIn.addEventListener("click", () => {

                  logModel.classList.remove("displayNone");

                  document.addEventListener("keydown", () => {
                    
                    if (event.key === "Escape") {
                      logModel.classList.add("displayNone");
                    }

                  });
                  
                });

                logInModal.addEventListener("click", () => {

                  logModel.classList.add("displayNone");

  

});


    }

    modell();


    const incIndex = ()=> {

      const price = document.querySelectorAll(".priceSum");

      const ArrayPrice = Array.from(price);

      console.log(price);
      



      let index = 0;
      const cart = document.querySelectorAll(".Cart");
      const ArrayCart = Array.from(cart);


      ArrayCart.forEach((item) => {
        item.addEventListener("click", () => {

          document.querySelector(".footswear .footswear-end .number ").textContent = ++index ;
          document.querySelector(".navbar .first .number ").textContent = ++index ;
          document.querySelector(".footswear .footswear-end .sum").textContent = ++ArrayPrice[item.index];

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
            title: `The shoe  ${index} has been added to your cart`
          });

      });


    });


    }
    incIndex();


    const closeLogInBut = ()=>
    {
      const logModel = document.querySelector(".my-LogModel");
      const close = document.querySelector(".my-LogModel .btn-close");
      
      close.addEventListener('click', () => {
        logModel.classList.add("displayNone");
      });
    }

    closeLogInBut();


    document.addEventListener('scroll', () => {
      const elements = document.querySelectorAll('.hidden');
      const windowHeight = window.innerHeight;
  
      elements.forEach(el => {
          const positionFromTop = el.getBoundingClientRect().top;
  
          if (positionFromTop - windowHeight <= -100) {
              el.classList.add('visible');
          }

          else {
              el.classList.remove('visible');
          }
      });
  });
  

  
const arrows = ()=>
{
  const backToTopButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => 
  {

  if (window.scrollY > 400) 
  { 
    backToTopButton.style.display = 'block';
  } 

  else 
  {
    backToTopButton.style.display = 'none';
  }

});

}

arrows();


  


 const hideNavBar = ()=>
 {

  let lastScrollPosition = 0;

  const navbar = document.querySelector('.footswear');

  window.addEventListener('scroll', () => 
  {

  const currentScrollPosition = window.scrollY;

  
  console.log(lastScrollPosition);


  if (currentScrollPosition > lastScrollPosition) 
  {
    navbar.classList.add('hiddenNav');
    lastScrollPosition = currentScrollPosition;

  } 

  else 
  {
  
    navbar.classList.remove('hiddenNav');
    navbar.classList.add('ScrollNav');
    lastScrollPosition = currentScrollPosition;
    
    if (currentScrollPosition == 0)
    {
      navbar.classList.remove('ScrollNav');
    }

  }

  
  
});

 }
 hideNavBar();



