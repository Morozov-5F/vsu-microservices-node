
jQuery("#topToBills").click(function (anchor) {
    $('html, body').animate({
        scrollTop: $("#billsRef").offset().top
    }, 800);
});