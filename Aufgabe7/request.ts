let submitButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
let inputField : HTMLInputElement = <HTMLInputElement>document.getElementById("date");
let EventTable : HTMLTableElement = <HTMLTableElement>document.getElementById("eventTable");

submitButton.addEventListener("click", handleClick);

function handleClick(_event: Event): void {
    let url: string = "http://localhost:3000/convertDate";
    fetch(`${url}?date=${inputField.value}`)
    .then(response => response.json())
    .then((response) => {
        response.oldDate = inputField.value;
        createTableCell(response)
    })
    .catch(error => console.log(error))
}

function createTableCell(_data: any): void {
    let row : HTMLElement = document.createElement("tr");
    let DateString : HTMLElement = document.createElement("td");
    let FormattedDate : HTMLElement = document.createElement("td");
    let Day : HTMLElement = document.createElement("td");
    let Month : HTMLElement = document.createElement("td");
    let Year : HTMLElement = document.createElement("td");

    DateString.textContent = _data.oldDate;
    FormattedDate.textContent = _data.DateString;
    Day.textContent = _data.Day;
    Month.textContent = _data.Month;
    Year.textContent = _data.Year;

    row.appendChild(DateString);
    row.appendChild(FormattedDate);
    row.appendChild(Day);
    row.appendChild(Month);
    row.appendChild(Year);
    EventTable.appendChild(row);
}