let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec => {
    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if (top => offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
      });
    };

  });
}

document.querySelector('#search-icon').onclick = () => {
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () => {
  document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
});


var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Get all "Add to Cart" buttons for dishes and menu
  const addToCartButtons = document.querySelectorAll('.dishes .box .btn, .menu .box .btn');
  const addOrderContainer = document.querySelector('.order-item');

  // Add click event listener to each button
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function (event) {
          event.preventDefault(); // Prevent the default form submission behavior

          // Get the dish name and price from the nearest "addOrder" element
          const dishName = this.parentElement.querySelector('.addOrder').textContent;
          const dishPrice = this.parentElement.querySelector('.d_price').textContent;

          // Create a new order item element
          const orderItem = document.createElement('div');
          orderItem.classList.add('order-item');
          orderItem.innerHTML = `
              <span>${dishName} : ${dishPrice} </span>
          `;
          // Append the order item to the order container
          addOrderContainer.appendChild(orderItem);
      });
  });
});

function getUpdatedOrderContent() {
  // Get the updated order content
  const orderItem = document.querySelector('.order-item');
  if (orderItem) {
      return orderItem.textContent.trim(); // Return the inner text content of the updated order item
  } else {
      return ''; // Return an empty string if the order item is not found
  }
}



// Example usage:
// const updatedOrderContent = getUpdatedOrderContent();

// module.exports = updatedOrderContent;


// JavaScript function to add item to order
// function addToOrder(button) {
//   // Prevent default form submission behavior
//   addToCartButtons.forEach(button => {
//     button.addEventListener('click', function (event) {
//       event.preventDefault();
//     })})
//     // Get the parent box of the button
//     const box = button.closest('.box');

//     // Find the addOrder element within the box
//     const addOrderElement = box.querySelector('.addOrder');
//     console.log(addOrderElement);

//     // Get the text content of the addOrder element
//     const orderText = addOrderElement.textContent;

//     // Find the order input element in the form
//     const orderInput = document.querySelector('#order input[type="text"]');

//     // Append the order text to the order input value
//     orderInput.value += orderText + '\n';
//   }




  // function orderInString(){
    
  //   return ();
  // }