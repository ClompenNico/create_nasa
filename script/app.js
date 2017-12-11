'use strict';

/**
 * Created by Nico on 8/12/2017.
 */

var url = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";



//Buttons

var key = "n66hQKbxKwYOwiMTOmKzYrh2RNYBr9oRDlxXWssE";

var x = 1;

var today = new Date.today();
showPicture(today.add(1).day());

var dateGlobal = today;

function prevPhoto()
{
    console.log("prev")
    var prev = (x).days().ago();
    showPicture(prev);
    x = x + 1;
}

function nextPhoto()
{
    console.log("next")
    var next = dateGlobal.add(1).day();
    showPicture(next);
    x = x + 1;
}

//Tekst login of create account

function ShowLogin(y) {
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
}

// ------------ JAVASCRIPT VAN NASA VOOR DE AFBEELDING -------------------
function showPicture(value) {
    // Toggle voor formulier
    var valueSlice = value.toISOString().slice(0,10);
    var url = "https://api.nasa.gov/planetary/apod?api_key="+key+"&date="+valueSlice;
    $.ajax({
        url: url,
        success: function(result){
            if("copyright" in result) {
                $("#copyright").text("Image Credits: " + result.copyright);
            }
            else {
                $("#copyright").text("Image Credits: " + "Public Domain");
            }

            $("#apod_vid_id").css("display", "none");
            $("#apod_img_id").css("display", "none");
            $(".container").css("display", "none");
            $(".video_container").css("display", "none");


            if(result.media_type == "video") {
                $(".video_container").css("display", "block");
                $("#apod_vid_id").css("display", "block");
                $("#apod_vid_id").attr("src", result.url);
                $(".video_container").css("height", "600px");
                $('.video_container').addClass('is-visible');
            }
            else {
                $(".container").css("display", "block");
                $("#apod_img_id").css("display", "block");
                $("#apod_img_id").attr("src", result.url);
                $('.container').addClass('is-visible');
            }

            // console.info(JSON.stringify(result, null, 4));
            $("#apod_explaination").text(result.explanation);
            $("#apod_title").text(result.title);
            $("#apod_title_mainpage").text(result.title);
            $("#apod_date").text(result.date);

            if(result.date == today.toISOString().slice(0,10)){
                $("#next").css("display", "none");
            }
            else{
                $("#next").css("display", "inline-block");
            }

        }

    });
    dateGlobal = value;
}
