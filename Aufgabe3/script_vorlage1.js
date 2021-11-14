"use strict";
// -- [Aufgabe 1]
/**
 * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
 */
var age = 21;
/**
 * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
 */
var firstName = "Elias";
function func1(age) {
    return 2021 - age;
}
var output = func2(firstName);
function func3(meal) {
    console.log("Ich esse gerne " + (meal || "Pizza") + ".");
    return func1(age) > 1995
        ? "Ich geh\u00F6re zur Generation Z"
        : "Ich geh\u00F6re zur Generation Y";
}
console.log(output);
function func2(name) {
    console.log("Ich hei\u00DFe " + name + ".");
    return func3();
}
/* -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 1 EINTRAGEN
 * Ich heiße Elias
 * Ich esse gerne Pizza
 * Ich gehöre zur Generation Z
 */
// -- [Aufgabe 2]
var events = [
    ["Mark Knopfler", 10.1],
    ["Pink Floyd", 15.9],
    ["Metallica", 20.1],
    ["Michael Bublé", 11.1],
    ["Dire Straits", 12.2],
    ["Mariah Carey", 1.1],
    ["Cat Stevens", 12.99],
    ["Mark Forster", 2.1],
    ["Helene Fischer", 3.1],
    ["Bee Gees", 25.2],
];
// -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 2 EINTRAGEN
// Lösung a) 
console.log(events.length);
// Lösung b) ...
events.map(function (event, index) {
    console.log(index + 1 + ":" + event);
});
// Lösung c) ...
function hoechsterTicketPreis(Array) {
    var hoechsterPreis = [];
    var preis = 0;
    for (var i = 0; i < Array.length; i++) {
        if (preis <= Array[i][1]) {
            preis = Array[i][1];
            hoechsterPreis = Array[i];
        }
    }
    return hoechsterPreis;
}
console.log("c): Höchster Preis: " + hoechsterTicketPreis(events));
// Lösung d) ...
function kuenstlerSuche(array, name) {
    array.map(function (event) {
        return event[0].toLowerCase() == name.toLocaleLowerCase() ? true : false;
    });
}
kuenstlerSuche([
    ["Mark Forster", 12.30],
    ["Metallika", 13.30],
    ["ACDC", 23.40],
    ["Eminem", 14.30]
], "ACDC");
// Lösung e) ...
function fakultaet(n) {
    var i = 1;
    var current = 1;
    while (i <= n) {
        current = current * i;
        i++;
    }
    return current;
}
console.log("e): Fakultät: " + fakultaet(6));
// Lösung f) ...
function teilbarDurchDrei(n) {
    console.log('f):');
    for (var i = 1; i <= n; i++) {
        if (i % 3 == 0) {
            console.log(i);
        }
    }
}
teilbarDurchDrei(100);
// Lösung g) ...
var ConcertEvent = /** @class */ (function () {
    //Konstruktor
    function ConcertEvent(interpret, price) {
        this.price = 0; // default Wert
        this.interpret = interpret;
        this.price = price;
    }
    ConcertEvent.prototype.show = function () {
        return this.interpret + ", " + this.price;
    };
    return ConcertEvent;
}());
var p = new ConcertEvent("Pink Floyd", 15.9);
console.log('g): ' + p.show());
console.log("---");
// Lösung h) ...
var ConcertEvents = /** @class */ (function () {
    //Konstruktor
    function ConcertEvents(interpret, price) {
        this.price = 0; // default Wert
        this.eventArray = [];
        this.interpret = interpret;
        this.price = price;
        this.addEvent(interpret, price);
    }
    ConcertEvents.prototype.addEvent = function (interpret, price) {
        this.eventArray.push(new ConcertEvent(interpret, price));
    };
    ConcertEvents.prototype.show = function () {
        console.log();
        for (var i = 0; i < this.eventArray.length; i++) {
            console.log(this.eventArray[i].interpret + ", " + this.eventArray[i].price);
        }
    };
    return ConcertEvents;
}());
var concert = new ConcertEvents("Pink Floyd", 15.9);
concert.addEvent("Metallica", 20.1);
concert.addEvent("Michael Bublé", 11.1);
concert.addEvent("Dire Straits", 12.2);
concert.addEvent("Metallica", 20.1);
concert.addEvent("Mariah Carey", 1.1);
concert.addEvent("Cat Stevens", 12.99);
concert.addEvent("Mark Forster", 2.1);
concert.addEvent("Helene Fischer", 3.1);
concert.addEvent("Bee Gees", 25.2);
concert.show();
