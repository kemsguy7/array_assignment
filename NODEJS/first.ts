function multipleNumbers( num:number, num2:number ) {
    return num  * num2;
}
console.log(multipleNumbers(1, 3));


function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

//greet("Maddison", Date()); //this will theow an error can be fixed using code below

greet("Maddison", new Date());

let u: any = true;  //setting this line to any will disable type checking 
u = "string";
Math.round(u);

//TUPLES
let ourTuple: [number, boolean, string];
ourTuple = [5, false, "A tuple"];
console.log(ourTuple);

//OBJECTS
const car: { type: string, model: string, year: number } = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
}

console.group(car.type);

function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
//greet("Maddison", Date()); //this will theow an error can be fixed using code below
greet("Maddison", new Date());
var u = true; //setting this line to any will disable type checking 
u = "string";
Math.round(u);
//TUPLES
var ourTuple;
ourTuple = [5, false, "A tuple"];
console.log(ourTuple);
//OBJECTS


//INDEX SIGNATURES
const nameAgeMap: {  [index: string]: number } = { };
nameAgeMap.Jack = 70; //No error This line adds a property to nameAgeMap with the key "Jack" and the value 25. 
//nameAgeMap.Mark = 09; // Error: Type 'string' is not assignable to type 'number'

enum CardinalDirections {
	North = 1,
    East, 
    South = "South",
    West = "West"
    }
console.log(CardinalDirections.North);
console.log(CardinalDirections.West);   
console.log(CardinalDirections.East);   


// TYPE ALIASES
type CarYear = number 
type CarType = string 
type CarModel = string 
type Car = {
    year: CarYear,
    type: CarType,
    model: CarModel
}

const carYear: 
