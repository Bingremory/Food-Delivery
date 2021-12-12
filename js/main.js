/* Header scroll */
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 0);
});

/* Header show menu */
const menu = document.querySelector(".menu-list");
const menuOpen = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const menuLink = document.querySelectorAll(".menu-link");

if (menuOpen) {
  menuOpen.addEventListener("click", () => {
    menu.classList.add("show");
  });
}

if (menuClose) {
  menuClose.addEventListener("click", () => {
    menu.classList.remove("show");
  });
}

function menuToggle() {
  menu.classList.remove("show");
}
menuLink.forEach((n) => n.addEventListener("click", menuToggle));

window.addEventListener("scroll", () => {
  menu.classList.remove("show");
});

/* Header Sign In */
const signInForm = document.querySelector(".wrapper");
const signIn = document.querySelector(".signin");
const closeForm = document.querySelector(".close-form");

signIn.onclick = () => {
  signInForm.classList.add("active");
};

closeForm.onclick = () => {
  signInForm.classList.remove("active");
};

/* Swiper + Tab */
const swiper = new Swiper(".mySwiper", {
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".custom-pagination",
    clickable: true,
  },
  breakpoints: {
    567: {
      slidesPerView: 2,
    },
    996: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

const getProducts = async () => {
  try {
    const results = await fetch("./data/product.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

const ProductsWrapper = document.getElementById("products-wrapper");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);
});

const displayProductItems = (items) => {
  let displayProduct = items.map(
    (product) => ` 
                <div class="swiper-slide">
                <div class="card d-flex">
                  <div class="image"><img src=${product.url} alt=""></div>
                  <div class="rating">
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  <span><i class="bx bxs-star"></i></span>
                  </div>
                  <h4>${product.title}</h4>
                  <div class="price">
                    <span>Price</span><span class="color">$${product.price}</span>
                  </div>
                  <a href="#!" class="btn">Add To Cart+</a>
                </div>
              </div>
                  `
  );
  displayProduct = displayProduct.join("");
  if (ProductsWrapper) {
    ProductsWrapper.innerHTML = displayProduct;
  }
};

const filters = [...document.querySelectorAll(".filters span")];

filters.forEach((filter) => {
  filters[0].classList.add("active");
  filter.addEventListener("click", async (e) => {
    const id = e.target.getAttribute("data-filter");
    const target = e.target;
    const products = await getProducts();
    filters.forEach((btn) => {
      btn.classList.remove("active");
    });
    target.classList.add("active");

    let menuCategory = products.filter((product) => {
      if (product.category === id) {
        return product;
      }
    });

    if (id === "All Product") {
      displayProductItems(products);
      swiper.update();
    } else {
      displayProductItems(menuCategory);
      swiper.update();
    }
  });
});

/* Customer Testimonial */

const getTestimonials = async () => {
  try {
    const results = await fetch("./data/testimonial.json");
    const data = await results.json();
    const testimonials = data.testimonials;
    return testimonials;
  } catch (err) {
    console.log(err);
  }
};

const testimonialsWrapper = document.querySelector(".test-wrapper");
const cards = [...document.querySelectorAll(".testimonials .card")];

window.addEventListener("DOMContentLoaded", async function () {
  const testimonials = await getTestimonials();
  displayTestimonials(testimonials);
  filter();
});

const displayTestimonials = (items) => {
  let testimonials = items.map(
    (item) => ` 
                <div class="testimonial" data-id="${item.firstName}">
            <div class="d-flex">
              <div>
                <h4>${item.name}</h4>
                <span>${item.position}</span>
              </div>

              <div class="rating">
                <span><i class="bx bxs-star"></i></span>
                <span><i class="bx bxs-star"></i></span>
                <span><i class="bx bxs-star"></i></span>
                <span><i class='bx bxs-star-half' ></i></i></span>
                <span><i class='bx bxs-star-half' ></i></i></span>
              </div>
            </div>

            <p>
             ${item.info}
            </p>
          </div>
                  `
  );

  testimonials = testimonials.join("");
  testimonialsWrapper.innerHTML = testimonials;
};

/* Testimonial */

function filter() {
  const testimonial = [...document.querySelectorAll(".testimonial")];
  for (let i = 0; i < cards.length; i++) {
    cards[0].classList.add("active");
    testimonial[0].classList.add("active");
    cards[i].onclick = function () {
      for (let x = 0; x < cards.length; x++) {
        cards[x].classList.remove("active");
      }
      this.classList.add("active");
      const filter = this.getAttribute("data-filter");
      for (let z = 0; z < testimonial.length; z++) {
        testimonial[z].style.opacity = 0;

        if (testimonial[z].getAttribute("data-id") === filter) {
          testimonial[z].style.bottom = "-5%";
          testimonial[z].style.opacity = 1;
        }
      }
    };
  }
}

/* $(document).keydown(function (event) {
  if (event.keyCode == 123) {
    // Prevent F12
    return false;
  } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
    // Prevent Ctrl+Shift+I
    return false;
  }
});
$(document).on("contextmenu", function (e) {
  e.preventDefault();
});

document.onkeydown = function (e) {
  if (
    e.ctrlKey &&
    (e.keyCode === 67 ||
      e.keyCode === 86 ||
      e.keyCode === 85 ||
      e.keyCode === 117)
  ) {
    return false;
  } else {
    return true;
  }
};
$(document).keypress("u", function (e) {
  if (e.ctrlKey) {
    return false;
  } else {
    return true;
  }
}); */
