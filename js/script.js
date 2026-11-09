// script.js - Spice Garden

// navbar gets dark background after scrolling
var navbar = document.getElementById("mainNav");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// close the menu on mobile when a link is clicked
var navLinks = document.querySelectorAll("#menuLinks .nav-link");
var menu = document.getElementById("menuLinks");

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    if (menu.classList.contains("show")) {
      new bootstrap.Collapse(menu).hide();
    }
  });
}

// reservation form
var form = document.getElementById("reservationForm");
var successMsg = document.getElementById("successMsg");

// today's date in yyyy-mm-dd format
function getToday() {
  var d = new Date();
  var month = String(d.getMonth() + 1).padStart(2, "0");
  var day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

// past dates cannot be selected
document.getElementById("date").min = getToday();

function setValid(field, ok) {
  if (ok) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  } else {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("name");
  var phone = document.getElementById("phone");
  var date = document.getElementById("date");
  var time = document.getElementById("time");
  var guests = document.getElementById("guests");

  var allOk = true;

  var nameOk = name.value.trim() !== "";
  setValid(name, nameOk);
  if (!nameOk) allOk = false;

  // phone should be 10 digits
  var phoneOk = /^[0-9]{10}$/.test(phone.value.trim());
  setValid(phone, phoneOk);
  if (!phoneOk) allOk = false;

  var dateOk = date.value !== "" && date.value >= getToday();
  setValid(date, dateOk);
  if (!dateOk) allOk = false;

  // restaurant timing 11:00 to 22:30
  var timeOk = time.value !== "" && time.value >= "11:00" && time.value <= "22:30";
  setValid(time, timeOk);
  if (!timeOk) allOk = false;

  var guestsOk = guests.value !== "";
  setValid(guests, guestsOk);
  if (!guestsOk) allOk = false;

  if (!allOk) {
    successMsg.classList.add("d-none");
    return;
  }

  successMsg.textContent = "Thank you " + name.value.trim() + "! Your table for " +
    guests.value + " on " + date.value + " at " + time.value +
    " is booked. We will call you on " + phone.value.trim() + " to confirm.";
  successMsg.classList.remove("d-none");

  // clear the form and remove green/red borders
  form.reset();
  var fields = form.querySelectorAll(".is-valid, .is-invalid");
  for (var j = 0; j < fields.length; j++) {
    fields[j].classList.remove("is-valid", "is-invalid");
  }

  successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
});
