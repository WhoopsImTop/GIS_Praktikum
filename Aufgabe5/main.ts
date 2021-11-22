let interpret : HTMLInputElement = document.getElementById("interpret") as HTMLInputElement;
let price : HTMLInputElement = document.getElementById("price") as HTMLInputElement;
let dateAndTime : HTMLInputElement = document.getElementById("dateAndTime") as HTMLInputElement;
let editPopupElement : HTMLElement = document.getElementById("popup") as HTMLElement;

let editInterpret : HTMLInputElement = document.getElementById("editInterpret") as HTMLInputElement;
let editPrice : HTMLInputElement = document.getElementById("editPrice") as HTMLInputElement;
let editDateAndTime : HTMLInputElement = document.getElementById("editEventDate") as HTMLInputElement;
let currentEditEvent : number = 0;

let eventArray : any = [];

class eventTable {
    private interpret : string;
    private price : number;
    private dateAndTime : Date;

    constructor(interpret : string, price : number, dateAndTime : Date) {
        this.interpret = interpret;
        this.price = price;
        this.dateAndTime = dateAndTime;
    }

    addToList() {
        eventArray.push({
            interpret: this.interpret,
            price: this.price,
            dateAndTime: this.dateAndTime
        });
    }

    editFromList(index : number, interpret : string, price : number, dateAndTime : Date) {
        eventArray[index].interpret = interpret;
        eventArray[index].price = price;
        eventArray[index].dateAndTime = dateAndTime;
    }
}

function formValidator() {
    if(interpret.value == "") {
        interpret.style.borderColor = "red";
    } else if(price.value == "" || isNaN(Number(price.value))) {
        price.style.borderColor = "red";
    } else if(dateAndTime.value == "" || dateAndTime.value == "YYYY-MM-DD hh:mm") {
        dateAndTime.style.borderColor = "red";
    } else {
        let newEvent : eventTable = new eventTable(interpret.value, Number(price.value), new Date(dateAndTime.value));
        newEvent.addToList();
        writeToLocalStorage();
        renderList();
    }
}

function writeToLocalStorage() {
    localStorage.setItem("eventArray", JSON.stringify(eventArray));
}

function loadLocalStorageContent() {
    if(localStorage.getItem("eventArray")) {
        eventArray = JSON.parse(localStorage.getItem("eventArray") as any);
    }
}

function removeEvent(i : number) {
    eventArray.splice(i, 1);
    renderList();
}

function renderList() {
    if(eventArray.length > 0) {
        let table : string = "";
        for (let i : number = 0; i < eventArray.length; i++) {
            table += "<tr><td>" + eventArray[i].interpret + "</td><td>" + eventArray[i].price + '$' + "</td><td>" + eventArray[i].dateAndTime.getDate() + '.' + eventArray[i].dateAndTime.getMonth() + '.' + eventArray[i].dateAndTime.getFullYear() + ' at ' + eventArray[i].dateAndTime.getHours() + ':' + eventArray[i].dateAndTime.getMinutes() + "</td><td><button class='btn btn-danger' onclick='removeEvent(" + i + ")'>Remove</button> <button class='btn btn-success' onclick='editEvent(" + i + ")'>Edit</button></td></tr>";
        }
        let eventTable : HTMLElement = document.getElementById("eventTable") as HTMLElement;
        eventTable.innerHTML = table;
    } else {
        let eventTable : HTMLElement = document.getElementById("eventTable") as HTMLElement;
        eventTable.innerHTML = "<tr><td>No events found</td><td></td><td></td><td></td></tr>";
    }
}

function editEvent(i : number) {
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