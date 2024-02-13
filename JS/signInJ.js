$(document).ready(function () {

    let logged = sessionStorage['logged'];
    if (logged != null) {
        $(".signup").html("Log Out");
        $(".signup").click(function () {
            alert("You have successfully logged out of the system.");
            sessionStorage.clear();
            window.location.reload();
        });
        
    }
    else {
        $(".signup").html("Log in / Sign up");
        $(".signup").attr("href", 'signIn.html');
    }
        $('#sign').submit(SubmitSign);
        $('#log').submit(Submit2Server1);
});
function SubmitSign() {
    var logged = sessionStorage['logged'];
    if (logged != null) {
        alert("You are currently logged in to your account.");
    }
    else {
        user = {
            fullName: $('#id1').val(),
            country: $('#country1').val(),
            email: $('#email1').val(),
            password: $('#password1').val(),
            phoneNumber: $('#tel1').val()
        }
        console.log(user);
        //const api = "https://localhost:7076/api/User";
        const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/User";
        ajaxCall("POST", api, JSON.stringify(user), successCB, errorCB);
        return false;
    }
    function successCB(data) {
        console.log(data);
        if (data > 0) {
            sessionStorage.setItem('logged', data);
            alert("Registration successful! You are now logged in to your account.");
            $(window.location).attr('href', 'index.html');
        }
        else alert("Registration failed. The email address you provided already exists in our database. Please use a different email address or try logging in if you already have an account.");

    }
    function errorCB(err) {
        alert("Sorry, we could not complete your request because the server connection might have been lost or the data was undefined.");
    }
}

function Submit2Server1() {
    var logged = sessionStorage['logged'];
    if (logged != null) {
        alert("You are currently logged in to your account");
    }
    else {
        let val = $('#email').val().split("@");
        $('#email').val('');
        //const api = "https://localhost:7076/api/User/UserLogIn/" + val[0] + "%40" + val[1] + "/" + $('#password').val();
        const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/User/UserLogIn/" + val[0] + "%40" + val[1] + "/" + $('#password').val();
        $('#password').val('');
        ajaxCall("POST", api, { email: val[0] + "@" + val[1], password: $('#password').val() }, successCB, errorCB);

        return false;
    }
    function successCB(user) {
        sessionStorage['logged'] = user.id;
        alert("You have successfully logged in");
        $(window.location).attr('href', 'index.html');

    }

    function errorCB(err) {
        if (err.status === 500) {
            alert("Error: " + err.responseText);
        } else {
            alert("Sorry, we could not complete your request because the server connection might have been lost or the data was undefined.");
        }
        clearForm1();
    }

    function clearForm1() {
        $('#email').val('');
        $('#password').val('');
    }
}