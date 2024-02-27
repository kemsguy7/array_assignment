const counter = document.querySelector('.count');
const incrementMe = document.querySelector('.btn');
const warnMe = document.querySelector('.btn1');
const deleteMe = document.querySelector('.btn2');
const clearAll = document.querySelector('.para');
let count = 0;
let time = 5;
let intervalId;

incrementMe.addEventListener('click', ()=> {
    count++;
    counter.innerHTML = count;

    incrementMe.addEventListener('mouseout', ()=> {
        setTimeout( ()=> {
            if ( count > 0) 
                count--;
                counter.innerHTML = count;
        }, 5000);
    }); 
});

warnMe.addEventListener('click', ()=> {
   intervalId = setInterval( ()=> {
        if (time > 0) {
        clearAll.innerHTML = `Warning: You have ${time} seconds left`;
        time--;
        } else {
        clearAll.innerHTML = '';
        }
    }, 1000);
});

deleteMe.addEventListener('click', ()=> {
    clearInterval(intervalId);
    clearAll.innerHTML = '';
})




const myPromise = new Promise((resolve, reject)=> {
    setTimeout(()=> {
        const success = true;
        if (success) {
            resolve("operation succeeded")
        } else {
            reject("operation failed");
        }
    }, 2000)
});
myPromise.then((result)=> {

})

async function getData() {
    const url = '';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
    } catch(error) {
        console.error(`could not get products : ${error}`);
    }
}