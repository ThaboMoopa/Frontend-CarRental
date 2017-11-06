/**
 * Created by thabomoopa on 01/11/2017.
 */
$(document).ready(function(){
var URLlink = "http://localhost:8080";
var info;

//variable to hold the array of href links


var rentID = [];
var rentDate = [];
var rentReturnDate = [];
var rentTotalAmount = [];
var carMake = [];
var carModel = [];
var carYear = [];
var carPlate = [];

//var rentRecord = [];
//var carRecord = [];
//var print = [rentRecord, carRecord];

//ajax function to retrieve the categories from the database

    $.ajax({
        type: "GET",
        dataType: "json",
        url: URLlink + "/rent/findAllRentedCars?",
        //data: name,
        async: false,
        success: function (rent) {
            $("#table tbody").empty();
            $.each(rent, function(key, value) {
                //console.log(value.car);
                //rentRecord.push( ,,);
                rentID.push(value.id);
                rentDate.push(value.rentDate);
                rentReturnDate.push(value.returntDate);
                rentTotalAmount.push(value.totalPrice);
                carMake.push(value.car.make);
                carModel.push(value.car.model);
                carYear.push(value.car.year);
                carPlate.push(value.car.numberPlate);

            });
        }
    });





    for (var i = 0; i < rentID.length; i++) {

        var htmlData = '';
        htmlData += '<tr>';
        htmlData += '<td>' + rentID[i] + '</td>';
        htmlData += '<td>' + rentDate[i] + '</td>';
        htmlData += '<td>' + rentReturnDate[i] + '</td>';
        htmlData += '<td>' + carMake[i] + '</td>';
        htmlData += '<td>' + carModel[i] + '</td>';
        htmlData += '<td>' + carYear[i] + '</td>';
        htmlData += '<td>' + carPlate[i] + '</td>';
        htmlData += '<td>' + rentTotalAmount[i] + '</td>';
        htmlData += '</tr>';
        $("#table tbody").append(htmlData);
    }


});
//find the rentals by the customer email
$(document).ready(function(){
    var URLlink = "http://localhost:8080";
    var info;

//variable to hold the array of href links


    var rentID = [];
    var rentDate = [];
    var rentReturnDate = [];
    var rentTotalAmount = [];
    var carMake = [];
    var carModel = [];
    var carYear = [];
    var carPlate = [];
    $("a#searchByEmail").click(function(){

        var email = validateEmail($("#txtSearchByEmail").val());

        function validateEmail(email)
        {
            if(email == '')
            {
                $("#errorSearchByEmail").text("Please enter an email address").show();

                //fade out the error text when the user clicks on the textbox
                $("#txtSearchByEmail").click(function () {
                    $("#errorSearchByEmail").fadeOut('slow');
                });

                //prevent the form from being submitted if there is an error
                event.preventDefault();
                return false;
            }
            else if(validEmail(email) === false) {
                $("#errorSearchByEmail").text("Email is invalid! Please try again.").show();
                //++errorInput;
                //fade out the error text when the user clicks on the textbox
                $("#txtSearchByEmail").click(function () {
                    $("#errorSearchByEmail").fadeOut('slow');
                });
            }
            else
                return email;

        }
        function validEmail(eEmail)
        {
            var filter = /^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/;
            if(filter.test(eEmail))
                return true;
            else
                return false;
        }


        if(email == false)
        {
            alert("email is wrong");
        }
        else
        {

            $.ajax({
                type: "GET",
                dataType: "json",
                url: URLlink + "/rent/findAllRentedCars?",
                //data: name,
                async: false,
                success: function (rent) {
                    $("#table tbody").empty();
                    $.each(rent, function(key, value){
                        if(value.order.customer.email == email)
                        {


                            rentID.push(value.id);
                            console.log(value.id);
                            rentDate.push(value.rentDate);
                            rentReturnDate.push(value.returntDate);
                            rentTotalAmount.push(value.totalPrice);
                            carMake.push(value.car.make);
                            carModel.push(value.car.model);
                            carYear.push(value.car.year);
                            carPlate.push(value.car.numberPlate);


                        }
                        else
                            $('#errorPage').html('<div class="alert alert-danger" role="alert">Email not found. Please try again!</div>');

                    });

                }
            });
           //
        }

        for (var i = 0; i < rentID.length; i++) {

            var htmlData = '';
            htmlData += '<tr>';
            htmlData += '<td>' + rentID[i] + '</td>';
            htmlData += '<td>' + rentDate[i] + '</td>';
            htmlData += '<td>' + rentReturnDate[i] + '</td>';
            htmlData += '<td>' + carMake[i] + '</td>';
            htmlData += '<td>' + carModel[i] + '</td>';
            htmlData += '<td>' + carYear[i] + '</td>';
            htmlData += '<td>' + carPlate[i] + '</td>';
            htmlData += '<td>' + rentTotalAmount[i] + '</td>';
            htmlData += '</tr>';
            $("#table tbody").append(htmlData);
        }
        event.preventDefault();
    });
});

//find the rentals by rent date
$(document).ready(function(){
    var URLlink = "http://localhost:8080";
    var info;

//variable to hold the array of href links


    var rentID = [];
    var rentDate = [];
    var rentReturnDate = [];
    var rentTotalAmount = [];
    var carMake = [];
    var carModel = [];
    var carYear = [];
    var carPlate = [];

    $("a#searchByDate").click(function(){

        var month = validateMonth($("#txtSearchMonth").val());
        var day = validateDay($("#txtSearchDay").val());
        var year = validateYear($("#txtSearchYear").val());

        function validateMonth(month)
        {
            if(month == '')
            {
                $("#errorDate").text("Please enter a month").show();

                //fade out the error text when the user clicks on the textbox
                $("#txtSearchMonth").click(function () {
                    $("#errorDate").fadeOut('slow');
                });

                //prevent the form from being submitted if there is an error
                event.preventDefault();
                return false;
            }
            else if (/[^0-9]/.test(month)) {
                $("#errorDate").text("Only numeric characters are allowed in the field.").show();
                //++errorInput;

                //fade out the error text when the user clicks on the textbox
                $("#txtSearchMonth").click(function () {
                    $("#errorDate").fadeOut('slow');
                });
                return false;

                //prevent the form from being submitted if there is an error
                event.preventDefault();
            }
            else if (month > 12 || month < 1) {
                $("#errorDate").text("You month range from 1 to 12.").show();
                //++errorInput;

                //fade out the error text when the user clicks on the textbox
                $("#txtSearchMonth").click(function () {
                    $("#errorDate").fadeOut('slow');
                });
                return false;

                //prevent the form from being submitted if there is an error
                event.preventDefault();
            }
            else
                return month;
        }
        function validateDay(day)
        {
            if(day == '')
            {
                $("#errorDate").text("Please enter a day").show();

                //fade out the error text when the user clicks on the textbox
                $("#txtSearchDay").click(function () {
                    $("#errorDate").fadeOut('slow');
                });

                //prevent the form from being submitted if there is an error
                event.preventDefault();
                return false;
            }
            else if (/[^0-9]/.test(day)) {
                $("#errorDate").text("Only numeric characters are allowed in the field.").show();
                //++errorInput;

                //fade out the error text when the user clicks on the textbox
                $("#txtSearchDay").click(function () {
                    $("#errorDate").fadeOut('slow');
                });
                return false;

                //prevent the form from being submitted if there is an error
                event.preventDefault();
            }
            else if (day > 31 || day < 1) {
                $("#errorDate").text("You days range from 1 to 12.").show();
                //++errorInput;

                //fade out the error text when the user clicks on the textbox
                $("#txtSearchDay").click(function () {
                    $("#errorDate").fadeOut('slow');
                });
                return false;

                //prevent the form from being submitted if there is an error
                event.preventDefault();
            }
            else
                return day;
        }
        function validateYear(year)
        {
            if(year == '')
            {
                $("#errorDate").text("Please enter a year").show();

                //fade out the error text when the user clicks on the textbox
                $("#txtSearchYear").click(function () {
                    $("#errorDate").fadeOut('slow');
                });

                //prevent the form from being submitted if there is an error
                event.preventDefault();
                return false;
            }
            else if (year > 2033 || year < 1999) {
                $("#errorDate").text("You year range from 1999 to 2033.").show();
                //++errorInput;

                //fade out the error text when the user clicks on the textbox
                $("#txtSearchYear").click(function () {
                    $("#errorDate").fadeOut('slow');
                });
                return false;

                //prevent the form from being submitted if there is an error
                event.preventDefault();
            }
            else
                return year;
        }

        if(month == false || day==false || year == false)
        {
           // $("#errorForm").text("Your date is incorrect. Please try again.");
            event.preventDefault();
            return;
        }
        else
        {
            var searchDate = month + "/" + day + "/" + year;
            console.log(searchDate);
            $.ajax({
                type: "GET",
                dataType: "json",
                url: URLlink + "/rent/findAllRentedCars?",
                //data: name,
                async: false,
                success: function (rent) {
                    $.each(rent, function(key, value){
                        if(value.rentDate == searchDate)
                        {

                            $("#table tbody").empty();
                            rentID.push(value.id);
                            console.log(value.id);
                            rentDate.push(value.rentDate);
                            rentReturnDate.push(value.returntDate);
                            rentTotalAmount.push(value.totalPrice);
                            carMake.push(value.car.make);
                            carModel.push(value.car.model);
                            carYear.push(value.car.year);
                            carPlate.push(value.car.numberPlate);
                        }
                        else
                            $('#errorPage').html('<div class="alert alert-danger" role="alert">Date not found</div>');
                    });

                }
            });
        }

        for (var i = 0; i < rentID.length; i++) {

            var htmlData = '';
            htmlData += '<tr>';
            htmlData += '<td>' + rentID[i] + '</td>';
            htmlData += '<td>' + rentDate[i] + '</td>';
            htmlData += '<td>' + rentReturnDate[i] + '</td>';
            htmlData += '<td>' + carMake[i] + '</td>';
            htmlData += '<td>' + carModel[i] + '</td>';
            htmlData += '<td>' + carYear[i] + '</td>';
            htmlData += '<td>' + carPlate[i] + '</td>';
            htmlData += '<td>' + rentTotalAmount[i] + '</td>';
            htmlData += '</tr>';
            $("#table tbody").append(htmlData);
        }
        event.preventDefault();
    });
});