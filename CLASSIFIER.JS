
function classifier(input) {
  const another_input = input.slice(0);
  //console.log(another_input)
  const workWithThis = another_input.map(item=>{
 
    return {name: item.name, age: 2019 - parseInt(item.dob), regNo: item.regNo, dob: item.dob}
  })
 
 
  //sorting the array
  workWithThis.sort((a,b)=>{
  return a.age - b.age
  })
 
//console.log(workWithThis)
const newarr = [];
 
let currentGroup = [];
for (let i = 0; i < workWithThis.length; i++) {
  
  //this target each item in workwiththis array
  const student = workWithThis[i];
 
  // Step 4: Add the current student to the current group if the age difference is less than or equal to 5
  if (
    currentGroup.length < 3 &&
    (currentGroup.length === 0 || student.age - currentGroup[0].age <= 5)
  ) {
    currentGroup.push(student);
  } else {
    // Step 5: Create a new group and add the current student to the new group
    newarr.push(currentGroup);
    currentGroup = [student];
  }
}
 
// Step 6: Add the last group to the groups array
if (currentGroup.length > 0) {
  newarr.push(currentGroup);
}
 
// my new object
const newOutput = {
 
}
 
//function to push inside
function pushInside(myarray){
 
// no. of groups
newOutput['noOfGroups'] = myarray.length;
  
// to get the array of values for age
const dobArr = [];
  myarray.forEach(subArr => {
    const subDobArr = subArr.map(obj => obj.age);
    dobArr.push(subDobArr);
    return dobArr
  });
 
// get maximum value in an arr
  let max_outer = [];
    for(let m of dobArr){
      max_outer.push(Math.max(...m))
    }
 
  // get addition
let addition = [];
 
for(let m of dobArr){
  addition.push(m.reduce((accumulator, currentValue) => {
    return Number(accumulator + currentValue)
  },0));
 
}  
 
// get the array of reg nos
const regNoArr = [];
myarray.forEach(subArr => {
  const subDobArr = subArr.map(obj => Number(obj.regNo));
  regNoArr.push(subDobArr);
  return regNoArr
});
 
  for (let i = 0; i < myarray.length; i++) {
 
    newOutput['group' + (i + 1)] = {
       
      members: myarray[i],
      oldest: max_outer[i],
      sum: addition[i],
      regNos: regNoArr[i].sort((a,b)=>a-b)
    }
    
  }
 
}
pushInside(newarr)
 
// return final output
return newOutput
}
 
export default classifier;