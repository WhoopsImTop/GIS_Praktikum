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
console.log("Höchster Preis: " + hoechsterTicketPreis(events));

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

console.log("Fakultät: " + fakultaet(6));

// Lösung f) ...
function teilbarDurchDrei(n : number) {
  for(let i = 0; i <= n; i++) {
    if(i % 3 == 0) {
      console.log(i)
    }
  }
}
console.log(teilbarDurchDrei(100))

// Lösung g) ...

// Lösung h) ...
