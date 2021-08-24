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
        e.target.parentElement.classList.remove('card-item__details_active');
        e.target.parentElement.previousElementSibling.classList.add('card-item__main_active');
    }
});

//Modals

const promoWrapper = document.querySelector('.promo'),
      overlay = document.querySelector('.overlay'),
      catalog = document.querySelector('.catalog'),
      modalConsultation = document.querySelector('#consultation'),
      modalOrder = document.querySelector('#order'),
      modalThanks = document.querySelector('#thanks');

      function showModal(modal) {
            overlay.classList.add('show');
            modal.classList.add('show');       
      }

      function closeModal(modal) {
            overlay.classList.remove('show');
            modal.classList.remove('show');
      }
      
        //открывает модалку на промо
      promoWrapper.addEventListener('click', (e) => {
        if (e.target && e.target.tagName == "BUTTON") {
            showModal(modalConsultation); 
        }
      });

        // срабатывет на кнопке купить
      catalog.addEventListener('click', (e) => {
        if (e.target && e.target.tagName == "BUTTON") {
            modalOrder.firstElementChild.nextElementSibling.nextElementSibling.textContent = e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.nextElementSibling.textContent;
            showModal(modalOrder); 
        }
      });

            //закрывает модалку
    overlay.addEventListener('click', (e) => { 
         if (e.target && (e.target === overlay || e.target.classList.contains('modal__close'))) { 
            closeModal(modalThanks);
            closeModal(modalOrder);
            closeModal(modalConsultation);
         }
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

    //mask input
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // отправка форм

    const forms = document.querySelectorAll('.feed-form');

    forms.forEach(form => {
        postData(form);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            let resultTest = false;

            for(let [name, value] of formData) {
                   if (value != '') {
                       resultTest = true;
                   } else {
                       resultTest = false;
                   }
            }

            if (resultTest == true) {
                    fetch('mailer/smart.php', {
                        method: 'POST',
                        body: formData
                    }).then(data => {
                        showModal(modalThanks);
                        modalOrder.style.display = 'none';
                        modalConsultation.style.display = 'none';
            
                        let modalClose = setTimeout(function() {
                            closeModal(modalThanks);
                        }, 3000);
                    }).catch(() => {

                    }).finally(() => {
                        form.reset();
                    });
                }
            });    
    }

    //scroll
    const upBtn = document.querySelector('.up-btn');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset >= 1100) {
            upBtn.style.visibility = 'visible';
            upBtn.style.opacity = '1';
        }   else {
            upBtn.style.visibility = 'hidden';
            upBtn.style.opacity = '0';
        }
    });

    upBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const blockID = upBtn.getAttribute('href');

        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });




