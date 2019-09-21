import '../../styles/views/home.scss';
import '../../styles/components/services.scss';
import '../../styles/components/testimonials.scss';
// import Rellax from 'rellax';
import $ from 'jquery';

$(() => {
    // const rellax = new Rellax('.rellax');

    $('.menu-toggle').click(function () {
        $('nav').toggleClass('active');
    })
    
});