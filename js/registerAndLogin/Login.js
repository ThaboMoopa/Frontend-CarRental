$(document).ready(function() {
    $("#txtEmail").fadeIn(1000);
    var URLlink = "http://localhost:8080";
    //load data to the user table
    var name = "admin@vehicleRental.com";
    var email = '';

    var hash = CryptoJS.MD5("admin123");
    $.ajax({
        type: "GET",
        dataType: "json",
        url: URLlink + "/user/findByName?",
        data: "email=admin@vehicleRental.com",
        async: false,
        success: function (response) {
            console.log(response);
            email = response.name;
        }
    });

    if (email == name) {
        //alert("the user already exists");
        event.preventDefault();
        return;
    }
    else
        $.ajax({
            type: "POST",
            dataType: "json",
            url: URLlink + "/user/addUser?",
            data: "name=admin@vehicleRental.com&surname=admin&password="+hash+"&role=admin",
            async: false,
            success: function (response) {
                console.log("added new");
                event.preventDefault();
            }

        });




});



//$(document).ready(function(){


//});