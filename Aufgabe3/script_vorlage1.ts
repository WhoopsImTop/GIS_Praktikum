// -- [Aufgabe 1]

/**
 * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
 */
let age: number = 21;

/**
 * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
 */
let firstName: string = `Elias`;

function func1(age: number): number {
  return 2021 - age;
}

let output: string = func2(firstName);

function func3(meal?: string): string {
  console.log(`Ich esse gerne ${meal || "Pizza"}.`);
  return func1(age) > 1995
    ? `Ich gehöre zur Generation Z`
    : `Ich gehöre zur Generation Y`;
}

console.log(output);

function func2(name: string): string {
  console.log(`Ich heiße ${name}.`);
  return func3();
}

/* -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 1 EINTRAGEN
 * Ich heiße Elias
 * Ich esse gerne Pizza
 * Ich gehöre zur Generation Z
 */

// -- [Aufgabe 2]

let events: any[][] = [
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
events.map((event, index) => {
  console.log(index + 1 + ":" + event)
})

// Lösung c) ...
function hoechsterTicketPreis(Array : any[][]) {
  let hoechsterPreis : any[][] = [];
  let preis : number = 0;
  for(let i = 0; i < Array.length; i++) {
    if(preis <= Array[i][1]) {
      preis = Array[i][1]
      hoechsterPreis = Array[i];
    }
  }
  return hoechsterPreis;
}
console.log("c): Höchster Preis: " + hoechsterTicketPreis(events));

// Lösung d) ...
function kuenstlerSuche(array : any[][], name : String) {
  array.map(event => {
      return event[0].toLowerCase() == name.toLocaleLowerCase() ? true : false;
  })
}

  kuenstlerSuche([
  ["Mark Forster", 12.30],
  ["Metallika", 13.30],
  ["ACDC", 23.40],
  ["Eminem", 14.30]
  ], "ACDC")

// Lösung e) ...
function fakultaet(n : number) {
  let i : number = 1;
  let current : number = 1;
  while(i <= n) {
    current = current * i
    i++
  }
  return current
}

console.log("e): Fakultät: " + fakultaet(6));

// Lösung f) ...
function teilbarDurchDrei(n : number) {
  console.log('f):')
  for(let i = 1; i <= n; i++) {
    if(i % 3 == 0) {
      console.log(i)
    }
  }
}
teilbarDurchDrei(100)

// Lösung g) ...
class ConcertEvent {
  private interpret: string;
  private price: number = 0; // default Wert

  //Konstruktor
  constructor(interpret: string, price: number) {
    this.interpret = interpret;
    this.price = price
  }

  show(): string {
    return this.interpret + `, ` + this.price;
  }
}

let p: ConcertEvent = new ConcertEvent("Pink Floyd", 15.9);
console.log('g): ' + p.show());
console.log("---")


// Lösung h) ...
class ConcertEvents {
  private interpret: string;
  private price: number = 0; // default Wert
  private eventArray : any[] = []

  //Konstruktor
  constructor(interpret: string, price: number) {
    this.interpret = interpret;
    this.price = price
    this.addEvent(interpret, price)
  }

  addEvent(interpret: string, price: number) {
    this.eventArray.push(new ConcertEvent(interpret, price))
  }

  show() {
    console.log()
    for(let i : number = 0; i < this.eventArray.length; i++) {
      console.log(this.eventArray[i].interpret + `, ` + this.eventArray[i].price);
    }
  }
}

let concert: ConcertEvents = new ConcertEvents("Pink Floyd", 15.9);
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