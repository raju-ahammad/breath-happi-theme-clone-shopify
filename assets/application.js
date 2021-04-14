// Put your application javascript here

const closeAnouncebar = document.querySelector(".anouncement__closeicon")
const anounceBar = document.querySelector(".anouncement__bar")



closeAnouncebar.addEventListener('click', ()=> {
    anounceBar.classList.add("close__anounce")
})

const mobileMenu = document.querySelector(".mobile__menu__icon");
const responsiveSidebar = document.querySelector(".responsive__sidebar")
const closeIcon = document.querySelector(".close_icon")
const body = document.querySelector("body")

mobileMenu.addEventListener("click", () => {
  responsiveSidebar.classList.add("openSidebar")
  body.classList.add("mobile_sidebar__open")
  mobileMenu.style.display = "none";
  closeIcon.style.display = "block"
})

closeIcon.addEventListener('click', () => {
  responsiveSidebar.classList.remove("openSidebar");
  body.classList.remove("mobile_sidebar__open")
  mobileMenu.style.display = "block";
  closeIcon.style.display = "none"
})

const cartIcon = document.querySelector(".cart__icon")
const moileCartIcon = document.querySelector(".mobile_cart__icon")
const cartSection = document.querySelector(".mini__cart__section")
const miniCartClose = document.querySelector(".mini_cart_close_btn")
const cartOverly = document.querySelector(".body_overly_open")

cartIcon.addEventListener("click", ()=> {
  cartSection.classList.add("mini__cart__open")
  body.classList.add("mobile_sidebar__open")
  body.classList.add("body_overly_open")
})

miniCartClose.addEventListener("click", () => {
  cartSection.classList.remove("mini__cart__open")
  body.classList.remove("mobile_sidebar__open")
  body.classList.remove("body_overly_open")
  
})

moileCartIcon.addEventListener("click", ()=> {
  cartSection.classList.add("mini__cart__open")
  body.classList.add("mobile_sidebar__open", "body_overly_open")
  body.classList.add("body_overly_open")
})


function cartMenuOpen() {

  cartSection.classList.add("mini__cart__open")
  body.classList.add("mobile_sidebar__open", "body_overly_open")
  body.classList.add("body_overly_open")

}

const popupOpen = document.querySelector(".popup_open_btn")
const popupClose = document.querySelector(".popup__close__btn")
const popupContainer = document.querySelector(".filter__popup__main")
const openPopup = document.querySelector(".filter__popup__section")
const popupBtn = document.querySelector(".popup__btn")


popupOpen.addEventListener("click", () => {
  popupContainer.style.display ="block"
  body.classList.add("mobile_sidebar__open")
  openPopup.classList.add("open__popup")
})

popupClose.addEventListener("click", () => {
  popupContainer.style.display ="none"
  body.classList.remove("mobile_sidebar__open")
  openPopup.classList.remove("open__popup")
})

popupBtn.addEventListener("click", () => {
  popupContainer.style.display ="none"
  body.classList.remove("mobile_sidebar__open")
  openPopup.classList.remove("open__popup")
})


$(document).ready(function(){
    $(".whyhappi__container").slick({
        dots: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 981,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 771,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }

            
          ]
    })


    $(".happi__card__container").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        responsive: [
          {
              breakpoint: 9999,
              settings: "unslick"
          },
          {
              breakpoint: 767,
               settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true
                  }
          }
      ]
    })


    $(".product__left__column").slick({
        arrow: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1400,
              settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            }
          ]
    })
    $(".quick__related__block__container").slick({
      responsive: [
        {
            breakpoint: 9999,
            settings: "unslick"
        },
        {
            breakpoint: 2000,
            settings: "unslick"
        },
        {
          breakpoint: 1400,
          settings: "unslick"
        },
        {
            breakpoint: 1000,
            settings: "unslick"
        },
        {
            breakpoint: 780,
             settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false,
                }
        }
    ]
  })
    
  });




  
function cartBuilds(){
  var source = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);

  $.ajax({
    type: 'GET',
    url: '/cart.js',
    dataType: 'json',
    success: function(res) {
      total_price = res.total_price
      items = res.items;
      new_item = {
        items: [],
        total_price
      }
      
      $.each(items, (i, e) => {
        item = {
          id: e.id,
          title: e.title,
          image: e.image,
          quantity: e.quantity,
          price: e.price * e.quantity,
          variant_id: e.variant_id
        };
        new_item.items.push(item)
      });
      
      var html = template(new_item);
      document.getElementById("root").innerHTML = html;
    },
    error: function(xhr, status, error) {
      var err =xhr.responseText
      console.log(err);
      console.log(error);
    }

  });
}
  cartBuilds();
function cartRemove() {
  $(document).on('click', '.remove-item', function(e) {
    var $this =$(this);
    e.preventDefault();
    var productId = parseInt($(this).attr('data-id'));
    console.log("product ID",productId)
    console.log("Hello")
    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      dataType: 'json',
      data: {
        quantity: 0,
        id: productId
      },
      success: function(res) {
        
        console.log("response:","cart remove", res)
        cartBuilds();
      },
      error: function(xhr, status, error) {
        var err =xhr.responseText
        console.log(err);
        console.log(error);
      }
    });
  });
}
console.log("run")

cartRemove()



function incrementQuantity() {
  $(document).on('click', '.increment_qty', function(e) {
    console.log("Hello")
    e.preventDefault();
    var currentVal = parseInt($(this).siblings('.quan').val());
    var productId = parseInt($(this).siblings('.quan').attr('var-id'));
    var oldPrice = parseInt($(this).siblings('.quan').attr('var-price'));
    
    console.log("price", oldPrice)
    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      dataType: 'json',
      data: {
        quantity: currentVal + 1,
        id: productId
      },
      success: function(res) {
        console.log("response:", res.items)
        cartBuilds();
      },
      error: function(xhr, status, error) {
        var err =xhr.responseText
        console.log(err);
        console.log(error);
      }
    });


  });

}
function decrementQuantity() {
  $(document).on('click', '.decrement_qty', function(e) {
    console.log("Hello")
    e.preventDefault();
    var currentVal = parseInt($(this).siblings('.quan').val());
    var productId = parseInt($(this).siblings('.quan').attr('var-id'));
    
    console.log("varid", productId)
    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      dataType: 'json',
      data: {
        quantity: currentVal - 1,
        id: productId
      },
      success: function(res) {

        console.log("response:", res)
        cartBuilds();
      },
      error: function(xhr, status, error) {
        var err =xhr.responseText
        console.log(err);
        console.log(error);
      }
    });


  });

}
incrementQuantity();
decrementQuantity();