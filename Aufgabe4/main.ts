let interpret : HTMLInputElement = document.getElementById("interpret") as HTMLInputElement;
let price : HTMLInputElement = document.getElementById("price") as HTMLInputElement;
let dateAndTime : HTMLInputElement = document.getElementById("dateAndTime") as HTMLInputElement;
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
        eventArray.push(this);
    }

    removeFromList(index : number) {
        eventArray.splice(index, 1);
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
        renderList();
    }
}

function removeEvent(index : number) {
    eventArray[index].removeFromList(index);
    renderList();
}

function renderList() {
    if(eventArray.length > 0) {
        let table : string = "";
        for (let i : number = 0; i < eventArray.length; i++) {
            table += "<tr><td>" + eventArray[i].interpret + "</td><td>" + eventArray[i].price + "</td><td>" + eventArray[i].dateAndTime.getDate() + '.' + eventArray[i].dateAndTime.getMonth() + '.' + eventArray[i].dateAndTime.getFullYear() + ' at ' + eventArray[i].dateAndTime.getHours() + ':' + eventArray[i].dateAndTime.getMinutes() + "</td><td><button class='btn btn-danger' onclick='removeEvent(" + i + ")'>Remove</button></td></tr>";
        }
        let eventTable : HTMLElement = document.getElementById("eventTable") as HTMLElement;
        eventTable.innerHTML = table;
    } else {
        let eventTable : HTMLElement = document.getElementById("eventTable") as HTMLElement;
        eventTable.innerHTML = "<tr><td>No events found</td><td></td><td></td><td></td></tr>";
    }
}

function sortByDate() {
    eventArray.sort(function(a : any, b : any) {
        return a.dateAndTime.getTime() - b.dateAndTime.getTime();
    });
    renderList();
}