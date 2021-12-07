var submitButton = document.getElementById("submit");
var inputField = document.getElementById("date");
var EventTable = document.getElementById("eventTable");
submitButton.addEventListener("click", handleClick);
function handleClick(_event) {
    var url = "http://localhost:3000/convertDate";
    fetch(url + "?date=" + inputField.value)
        .then(function (response) { return response.json(); })
        .then(function (response) {
        response.oldDate = inputField.value;
        createTableCell(response);
    })["catch"](function (error) { return console.log(error); });
}
function createTableCell(_data) {
    var row = document.createElement("tr");
    var DateString = document.createElement("td");
    var FormattedDate = document.createElement("td");
    var Day = document.createElement("td");
    var Month = document.createElement("td");
    var Year = document.createElement("td");
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
