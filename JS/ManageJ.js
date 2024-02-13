$(document).ready(function () {
    var update_pop = $('.update-popup');
    var ord_pop = $('.order-popup');
    var overlay = $('.overlay');
    var closeBtn = $('.close-btn');

    update_pop.hide();
    ord_pop.hide();
    overlay.hide();

    closeBtn.click(function () {
        update_pop.hide();
        ord_pop.hide();
        overlay.hide();
    });
    /////////////////////////////////////////////////DATE PICKER////////////////////////////////////////////////////////

    const checkIn = document.getElementById("start");
    const checkOut = document.getElementById("end");

    // Set the minimum check-in and check-out dates to today's date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tomorrowISO = tomorrow.toISOString().split("T")[0];
    today.toISOString().split("T")[0];
    checkIn.setAttribute("min", tomorrowISO);
    checkOut.setAttribute("min", today);

    checkIn.addEventListener("change", (event) => {
        const checkInDate = new Date(event.target.value);
        const minCheckOutDate = new Date(checkInDate);
        minCheckOutDate.setDate(minCheckOutDate.getDate() + 1);
        
        checkOut.setAttribute("min", minCheckOutDate.toISOString().split("T")[0]);
    });

    checkOut.addEventListener("change", (event) => {
        const checkOutDate = new Date(event.target.value);
        const checkInDate = new Date(checkIn.value);
    });

////////////////////////////////////////////////////////////////////////////////////////////////////

    $('.order').submit(SubmitOrder);

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

    function errorCBa(err) {
        alert("Sorry, we could not complete your request because the server connection might have been lost or the data was undefined.");
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


var tmpArr = [];
var mainDiv = document.createElement("div");
mainDiv.id = "container";

function init() {

    var buttonDiv = document.createElement("div");
    buttonDiv.id = "buttons";
    let showFlats1 = document.createElement("button");
    showFlats1.innerHTML = "Show All Apartments"
    showFlats1.onclick = function () {
        let logged = sessionStorage['logged'];
        if (logged == null) alert("Oops! You need to be logged in to access this feature. Please log in or create an account to continue.")
        else {
            //const api = "https://localhost:7076/api/Flats/" + sessionStorage['logged'];
            const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/Flats/"+ sessionStorage['logged'];
            ajaxCall("GET", api, "", successCB1, errorCB1);
        }
    };
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let showFlats2 = document.createElement("button");
    showFlats2.innerHTML = "Show Apartments";
    let text1 = document.createElement("INPUT");
    text1.setAttribute("type", "text");
    text1.value = "Enter maximal price"
    showFlats2.onclick = function () {
        let logged = sessionStorage['logged'];
        if (logged == null) alert("Oops! You need to be logged in to access this feature. Please log in or create an account to continue.")
        else {
            let num = text1.value;
            //const api = "https://localhost:7076/api/Flats/GetByPrice?price=" + num + "&uId=" + sessionStorage["logged"];
            const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/Flats/GetByPrice?price=" + num + "&uId=" + sessionStorage["logged"];
            ajaxCall("GET", api, "", successCB1, errorCB1);
        }
    };

    let showFlats3 = document.createElement("button");
    showFlats3.innerHTML = "Show Apartments"

    let text2 = document.createElement("INPUT");
    text2.setAttribute("type", "text");
    text2.value = "Enter a city name";
    let text3 = document.createElement("INPUT");
    text3.setAttribute("type", "text");
    text3.value = "Enter minimum rating";
    showFlats3.onclick = function () {
        let logged = sessionStorage['logged'];
        if (logged == null) alert("Oops! You need to be logged in to access this feature. Please log in or create an account to continue.")
        else {
            //const api = "https://localhost:7076/api/Flats/GetByCity/" + text3.value + "/" + text2.value + "/" + sessionStorage["logged"];
            const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/Flats/GetByCity/" + text3.value + "/" + text2.value + "/" + sessionStorage["logged"];
            ajaxCall("GET", api, "", successCB1, errorCB1);
        }
    }
    showFlats1.id = "showFlats1";
    showFlats2.id = "showFlats2";
    showFlats3.id = "showFlats3";
    span1.appendChild(text1);
    span1.appendChild(showFlats2);
    span2.appendChild(text2);
    span2.appendChild(text3);
    span2.appendChild(showFlats3);
    buttonDiv.appendChild(showFlats1);
    buttonDiv.appendChild(span1);
    buttonDiv.appendChild(span2);
    document.body.appendChild(buttonDiv);
}

function init2() {
    var ord_pop = $('.order-popup');
    var overlay = $('.overlay');

    mainDiv.innerHTML = "";
    for (var i = 0; i < tmpArr.length; i++) {
        let heading = document.createElement("h3");
        heading.innerHTML = tmpArr[i].apartmentName;
        let heading2 = document.createElement("h4");
        heading2.innerHTML = tmpArr[i].address + "<br>Bedrooms: " + tmpArr[i].numOfRooms +
            "<br>Price (per night): " + tmpArr[i].price + "$" + "<br>Review Score: " + tmpArr[i].reviewScore;
        let idP = document.createElement("p");
        idP.innerHTML = "ID " + tmpArr[i].id;
        let flatBox = document.createElement("div");
        let img = document.createElement("img");
        img.src = tmpArr[i]["imgUrl"];
        let textBox = document.createElement("div");
        textBox.style.overflow = "auto";
        textBox.style.height = "120px";
        textBox.style.fontSize = "11pt";
        textBox.style.color = "#808080";
        textBox.innerHTML = tmpArr[i].description;
        let removeButton = document.createElement("button");
        removeButton.style.marginTop = "25px";
        removeButton.style.width = "95%";
        removeButton.style.background = "#ff8a8a";
        removeButton.innerHTML = "DELETE APARTMENT";
        removeButton.id = i;
        removeButton.onclick = function () {
            let logged = sessionStorage['logged'];
            if (logged == null) alert("Oops! You need to be logged in to access this feature. Please log in or create an account to continue.")
            else {
                //const api = "https://localhost:7076/api/Flats/" + this.id + "/" + sessionStorage['logged'];
                const api = "https://proj.ruppin.ac.il/cgroup40/test2/tar1/api/Flats/" + tmpArr[this.id].id + "/" + sessionStorage['logged'];
                ajaxCall("DELETE", api, "", successCB1, errorCB1);
            }
        }
        let bookButton = document.createElement("button");
        bookButton.style.width = "95%";
        bookButton.style.background = "#FF4B4B";
        bookButton.innerHTML = "BOOK AN APARTMENT";
        bookButton.id = i;
        bookButton.onclick = function () {
            sessionStorage["ordered"] = tmpArr[this.id].id;
            overlay.show();
            ord_pop.show();
        }
        flatBox.className = "flatBox";
        flatBox.appendChild(img);
        flatBox.appendChild(heading);
        flatBox.appendChild(heading2);
        flatBox.appendChild(idP);
        flatBox.appendChild(textBox);
        flatBox.appendChild(removeButton);
        flatBox.appendChild(bookButton);
        mainDiv.appendChild(flatBox);
    }
    document.body.appendChild(mainDiv);
}

function successCB1(data) {
    var logged = sessionStorage['logged'];
    if (logged != null) {
        tmpArr = data;
        init2();
    }
    else {
        alert("To manage your apartments, please log in to your account. Click Log in/Sign up at the top menu to get started");
    }
}
function errorCB1(err) {
    if (err.status === 500) {
        alert("Error: " + err.responseText);
    } else {
        alert("Sorry, we could not complete your request because the server connection might have been lost or the data was undefined.");
    }
}
