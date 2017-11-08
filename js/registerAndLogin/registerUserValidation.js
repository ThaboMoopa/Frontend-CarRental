var URLlink = "http://localhost:8080";
function validateEmail(email) {
    var matchingEmails = null;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: URLlink + "/user/findByName?",
        data: "email=" + email,
        async: false,
        success: function(response)
        {
            console.log(response);
            matchingEmails = response.name;
           // $("#successMessage3").html(matchingEmails + " its empty 3");

        }

    });

    console.log(matchingEmails);
    if(email === matchingEmails)
    {
        $("#errorEmail").html("The email address already exists, please try again");
        $("#txtEmail").click(function(){
            $("#errorEmail").fadeOut('slow');
        });
        event.preventDefault();
        return false;
    }
    else if (email === "") {
        $("#errorEmail").text("Please enter a email.").show();

        //fade out the error text when the user clicks on the textbox
        $("#txtEmail").click(function () {
            $("#errorEmail").fadeOut('slow');
        });

        //prevent the form from being submitted if there is an error
        event.preventDefault();
        return false;
    }
    else if (/[^a-zA-Z]/.test(name)) {
        $("#errorEmail").text("Only alphabetic characters allowed in the field.").show();
        //++errorInput;

        //fade out the error text when the user clicks on the textbox
        $("#txtEmail").click(function () {
            $("#errorEmail").fadeOut('slow');
        });
        return false;

        //prevent the form from being submitted if there is an error
        event.preventDefault();
    }
    else if(validEmail(email) === false) {
        $("#errorEmail").text("Email is invalid! Please try again.").show();
        //++errorInput;
        //fade out the error text when the user clicks on the textbox
        $("#txtEmail").click(function () {
            $("#errorEmail").fadeOut('slow');
        });
    }
    else
        return email;

    function validEmail(eEmail)
    {
        var filter = /^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/;
        if(filter.test(eEmail))
            return true;
        else
            return false;
    }
}

function validateSurname(surname) {
    if (surname === "") {
        $("#errorSurname").text("Please enter a Surname.").show();

        //fade out the error text when the user clicks on the textbox
        $("#txtSurname").click(function () {
            $("#errorSurname").fadeOut('slow');
        });

        //prevent the form from being submitted if there is an error
        event.preventDefault();
        return false;
    }
    else if (/[^a-zA-Z-, ]/.test(surname)) {
        $("#errorSurname").text("Only alphabetic characters allowed in the field.").show();
        //++errorInput;

        //fade out the error text when the user clicks on the textbox
        $("#txtSurname").click(function () {
            $("#errorSurname").fadeOut('slow');
        });
        return false;

        //prevent the form from being submitted if there is an error
        event.preventDefault();
    }
    else
        return surname;
}

function validatePassword(password) {
    if (password === "") {
        $("#errorPassword").text("Please enter a password.").show();

        //fade out the error text when the user clicks on the textbox
        $("#txtPassword").click(function () {
            $("#errorPassword").fadeOut('slow');
        });

        //prevent the form from being submitted if there is an error
        event.preventDefault();
        return false;
    }
    else if (/[^a-zA-Z0-9-.,]/.test(password)) {
        $("#errorPassword").text("Only alphabetic characters allowed in the field.").show();
        //++errorInput;

        //fade out the error text when the user clicks on the textbox
        $("#txtPassword").click(function () {
            $("#errorPassword").fadeOut('slow');
        });
        return false;

        //prevent the form from being submitted if there is an error
        event.preventDefault();
    }
    else if(password.length <6)
    {
        $("#errorPassword").text("Password is too short, length of password must be greater than 6 characters.").show();
        //++errorInput;
        //fade out the error text when the user clicks on the textbox
        $("#txtPassword").click(function(){
            $("#errorPassword").fadeOut('slow');
        });
        return false;

        //prevent the form from being submitted if there is an error
        event.preventDefault();
    }
    else
        return password;
}
function validateConfirmPassword(confirmPassword)
{

    if($("#txtConfirm").val() === ""){
        $("#errorConfirmPassword").text("Please enter a confirm password.").show();
        //++errorInput;
        //fade out the error text when the user clicks on the textbox
        $("#txtConfirm").click(function(){
            $("#errorConfirmPassword").fadeOut('slow');
        });

        //prevent the form from being submitted if there is an error
        event.preventDefault();
        return false;
    }
    else
    {
        //$("#txtConfirm").text('<img src="images/correct.svg"').show();
        return confirmPassword;
    }
}
//---------------validate compare password---------------------------//
function comparePasswordValid(password, confirmPassword)
{
    if($("#txtPassword").val() !== $("#txtConfirm").val())
    {
        $("#errorConfirmPassword").text("Password does not match.").show();
        //++errorInput;
        //fade out the error text when the user clicks on the textbox
        $("#txtConfirm").click(function(){
            $("#errorConfirmPassword").fadeOut('slow');
        });

        //prevent the form from being submitted if there is an error
        event.preventDefault();
        return false;
    }
    else
        return true;
}

function validate() {

    var name = validateEmail($("#txtEmail").val());
    var surname = validateSurname($("#txtSurname").val());
    var password = validatePassword($("#txtPassword").val());
    var role = "user";
    var confirmPassword = validatePassword($("#txtConfirm").val());
    var comparePassword = comparePasswordValid(password,confirmPassword);

    var hash = CryptoJS.MD5(password);

    var registerData = "name="+name+"&surname="+surname+"&password="+hash+"&role="+role;

    if (name == false || surname == false || password == false || comparePassword == false) {
    event.preventDefault();
        return;
    }
    else {
       $.ajax({
                type: "POST",
                dataType: "json",
                url: URLlink + "/user/addUser?",
                data: registerData,
                async: false,
                success: function (response) {
                    location.href = "homepage.html";
                }

            });
        event.preventDefault();

    }
}