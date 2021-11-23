"use strict";
var interpret = document.getElementById("interpret");
var price = document.getElementById("price");
var dateAndTime = document.getElementById("dateAndTime");
var editPopupElement = document.getElementById("popup");
var editInterpret = document.getElementById("editInterpret");
var editPrice = document.getElementById("editPrice");
var editDateAndTime = document.getElementById("editEventDate");
var currentEditEvent = 0;
var eventTableElement = document.getElementById("eventTable");
var eventArray = [];
loadLocalStorageContent();
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
        var newEvent = new eventTable(interpret.value, Number(price.value), dateAndTime.value);
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
        eventArray = JSON.parse(localStorage.getItem("eventArray") || "");
        renderList();
    }
}
function removeEvent(i) {
    eventArray.splice(i, 1);
    writeToLocalStorage();
    renderList();
}
function renderList() {
    eventTableElement.innerHTML = "";
    if (eventArray.length > 0) {
        var _loop_1 = function (i) {
            var row = document.createElement("tr");
            var event_1 = document.createElement("td");
            var price_1 = document.createElement("td");
            var date = document.createElement("td");
            var actions = document.createElement("td");
            var removeButton = document.createElement("button");
            var editButton = document.createElement("button");
            removeButton.classList.add("btn", "btn-danger", "mx-2");
            removeButton.innerHTML = "Remove";
            removeButton.onclick = function () { removeEvent(i); };
            editButton.classList.add("btn", "btn-success", "mx-2");
            editButton.innerHTML = "Edit";
            editButton.onclick = function () { editEvent(i); };
            event_1.textContent = eventArray[i].interpret;
            price_1.textContent = eventArray[i].price + ' $';
            date.textContent = dateFormatter(eventArray[i].dateAndTime);
            actions.appendChild(removeButton);
            actions.appendChild(editButton);
            row.appendChild(event_1);
            row.appendChild(price_1);
            row.appendChild(date);
            row.appendChild(actions);
            eventTableElement.appendChild(row);
        };
        for (var i = 0; i < eventArray.length; i++) {
            _loop_1(i);
        }
    }
    else {
        eventTableElement.innerHTML = "<tr><td>No events found</td><td></td><td></td><td></td></tr>";
    }
}
function editEvent(i) {
    currentEditEvent = i;
    editPopupElement.style.display = "block";
    editInterpret.value = eventArray[i].interpret;
    editPrice.value = eventArray[i].price;
    editDateAndTime.value = eventArray[i].dateAndTime;
}
function editFromList() {
    eventArray[currentEditEvent].interpret = editInterpret.value;
    eventArray[currentEditEvent].price = Number(editPrice.value);
    eventArray[currentEditEvent].dateAndTime = editDateAndTime.value;
    renderList();
    writeToLocalStorage();
    currentEditEvent = 0;
    closePopup();
}
function closePopup() {
    editPopupElement.style.display = "none";
}
function dateFormatter(d) {
    var DatePickerString = new Date(d);
    var DateString = DatePickerString.getDate() + "." + (DatePickerString.getMonth() + 1) + "." + DatePickerString.getFullYear() + " at " + DatePickerString.getHours() + ':' + DatePickerString.getMinutes();
    return DateString;
}
function sortByDate() {
    eventArray.sort(function (a, b) {
        return new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime();
    });
    renderList();
}
