
//spread operator 
/*
function sum(...numbers) {
    /*
    let result = 0;
    for (let i=0; i < numbers.length; i++) {
        result += numbers[i];
    }
    return result;
    
    //using for of loop
    let result = 0;
    for (let val of numbers) {
        result += val;
    }
    return result;
}

console.log(sum(3, 5, 6, 7, 8));
//spread operator 
console.log(Math.max(...arr));
console.log(arr); 
/* 
spread operator extracts all of the values of an array, it does not mutate the array in anyway
it is used to unpack arrays 
*/
/*
function logData(entry1, entry2, ...entries) {
    console.log(entry1, entry2, entries);
}
logData("school", "laptop", "jet", "house"); */


//create a fucntion that returns the maximum cvalue given any number 
function max_number(array) {
    let sum = 0
    for (let i = 0; i< array.length; i++) {
      
         sum += array[i]
       }   
  
    return sum;
}

console.log(max_number([1,3,4,5,6]));

