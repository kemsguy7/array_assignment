
// cerating a promise
const myPromise = new Promise((resolve, reject) => {

    let operationIsSuccessful = true;
    //Async operation 
    if (operationIsSuccessful) {
        resolve("success");
    } else {
        reject("Failure");
    }
});


// Consuming a promise .then .catch
myPromise
    .then((result) => {
        console.log(result); // "Success"
    })
    .catch((error) => {
        console.log(error); // "Failure" 
    });

//using async and await
async function fetchData() {
    try {
        const result = await myPromise;
        const result2 = await myPromise;
        console.log(result, result2); // success
    } catch (error) {
        console.log(error); // "Failure"
    }
}


/* promises in nodeJS
promise.all promise.race promise.any 

*/