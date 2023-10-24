
//creates a function that multiploes each element in a array by 2 and return the frst element and the transformed array, 
//in another array without mutating the original arrray

/*
function multiply_arr(arr) {
    let first_element = arr[0];
    let newArr = [];
   // last_array = [];
    for (let i=0; i <arr.length; i++) {
        result = arr[i] *= 2;
       // arr = arr[i] * 2;
      
    newArr.push(result);
    }
  
    const last_array = [first_element].concat(newArr);
    return last_array;
}

console.log(multiply_arr([1,2,3,4,5]));

*/



function multiply_arr(arr) {
    let first_element = arr[0];
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        result = arr[i] * 2;
        newArr.push(result);
    }

    newArr.unshift(first_element); // Add the first element to the beginning of the new array
    return newArr;
}

console.log(multiply_arr([1, 2, 3, 4, 5]));
