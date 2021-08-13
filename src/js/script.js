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

            if (i == (+e.target.getAttribute('id') - 1)) {
            catalogPages.forEach(item => {
                item.classList.remove('catalog__content_active');
            }); 
            catalogPages[i].classList.add('catalog__content_active');
            }  
    }); 

    if (e.target && e.target.tagName == "DIV") {
        e.target.parentElement.classList.add('catalog__tab_active');
        } 
    else if (e.target && e.target.tagName == "LI") {
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


