function multipleNumbers(num, num2) {
    return num * num2;
}
console.log(multipleNumbers(1, 3));
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
var car = {
    type: "Toyota",
    model: "Corolla",
    year: 2009
};
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
var nameAgeMap = {};
nameAgeMap.Jack = 70; //No error This line adds a property to nameAgeMap with the key "Jack" and the value 25. 
//nameAgeMap.Mark = 09; // Error: Type 'string' is not assignable to type 'number'
var CardinalDirections;
(function (CardinalDirections) {
    CardinalDirections[CardinalDirections["North"] = 1] = "North";
    CardinalDirections[CardinalDirections["East"] = 2] = "East";
    CardinalDirections["South"] = "South";
    CardinalDirections["West"] = "West";
})(CardinalDirections || (CardinalDirections = {}));
console.log(CardinalDirections.North);
console.log(CardinalDirections.West);
console.log(CardinalDirections.East);
