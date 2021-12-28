let interpret : HTMLInputElement = document.getElementById("interpret") as HTMLInputElement;
let price : HTMLInputElement = document.getElementById("price") as HTMLInputElement;
let dateAndTime : HTMLInputElement = document.getElementById("dateAndTime") as HTMLInputElement;

let eventTableElement : HTMLElement = document.getElementById("eventTable") as HTMLElement;
let eventArray : any = [];

function getEventsFromServer() {
    fetch("http://localhost:3000/concertEvents")
    .then(response => response.json())
    .then(data => {
        eventArray = data;
        console.log(eventArray);
        renderList();
    })
}

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

async function formValidator(edit : boolean) {
    if(interpret.value == "") {
        interpret.style.borderColor = "red";
    } else if(price.value == "" || isNaN(Number(price.value))) {
        price.style.borderColor = "red";
    } else if(dateAndTime.value == "" || dateAndTime.value == "YYYY-MM-DD hh:mm") {
        dateAndTime.style.borderColor = "red";
    } else {
        postToServer();
        let newEvent : eventTable = new eventTable(interpret.value, Number(price.value), dateAndTime.value);
        newEvent.addToList();
        renderList();
    }
}

function renderList() {
    eventTableElement.innerHTML = "";
    if(eventArray.length > 0) {
        for (let i : number = 0; i < eventArray.length; i++) {
            let row : HTMLElement = document.createElement("tr");
            let event : HTMLElement = document.createElement("td");
            let price : HTMLElement = document.createElement("td");
            let date : HTMLElement = document.createElement("td");

            event.textContent = eventArray[i].interpret;
            price.textContent = eventArray[i].price + ' $';
            date.textContent = dateFormatter(eventArray[i].dateAndTime);

            row.appendChild(event);
            row.appendChild(price);
            row.appendChild(date);
            eventTableElement.appendChild(row);
        }
    } else {
        eventTableElement.innerHTML = "<tr><td>No events found</td><td></td><td></td><td></td></tr>";
    }
}

function dateFormatter(d : Date) {
    let DatePickerString : Date = new Date(d);
    let DateString = DatePickerString.getDate() + "." + (DatePickerString.getMonth() + 1) + "." + DatePickerString.getFullYear() + " at " + DatePickerString.getHours() + ':' + DatePickerString.getMinutes();
    return DateString;
}

function postToServer() {
    try {
    fetch("http://127.0.0.1:3000/concertEvents", {
        method: "POST",
        headers: {
        },
        body: JSON.stringify({
            interpret: interpret.value,
            price: price.value,
            dateAndTime: dateAndTime.value
        }),
        })
        .then(response => {
            if(response.status == 201) {
                return true;
            } else {
                return false;
            }
            response.json()
        })
    } catch(error) {
        console.log(error);
        return false;
    }
}