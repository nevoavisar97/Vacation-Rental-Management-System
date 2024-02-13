$(document).ready(function () {

    var update_pop = $('.update-popup');
    var ord_pop = $('.order-popup');
    var log_pop = $('.login-popup');
    var overlay = $('.overlay');
    var closeBtn = $('.close-btn');

    update_pop.hide();
    ord_pop.hide();
    log_pop.hide();
    ord_pop.hide();
    overlay.hide();

    closeBtn.click(function () {
        update_pop.hide();
        ord_pop.hide();
        log_pop.hide();
        overlay.hide();
    });

    /////////////////////////////////////////////////DATE PICKER////////////////////////////////////////////////////////

    const checkIn = document.getElementById("start");
    const checkOut = document.getElementById("end");

    // Set the minimum check-in and check-out dates to today's date
    const today = new Date().toISOString().split("T")[0];
    checkIn.setAttribute("min", today);
    checkOut.setAttribute("min", today);

    checkIn.addEventListener("change", (event) => {
        const checkInDate = new Date(event.target.value);
        const minCheckOutDate = new Date(checkInDate);
        minCheckOutDate.setDate(minCheckOutDate.getDate() + 1);
        checkOut.setAttribute("min", minCheckOutDate.toISOString().split("T")[0]);
    });

    //checkOut.addEventListener("change", (event) => {
    //    const checkOutDate = new Date(event.target.value);
    //    const checkInDate = new Date(checkIn.value);
    //}); 

////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $('.order').submit(SubmitOrder);
    $('.loginF').submit(SubmitLog);

    function SubmitOrder() {
        let order = {
            startDate: document.getElementById("start").value,
            endDate: document.getElementById("end").value,
            userId: sessionStorage['logged'],
            flatId: sessionStorage['ordered']
        }
        //const api = "https://localhost:7076/api/Orders/";
        const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/Orders/";
        ajaxCall("POST", api, JSON.stringify(order), successCBO, errorCBa);
        return false;
    }

    function successCBO(data) {
        if (data == true) {
            alert("Congratulations! Your apartment has been booked for the selected dates.");
            ord_pop.hide();
            overlay.hide();

        }
        else alert("Sorry, we cannot process your booking request. The apartment may already be booked for the selected dates or the booking duration exceeds the limit of 10 nights.");
    }

    let logged = sessionStorage['logged'];
    if (logged != null) {
        $(".signup").html("Log Out");
        $(".signup").click(function () {
            alert("You have successfully logged out of the system.");
            sessionStorage.clear();
            window.location.reload();
        });
        
        $('.Nav').append('<span class="editProfile" href="">Edit Profile</span>');

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
        const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/User/"+ sessionStorage["logged"];
        ajaxCall("GET", api, "", successCBa, errorCBa);
    });
    function successCBa(data) {
        $('.full-name2').val(data.fullName);
        $('.country2').val(data.country);
        $('.email2').val(data.email);
        $('.password2').val(data.password);
        $('.phone2').val(data.phoneNumber);
    }

    function errorCBa(err) {
        alert("Sorry, we could not complete your request because the server connection might have been lost or the data was undefined.");
    }


    $('.update').submit(function (event) {
        event.preventDefault(); 
        SubmitUpdate(); 
    });

});
function SubmitUpdate() {
    user = {
        fullName: $('.full-name2').val(),
        country: $('.country2').val(),
        email: $('.email2').val(),
        password: $('.password2').val(),
        phoneNumber: $('.phone2').val()
    }
    console.log(user);
    //const api = "https://localhost:7076/api/User/" + sessionStorage['logged'];
    const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/User/" + sessionStorage['logged'];
    ajaxCall("PUT", api, JSON.stringify(user), successCBb, errorCB);
    return false;
}


function successCBb(data) {
    if (data == true) alert("Changes saved. Your profile has been successfully updated.")
    else alert("Error updating your profile. You might entered an email that already registered, Please try again and ensure all fields are filled correctly.");
    $('.update-popup').hide();
    $(".overlay").hide();
}
function errorCB(response) {
    alert("Sorry, we could not complete your request because the server connection might have been lost or the data was undefined.");
}


///////////////////////////////submit login///////////////////////////////
function SubmitLog() {
    let val = $('#email3').val().split("@");
    console.log(val);
    //const api = "https://localhost:7076/api/User/UserLogIn/" + val[0] + "%40" + val[1] + "/" + $('#password3').val();
    const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/User/UserLogIn/" + val[0] + "%40" + val[1] + "/" + $('#password3').val();
    ajaxCall("POST", api, { email: val[0] + "@" + val[1], password: $('#password3').val() }, successCBL, errorCBL);

    return false;
}
function successCBL(user) {
    sessionStorage['logged'] = user.id;
    alert("You have successfully logged in");
    $(window.location).attr('href', 'index.html');

}

function errorCBL(err) {
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
/////////////////////////////////////////////////////////////////////////


function init() {
 
    var popup2 = $('.order-popup');
    var popup3 = $('.login-popup');
    var overlay = $('.overlay');

    var mainDiv = document.createElement("div");
    mainDiv.id = "container";
    for (var i = 0; i < Arr.length; i++) {
        let heading = document.createElement("h3");
        heading.innerHTML = Arr[i].name;
        let heading2 = document.createElement("h4");
        heading2.innerHTML = Arr[i].host_location + "<br>Bedrooms: " + Arr[i].bedrooms +
            "<br>Price (per night): " + Arr[i].price + "<br>Review Score: " + Arr[i].review_scores_rating;
        let idP = document.createElement("p");
        idP.id = Arr[i].id;
        idP.innerHTML = "ID " + Arr[i].id;
        let flatBox = document.createElement("div");
        let img = document.createElement("img");
        img.src = Arr[i]["picture_url"];
        let textBox = document.createElement("div");
        textBox.style.overflow = "auto";
        textBox.style.height = "120px";
        textBox.style.fontSize = "11pt";
        textBox.style.color = "#808080";
        textBox.innerHTML = Arr[i].description;
        let addButton = document.createElement("button");
        addButton.style.marginTop= "25px";
        addButton.style.width = "95%";
        addButton.style.background = "#ff8a8a";
        addButton.innerHTML = "ADD AN APARTMENT";
        addButton.id = i;
        addButton.onclick = function () {
            var logged = sessionStorage['logged'];
            if (logged == null) {
                overlay.show();
                popup3.show();
            }
            else {
                let clicked = Arr[this.id]
                var u_id = logged;
                flat = {
                    id: clicked["id"],
                    city: "Amsterdam",
                    address: clicked["host_location"],
                    numOfRooms: parseInt(clicked["bedrooms"]),
                    price: parseInt(clicked["price"].split("$")[1]),
                    imgUrl: clicked["picture_url"],
                    apartmentName: clicked["name"],
                    reviewScore: Number(clicked["review_scores_rating"]),
                    description: clicked["description"],
                    userId: u_id
                }
                console.log(flat);
                //const api = "https://localhost:7076/api/Flats/";
                const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/Flats/";
                ajaxCall("POST", api, JSON.stringify(flat), successCB, errorCB);
            }
        }
        let bookingButton = document.createElement("button");
        bookingButton.style.width = "95%";
        bookingButton.style.background = "#FF4B4B";
        bookingButton.innerHTML = "BOOK AN APARTMENT";
        bookingButton.id = i;
        bookingButton.onclick = function () {
            var logged = sessionStorage['logged'];
            if (logged == null) {
                overlay.show();
                popup3.show();
            }
            else {
                let clicked = Arr[this.id];
                sessionStorage["ordered"] = clicked.id;
                flat = {
                    id: clicked["id"],
                    city: "Amsterdam",
                    address: clicked["host_location"],
                    numOfRooms: parseInt(clicked["bedrooms"]),
                    price: parseInt(clicked["price"].split("$")[1]),
                    imgUrl: clicked["picture_url"],
                    apartmentName: clicked["name"],
                    reviewScore: Number(clicked["review_scores_rating"]),
                    description: clicked["description"],
                    userId: logged
                }
                //const api = "https://localhost:7076/api/Flats/";
                const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/Flats/";
                ajaxCall("POST", api, JSON.stringify(flat), successCB_p, errorCB);

                
            }
        }
        flatBox.className = "flatBox";
        flatBox.appendChild(img);
        flatBox.appendChild(heading);
        flatBox.appendChild(heading2);
        flatBox.appendChild(idP);
        flatBox.appendChild(textBox);
        flatBox.appendChild(addButton);
        flatBox.appendChild(bookingButton);
        mainDiv.appendChild(flatBox);
    }
    document.body.appendChild(mainDiv);

    function successCB(data) {
            if (data == true) alert("Apartment added successfully");
            else alert("Apartment already exists in database!");
    }
    function errorCB(response) {
        alert("Sorry, we could not complete your request because the server connection might have been lost or the data was undefined.");
    }
    function successCB_p(data) {
        overlay.show();
        popup2.show();
    }
}