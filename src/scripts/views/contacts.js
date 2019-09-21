import '../../styles/components/contacts.scss';
import $ from 'jquery';
import alertify from 'alertifyjs';

$(() => {
    $(document).ready(() => {
        $('.contact-form').submit(function (e){
            e.preventDefault();
            let name = $('#name').val();
            let email = $('#email').val();
            let message = $('#message').val();
                $.ajax({
                    url: 'https://formspree.io/test-example@abv.bg',
                    method: 'POST',
                    data: {
                        name,
                        _replyto: email,
                        email,
                        message,
                        _subject: 'My form Submission'
                    },
                    dataType: "json",
                    success: function() {
                        console.log('success');
                    }
                })
                $('.contact-form')[0].reset();
                // debugger
                alertify.success('Message was sent');
        })
    });
    window.onscroll = function() {scrollFunction()};
    $('#myBtn').click(() => {
        topFunction();
    });
})


function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    $("#myBtn").show();
  } else {
    $("#myBtn").hide();
  }
}

function topFunction() {
  $('html, body').animate(
   {scrollTop:0}, "slow");
}