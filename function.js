// constructor function

function Person () {
    this.name = 'John',
    this.age = 23,

    this.sleepTalk = function () {
        return(this.name +  this.talk);
    }
 }

// create an object
const person = new Person();
console.log(person.name);
