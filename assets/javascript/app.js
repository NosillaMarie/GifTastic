var actors = ["Emma Stone", "Bill Murray", "Jennifer Lawrence", "Al Pacino", "Johnny Depp", "Robert Redford", "Emma Watson", "Nicholas Cage", "Harrison Ford", "Morgan Freeman", "Anna Kendrick", "Chris Rock", "Mr. T", "Elizabeth Banks", "Adam Sandler", "Jim Carrey", "Jude Law", "John Travolta", "Tom Cruise", "Julianne Moore", "Jim Gaffigan", "Aubrey Plaza"];

var numResults = 0;
var queryURL = "";
var actor = $(this).attr("data-name");
var apiKey = "586d2988a81544979263f48629a82e5e";
var queryURLStarter = "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey;

var giphyCounter = 0;

//    "&limit=10";

function displayGiphy(numGIPHY, queryURL) {

    //AJAX call for grabbing GIPHY  
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function (response) {

            for (var j = 0; j < response.data.length; j++) {
                console.log(response.data[j]);

                //        console.log(queryURL);
                //        console.log(numGIPHY);

                //create a div that will hold actor name from input
                var holdActor = $("<div>");
                //        var idGif = 

                //retreives the rating for the GIF
                $("<h3>").text(response.data[j].rating).appendTo(holdActor);
                console.log(response.data[j].rating);
                //        add still & animated image link
                $("<img>").attr({
                    "src": response.data[j].images.fixed_height_still.url,
                    "data-still": response.data[j].images.fixed_height_still.url,
                    "data-animate": response.data[j].images.fixed_height.url,
                    "data-state": "still",
                    "class": "giphy col-md-4"
                }).appendTo(holdActor);

                $("#actors-view").append(holdActor);
            }
                $(".giphy").on("click", function() {
            
    var imgState = $(this).attr("data-state");
    
    console.log(this);
    
    if (imgState === "still") {
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
        });
}

function createButtons() {

    //delets movies before adding new movies so the buttons do not repeat.
    $('#buttons-view').empty();

    //loop through the the actor array

    for (var i = 0; i < actors.length; i++) {

        //dynamically create buttons 
        var actorBtn = $("<button>");

        actorBtn.addClass("actor");

        actorBtn.attr("data-name", actors[i]);

        actorBtn.text(actors[i]);

        $("#buttons-view").append(actorBtn);
    }
    //    consle.log(actors);
}


$(function () {

    //when the add movie button is clicked...
    $("#add-actor").on("click", function (event) {
        event.preventDefault();
        //grab text from text box
        var actor = $("#actor-input").val().trim();
        //push the actor name to the established array
        actors.push(actor);
        //render the buttons and process movie array

        createButtons();

    });
    //click event listener for all buttons with a class of actor
    //$(document).on("click", ".actor", displayGiphy);

    //calling the create buttons function to build the initial buttons.
    createButtons();

    $(".actor").on("click", function () {

        var newURL = queryURLStarter + "&q=" + $(this).attr("data-name") + "&limit=10";

        numResults = $("#numGifs").val();

        displayGiphy(10, newURL);

    });

})


