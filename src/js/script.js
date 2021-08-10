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
