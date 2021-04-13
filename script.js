var temas = ['PS1', 'PS2', 'PS3', 'PS4', 'PS5', 'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series X',
             'NES', 'SNES', "Nintendo 64", 'Gamecube', 'Wii', 'Wii U', 'Nintendo Switch', 'SEGA Genesis',
             "SEGA Dreamcast"];
var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=pijm5yVUARZfTZumrMwZob6s9a996b2d";

$(document).ready(function() {
    for (var i = 0; i < temas.length ; i++){
        $("#animal-buttons").append("<button id= " + "ButtonTheme>" + temas[i] + "</button>");
    }
});

$("#add-animal").on("click", function(event) {
    event.preventDefault();
    if (!temas.includes($("#animal-input").val()) && $("#animal-input").val() != "" ){
        $("#animal-buttons").append("<button id= " + "ButtonTheme>" +  $("#animal-input").val() + " </button>");
    }
    if ($("#animal-input").val() != "" ){
        $("#animals").html("");
        temas.push($("#animal-input").val());
        var url = api + "&q=" + $("#animal-input").val() + apiKey + "&limit=10";
        $.get(url, function(giphy){
            for (var i = 0; i < giphy.data.length; i++){
                $("#animals").append('<div class= "animal-item">' + 
                                    "<p> " + "rating: " + giphy.data[i].rating + "</p>" +
                                     "<img src= " + giphy.data[i].images.fixed_height_still.url +
                                     " static_url= " + giphy.data[i].images.fixed_height_still.url +
                                     " moving_url= " + giphy.data[i].images.fixed_height.url
                                      + " id=" + '"imgGiphy"' + ">"
                                      + "</div>");
            }
        });
    }
});

$(document).on("click", "#imgGiphy", function(event) {
    if ($(this).attr("moving_url") == $(this).attr("src")){
        var staticUrl = $(this).attr("static_url");
        $(this).attr("src", staticUrl);
    }
    else{
        var moving = $(this).attr("moving_url");
        $(this).attr("src", moving);
    }
});


$(document).on("click", "#ButtonTheme", function(event) {
    event.preventDefault();
    $("#animals").html("");
    var url = api + "&q=" + $(this).text() + apiKey + "&limit=10";
    $.get(url, function(giphy){
        for (var i = 0; i < giphy.data.length; i++){
            $("#animals").append('<div class= "animal-item">' + 
                                "<p> " + "rating: " + giphy.data[i].rating + "</p>" +
                                "<img src= " + giphy.data[i].images.fixed_height_still.url +
                                " static_url= " + giphy.data[i].images.fixed_height_still.url +
                                " moving_url= " + giphy.data[i].images.fixed_height.url
                                + " id=" + '"imgGiphy"' + ">"
                                + "</div>");
        }
    });
});
