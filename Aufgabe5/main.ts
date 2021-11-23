let interpret : HTMLInputElement = document.getElementById("interpret") as HTMLInputElement;
let price : HTMLInputElement = document.getElementById("price") as HTMLInputElement;
let dateAndTime : HTMLInputElement = document.getElementById("dateAndTime") as HTMLInputElement;
let editPopupElement : HTMLElement = document.getElementById("popup") as HTMLElement;

let editInterpret : HTMLInputElement = document.getElementById("editInterpret") as HTMLInputElement;
let editPrice : HTMLInputElement = document.getElementById("editPrice") as HTMLInputElement;
let editDateAndTime : HTMLInputElement = document.getElementById("editEventDate") as HTMLInputElement;
let currentEditEvent : number = 0;

let eventTableElement : HTMLElement = document.getElementById("eventTable") as HTMLElement;

let eventArray : any = [];

loadLocalStorageContent();

class eventTable {
    private interpret : string;
    private price : number;
    private dateAndTime : String;

    constructor(interpret : string, price : number, dateAndTime : String) {
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

    editFromList(index : number, interpret : string, price : number, dateAndTime : String) {
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
        let newEvent : eventTable = new eventTable(interpret.value, Number(price.value), dateAndTime.value);
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
        eventArray = JSON.parse(localStorage.getItem("eventArray") || "");
        renderList();
    }
}

function removeEvent(i : number) {
    eventArray.splice(i, 1);
    writeToLocalStorage();
    renderList();
}

function renderList() {
    eventTableElement.innerHTML = "";
    if(eventArray.length > 0) {
        for (let i : number = 0; i < eventArray.length; i++) {
            let row : HTMLElement = document.createElement("tr");
            let event : HTMLElement = document.createElement("td");
            let price : HTMLElement = document.createElement("td");
            let date : HTMLElement = document.createElement("td");
            let actions : HTMLElement = document.createElement("td");

            let removeButton : HTMLElement = document.createElement("button");
            let editButton : HTMLElement = document.createElement("button");

            removeButton.classList.add("btn", "btn-danger", "mx-2");
            removeButton.innerHTML = "Remove";
            removeButton.onclick = function() {removeEvent(i)};

            editButton.classList.add("btn", "btn-success", "mx-2");
            editButton.innerHTML = "Edit";
            editButton.onclick = function() {editEvent(i)};


            event.textContent = eventArray[i].interpret;
            price.textContent = eventArray[i].price + ' $';
            date.textContent = dateFormatter(eventArray[i].dateAndTime);
            

            actions.appendChild(removeButton);
            actions.appendChild(editButton);

            row.appendChild(event);
            row.appendChild(price);
            row.appendChild(date);
            row.appendChild(actions);
            eventTableElement.appendChild(row);
        }
    } else {
        eventTableElement.innerHTML = "<tr><td>No events found</td><td></td><td></td><td></td></tr>";
    }
}

function editEvent(i : number) {
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

function dateFormatter(d : String) {
    let DatePickerString : Date = new Date(d);
    let DateString = DatePickerString.getDate() + "." + (DatePickerString.getMonth() + 1) + "." + DatePickerString.getFullYear() + " at " + DatePickerString.getHours() + ':' + DatePickerString.getMinutes();
    return DateString;
}

function sortByDate() {
    eventArray.sort(function(a : any, b : any) {
        return new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime();
    });
    renderList();
}