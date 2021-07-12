// $(function() {
//     $("#button").on("click", function() {
//         $("#front").addClass("backs");
//     });

//     $("#button1").on("click", function() {
//         $("#back").addClass("fronts");
//     });
// });

$(function() {
    $("#button").on("click", function() {
        $("#front").toggleClass("backs", 1000);
    });
});