//slider

$(document).ready(function(){
    $('.carousel__inner').slick( {
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prevArrow.png" alt="prevArrow"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/nextArrow.png" alt="nextArrow"></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    variableWidth: true,
                    slidesToShow: 1,
                },

                breakpoint: 767,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
});

//tabs

const wrapper = document.querySelector('.catalog__tabs'),
      tabs = document.querySelectorAll('.catalog__tab');

let   catalogPages = document.querySelectorAll('.catalog__content'),
      cardsWrapper = document.querySelector('.catalog');

wrapper.addEventListener('click', (e) => {
    tabs.forEach((item, i) => {
        item.classList.remove('catalog__tab_active');

        if (i == (+e.target.getAttribute('data-id') - 1)) {
            catalogPages.forEach(item => {
                item.classList.remove('catalog__content_active');
            }); 
            catalogPages[i].classList.add('catalog__content_active');
        }  
    }); 

    if (e.target && e.target.tagName == "DIV") {
        e.target.parentElement.classList.add('catalog__tab_active');
    } else if (e.target && e.target.tagName == "LI") {
            e.target.classList.add('catalog__tab_active'); }
});

cardsWrapper.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target && e.target.tagName == "A" && e.target.classList.contains('card-item__link')) {
        e.target.parentElement.classList.remove('card-item__main_active');
        e.target.parentElement.nextElementSibling.classList.add('card-item__details_active');

    } else if (e.target && e.target.tagName == "A" && e.target.classList.contains('card-item__back')) {
        e.target.parentElement.parentElement.classList.remove('card-item__details_active');
        e.target.parentElement.parentElement.previousElementSibling.classList.add('card-item__main_active');
    }
});

//Modals

const promoWrapper = document.querySelector('.promo'),
      overlay = document.querySelector('.overlay'),
      catalog = document.querySelector('.catalog'),
      modalConsultation = document.querySelector('#consultation'),
      modalOrder = document.querySelector('#order'),
      modalThanks = document.querySelector('#thanks'),
      btnConsultation = document.querySelector('#consultation-form').querySelector('button');

        //открывает модалку на промо
      promoWrapper.addEventListener('click', (e) => {
        if (e.target && e.target.tagName == "BUTTON") {
            overlay.style.display = 'block';
            modalConsultation.style.display = 'block'; }
        
        document.body.style.overflow = 'hidden';
      });

      //событие на кнопку заказать консультацию
/*       btnConsultation.addEventListener('click', () => {
                overlay.style.display = 'block';
                modalThanks.style.display = 'block'; 
                document.body.style.overflow = 'hidden';
        }); */

        // срабатывет на кнопке купить
      catalog.addEventListener('click', (e) => {
        if (e.target && e.target.tagName == "BUTTON") {
            modalOrder.firstElementChild.nextElementSibling.nextElementSibling.textContent = e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.nextElementSibling.textContent;
            overlay.style.display = 'block';
            modalOrder.style.display = 'block'; 
        }
        document.body.style.overflow = 'hidden';
      });


            //закрывает модалку
      overlay.addEventListener('click', (e) => { 
          if (e.target && (e.target.classList.contains('modal__close'))) {
                overlay.style.display = 'none';
                e.target.parentElement.style.display = 'none';
          } else if (e.target.classList.contains('overlay')) {
              for (let i of e.target.children) {
                overlay.style.display = 'none';
                i.style.display = 'none'; 
            }
          }
          document.body.style.overflow = '';
      });

      //modals validate

      function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    }

      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');




