

/*
write a functions that takes 

{x: 20, y:15}

amd returns return the square of x and y */



function square (point: { x :number; y:number }) : {x: number; y: number} {
    return {x : point.x **2, y: point.y*2 }
}

const inputPoint = { x:20, y:15 };

const squaredValues = squareValues(inputPoint);


console.log(squaredValues); //output: { x: 400, y: 225}
