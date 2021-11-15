"use strict";
var interpret = document.getElementById("interpret");
var price = document.getElementById("price");
var dateAndTime = document.getElementById("dateAndTime");
var eventArray = [];
var eventTable = /** @class */ (function () {
    function eventTable(interpret, price, dateAndTime) {
        this.interpret = interpret;
        this.price = price;
        this.dateAndTime = dateAndTime;
    }
    eventTable.prototype.addToList = function () {
        eventArray.push(this);
    };
    eventTable.prototype.removeFromList = function (index) {
        eventArray.splice(index, 1);
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
        renderList();
    }
}
function removeEvent(index) {
    eventArray[index].removeFromList(index);
    renderList();
}
function renderList() {
    if (eventArray.length > 0) {
        var table = "";
        for (var i = 0; i < eventArray.length; i++) {
            table += "<tr><td>" + eventArray[i].interpret + "</td><td>" + eventArray[i].price + "</td><td>" + eventArray[i].dateAndTime + "</td><td><button class='btn btn-danger' onclick='removeEvent(" + i + ")'>Remove</button></td></tr>";
        }
        var eventTable_1 = document.getElementById("eventTable");
        eventTable_1.innerHTML = table;
    }
    else {
        var eventTable_2 = document.getElementById("eventTable");
        eventTable_2.innerHTML = "<tr><td>No events found</td><td></td><td></td><td></td></tr>";
    }
}
function sortByDate() {
    eventArray.sort(function (a, b) {
        return a.dateAndTime.getTime() - b.dateAndTime.getTime();
    });
    renderList();
}
