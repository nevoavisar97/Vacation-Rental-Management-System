$(document).ready(function () {

    var orderDiv = $('.order-container');
    var update_pop = $('.update-popup');
    var overlay = $('.overlay');
    var closeBtn = $('.close-btn');

    orderDiv.hide();
    update_pop.hide();
    overlay.hide();

    closeBtn.click(function () {
        update_pop.hide();
        ord_pop.hide();
        overlay.hide();
    });

    let logged = sessionStorage['logged'];
    if (logged != null) {
        $(".signup").html("Log Out");
        $(".signup").click(function () {
            alert("You have successfully logged out of the system.");
            sessionStorage.clear();
            window.location.reload();
        });
        

        $('.Nav').append('<span class="editProfile" href="">Edit Profile</span>');
        closeBtn.click(function () {
            update_pop.hide();
            overlay.hide();
        });
        $(".editProfile").click(function () {
            var logged = sessionStorage['logged'];
            if (logged != null) {
                overlay.show();
                update_pop.show();
            }
        });
    }
    else {
        $(".signup").html("Log in / Sign up");
        $(".signup").attr("href", 'signIn.html');
    }
    $('.editProfile').on('click', function () {
        //const api = "https://localhost:7076/api/User/" + sessionStorage["logged"];
        const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/User/" + sessionStorage["logged"];
        ajaxCall("GET", api, "", successCBa, errorCB);
    });
    function successCBa(data) {
        $('.full-name2').val(data.fullName);
        $('.country2').val(data.country);
        $('.email2').val(data.email);
        $('.password2').val(data.password);
        $('.phone2').val(data.phoneNumber);
    }

    $('.update').submit(function (event) {
        event.preventDefault();
        SubmitUpdate();
    });

    $('#showOrders').click(function () {
        var logged = sessionStorage['logged'];
        if (logged != null) {
            //const api = "https://localhost:7076/api/Orders/" + sessionStorage["logged"];
            const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/Orders/" + sessionStorage["logged"];
            ajaxCall("GET", api, "", successCBS, errorCB);
        }
        else alert("Oops! You need to be logged in to access this feature. Please log in or create an account to continue.");
    });

    function successCBS(data) {
        orderDiv.show();
        var OrdArr = data;
        if (OrdArr.length == 0) {
            $('#opening').html('No upcoming orders');
            return;
        }
        else {
            $('#opening').hide();
            let container = $('.order-container');
            let flatName;
            let flatImg;
            for (var i = 0; i < OrdArr.length; i++) {
                let card = $('<div>').addClass('order-card');
                for (var j = 0; j < Arr.length; j++) {
                    if (Arr[j]["id"] == OrdArr[i].flatId) {
                        flatImg = Arr[j]["picture_url"];
                        flatName = Arr[j]["name"];
                        console.log(flatName);
                        break;
                    }
                }
                let img = $('<img>').attr('src', flatImg);
                let newDiv = $('<div>');
                let heading = $('<h3>').text('Order ID: ' + OrdArr[i].id);
                let p1 = $('<p>').text('Flat ID: ' + OrdArr[i].flatId);
                let p2 = $('<p>').text('Flat Name: ' + flatName);
                let p3 = $('<p>').text('Start Date:: ' + OrdArr[i].startDate);
                let p4 = $('<p>').text('End Date:: ' + OrdArr[i].endDate);

                card.append(img);
                newDiv.append(heading);
                newDiv.append(p1);
                newDiv.append(p2);
                newDiv.append(p3);
                newDiv.append(p4);
                card.append(newDiv);
                container.append(card);

            }
            
        }

    }


});
function SubmitUpdate() {
    user = {
        fullName: $('.full-name2').val(),
        country: $('.country2').val(),
        email: $('.email2').val(),
        password: $('.password2').val(),
        phoneNumber: $('.phone2').val()
    }
    //const api = "https://localhost:7076/api/User/" + sessionStorage['logged'];
    const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/User/" + sessionStorage['logged'];
    ajaxCall("PUT", api, JSON.stringify(user), successCBb, errorCB);
    return false;
}

function successCBb(data) {
    if (data == true) alert("Changes saved. Your profile has been successfully updated.");
    else alert("Error updating your profile. You might entered an email that already registered, Please try again and ensure all fields are filled correctly.");
    $('.update-popup').hide();
    $(".overlay").hide();
}
function errorCB(response) {
    alert("Sorry, we could not complete your request because the server connection might have been lost or the data was undefined.");
}


