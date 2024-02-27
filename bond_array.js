


//To destructure OBJECTS

const obj ={
    firstName: "John",
    lastName: "Doe",
    age: 10,
    info: {
        school: "Decagon",
        Stack: "Node",

    },
};


{
    const { info: {} } = obj;
}


const a = { a: 1};
const b = { ...a}   //Object.assign({}, a);  same as doing 
console.log(b);


// Object destructuring doesn't do nested objects

const arr = [
    {  dob: "1978-10-01"  },
    {  dob: "2000-01-01"  },
    {  dob: "2002-04-01"  },
    {  dob: "2003-08-01"  },
    {  dob: "2007-10-01"  },
]

const myNewArr = arr.map((v) => {

     return { ...v, age : 10};
});


console.log