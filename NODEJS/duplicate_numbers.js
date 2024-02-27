
/*
You are given an array of n+1 integers 1 through n. In addition there is a single duplicate integer. 

The array is unsorted. 
 
An example valid array would be [3, 2, 5, 1, 3, 4]. It has the integers 1 through 5 and 3 is duplicated. 
[1, 2, 4, 5, 5] would not be valid as it is missing 3. 
 
You should return the duplicate value as a single integer. 
example 
findDup([1,2,2,3]), 2; 
findDup([1,3,2,5,4,5,7,6]), 5; 
*/



function duplicate(arr) {
    let tempArr;
    const newArr = arr.sort((a,b)=>{
        a-b
    })

    for (let i = 0; i < newArr.length; i++) {
        if(newArr[i] === newArr[i + 1]){
            tempArr = newArr[i]
        }
    }
    return tempArr
}

console.log(duplicate([1,2,2,3])); 
  