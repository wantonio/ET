




//Read More Script
$().ready(function () {
    $('.wanttoReadMore').click(function () {
        $(this).siblings('.knowVersionMoreDesc').slideToggle('slow');
        $(this).siblings('.wanttoReadMore').css("display", "block")
        $(this).css("display", "none")
    });
})