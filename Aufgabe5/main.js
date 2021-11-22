"use strict";
var interpret = document.getElementById("interpret");
var price = document.getElementById("price");
var dateAndTime = document.getElementById("dateAndTime");
var editPopupElement = document.getElementById("popup");
var editInterpret = document.getElementById("editInterpret");
var editPrice = document.getElementById("editPrice");
var editDateAndTime = document.getElementById("editEventDate");
var currentEditEvent = 0;
var eventArray = [];
var eventTable = /** @class */ (function () {
    function eventTable(interpret, price, dateAndTime) {
        this.interpret = interpret;
        this.price = price;
        this.dateAndTime = dateAndTime;
    }
    eventTable.prototype.addToList = function () {
        eventArray.push({
            interpret: this.interpret,
            price: this.price,
            dateAndTime: this.dateAndTime
        });
    };
    eventTable.prototype.editFromList = function (index, interpret, price, dateAndTime) {
        eventArray[index].interpret = interpret;
        eventArray[index].price = price;
        eventArray[index].dateAndTime = dateAndTime;
    };
    return eventTable;
}());
function formValidator() {
    if (interpret.value == "") {
        interpret.style.borderColor = "red";
    }
    else if (price.value == "" || isNaN(Number(price.value))) {
        price.style.borderColor = "red";
    }
    else if (dateAndTime.value == "" || dateAndTime.value == "YYYY-MM-DD hh:mm") {
        dateAndTime.style.borderColor = "red";
    }
    else {
        var newEvent = new eventTable(interpret.value, Number(price.value), new Date(dateAndTime.value));
        newEvent.addToList();
        writeToLocalStorage();
        renderList();
    }
}
function writeToLocalStorage() {
    localStorage.setItem("eventArray", JSON.stringify(eventArray));
}
function loadLocalStorageContent() {
    if (localStorage.getItem("eventArray")) {
        eventArray = JSON.parse(localStorage.getItem("eventArray"));
    }
}
function removeEvent(i) {
    eventArray.splice(i, 1);
    renderList();
}
function renderList() {
    if (eventArray.length > 0) {
        var table = "";
        for (var i = 0; i < eventArray.length; i++) {
            table += "<tr><td>" + eventArray[i].interpret + "</td><td>" + eventArray[i].price + '$' + "</td><td>" + eventArray[i].dateAndTime.getDate() + '.' + eventArray[i].dateAndTime.getMonth() + '.' + eventArray[i].dateAndTime.getFullYear() + ' at ' + eventArray[i].dateAndTime.getHours() + ':' + eventArray[i].dateAndTime.getMinutes() + "</td><td><button class='btn btn-danger' onclick='removeEvent(" + i + ")'>Remove</button> <button class='btn btn-success' onclick='editEvent(" + i + ")'>Edit</button></td></tr>";
        }
        var eventTable_1 = document.getElementById("eventTable");
        eventTable_1.innerHTML = table;
    }
    else {
        var eventTable_2 = document.getElementById("eventTable");
        eventTable_2.innerHTML = "<tr><td>No events found</td><td></td><td></td><td></td></tr>";
    }
}
function editEvent(i) {
    currentEditEvent = i;
    editPopupElement.style.display = "block";
    editInterpret.value = eventArray[i].interpret;
    editPrice.value = eventArray[i].price;
    editDateAndTime.value = eventArray[i].dateAndTime.toString();
}
function editFromList() {
    eventArray[currentEditEvent].interpret = editInterpret.value;
    eventArray[currentEditEvent].price = Number(editPrice.value);
    eventArray[currentEditEvent].dateAndTime = new Date(editDateAndTime.value);
    renderList();
    currentEditEvent = 0;
    closePopup();
}
function closePopup() {
    editPopupElement.style.display = "none";
}
