var item = ""
var foods = ["pizza", "bagel", "lasagna", "ice cream"];

function log() {
    console.log("https://api.giphy.com/v1/gifs/search?q=" +
        "pie" + "&api_key=2aO9VALksWFgVwK7h4dZE49Gohfdh4gE");
    $("#buttonsView").append("fr3")
}
function displayGif() {

    var item = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        item + "&api_key=2aO9VALksWFgVwK7h4dZE49Gohfdh4gE";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        $("#gifDiv0").empty();
        $("#gifDiv1").empty();
        $("#gifDiv2").empty();
        $("#gifDiv3").empty();
        $("#gifDiv4").empty();
        $("#gifDiv5").empty();
        $("#gifDiv6").empty();
        $("#gifDiv7").empty();
        $("#gifDiv8").empty();
        $("#gifDiv9").empty();
        var foodImage = $("<img>");
        for (var i = 0; i < 10; i++) {
            var foodImage = $("<img>");
            foodImage.attr("src", response.data[i].images.fixed_height_still.url);
            foodImage.attr("data-still", response.data[i].images.fixed_height_still.url)
            foodImage.attr("data-animate", response.data[i].images.fixed_height.url)
            foodImage.attr("data-state", "still")
            foodImage.addClass("giphy")
            console.log(response)
            var rating = $("<p>");
            $(rating).text("Rating: " + response.data[i].rating)
            var gifDiv = "#gifDiv" + i;

            $(gifDiv).append(foodImage);
            $(gifDiv).append(rating);
        }

    });
}

function renderButtons() {
    $("#buttonsView").empty();
    for (var i = 0; i < foods.length; i++) {
        var a = $("<button>");
        a.addClass("item");
        a.attr("data-name", foods[i]);
        a.text(foods[i]);
        $("#buttonsView").append(a);
    }
}

$(document).ready(function () {
    renderButtons();
    $(document).on("click", ".item", displayGif);


    // renderButtons()
    $("#addFood").on("click", function (event) {
        event.preventDefault();
        var item = $("#userInput").val().trim();
        if(item != "" && (jQuery.inArray(item , foods) < 0)) // determines if value is empty or if it's already in array
        {
        foods.push(item);
        }
        renderButtons();
    });
    $(document).on("click", ".giphy", function () {
        var imageState = $(this).attr("data-state");
        if (imageState == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });
})

