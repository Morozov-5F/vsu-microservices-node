
jQuery("#topToPolls").click(function (anchor) {
    $('html, body').animate({
        scrollTop: $("#pollsRef").offset().top
    }, 800);
});