var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var interpret = document.getElementById("interpret");
var price = document.getElementById("price");
var dateAndTime = document.getElementById("dateAndTime");
var eventTableElement = document.getElementById("eventTable");
var eventArray = [];
function getEventsFromServer() {
    fetch("http://localhost:3000/concertEvents")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        eventArray = data;
        console.log(eventArray);
        renderList();
    });
}
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
function formValidator(edit) {
    return __awaiter(this, void 0, void 0, function () {
        var newEvent;
        return __generator(this, function (_a) {
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
                postToServer();
                newEvent = new eventTable(interpret.value, Number(price.value), dateAndTime.value);
                newEvent.addToList();
                renderList();
            }
            return [2 /*return*/];
        });
    });
}
function renderList() {
    eventTableElement.innerHTML = "";
    if (eventArray.length > 0) {
        for (var i = 0; i < eventArray.length; i++) {
            var row = document.createElement("tr");
            var event_1 = document.createElement("td");
            var price_1 = document.createElement("td");
            var date = document.createElement("td");
            event_1.textContent = eventArray[i].interpret;
            price_1.textContent = eventArray[i].price + ' $';
            date.textContent = dateFormatter(eventArray[i].dateAndTime);
            row.appendChild(event_1);
            row.appendChild(price_1);
            row.appendChild(date);
            eventTableElement.appendChild(row);
        }
    }
    else {
        eventTableElement.innerHTML = "<tr><td>No events found</td><td></td><td></td><td></td></tr>";
    }
}
function dateFormatter(d) {
    var DatePickerString = new Date(d);
    var DateString = DatePickerString.getDate() + "." + (DatePickerString.getMonth() + 1) + "." + DatePickerString.getFullYear() + " at " + DatePickerString.getHours() + ':' + DatePickerString.getMinutes();
    return DateString;
}
function postToServer() {
    try {
        fetch("http://127.0.0.1:3000/concertEvents", {
            method: "POST",
            headers: {},
            body: JSON.stringify({
                interpret: interpret.value,
                price: price.value,
                dateAndTime: dateAndTime.value
            })
        })
            .then(function (response) {
            if (response.status == 201) {
                return true;
            }
            else {
                return false;
            }
            response.json();
        });
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
