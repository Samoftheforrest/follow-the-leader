let bootstrap = require("bootstrap");
let $ = require( "jquery" );

$(document).ready(function() {
    $('p').click(function() {
        $(this).css("color", "red");
    })
})