

// Import necessary functions from the 'api' module
const { getTrips, getDriver } = require('api');

/**
 * This function analyzes trip data and returns various statistics.
 *
 * @returns {Promise} Analysis results including the number of trips, billed amounts, and driver information.
 */
async function analysis() {
  try {
    // Step 1: Fetch trip data using the getTrips function
    const trips = await getTrips();


    /* 
    
    This line is using destructuring assignment in JavaScript to import specific functions (getTrips and getDriver) from a module named 'api'.
     Here's a detailed explanation:

    require('api'): This part of the line is using the require function, which is a common way in Node.js to import modules.
    In this case, it's importing the module named 'api'.

    { getTrips, getDriver }: This part is using destructuring assignment to extract specific functions (getTrips and getDriver) 
    from the 'api' module. It means you want to create local variables named getTrips and getDriver that 
    reference the functions with the same names from the 'api' module.
    
    */





    // Step 2: Identify cash and non-cash trips
    const cashTrips = trips.filter((trip) => trip.isCash === true);
    const nonCashTrips = trips.filter((trip) => trip.isCash === false);

    // Step 3: Calculate total billed amounts for all trips, cash trips, and non-cash trips
    const sumTotalBilled = trips.reduce((accumulator, trip) => {
      return accumulator + parseFloat(trip.billedAmount.replaceAll(",", ""));
    }, 0);

    const sumTotalCashBilled = cashTrips.reduce((accumulator, trip) => {
      return accumulator + parseFloat(trip.billedAmount.replaceAll(",", ""));
    }, 0);

    const sumNonTotalCashBilled = nonCashTrips.reduce((accumulator, trip) => {
      return accumulator + parseFloat(trip.billedAmount.replaceAll(",", ""));
    }, 0);


    // Step 4: Map and fetch unique driver IDs
    const driverIds = trips.map((trip) => trip.driverID);
    const driverUnique = [...new Set(driverIds)];

    /* 
    This code creates a new array (driverIds) by mapping over each trip in the trips array and extracting the driverID property. 
    So, driverIds will contain an array of driver IDs.
    
    const driverUnique = [...new Set(driverIds)];
    This line uses the Set object in JavaScript to create a 
    unique set of driver IDs. new Set(driverIds) initializes a Set with the elements of driverIds, and [... ] is the spread syntax that converts the Set back into an array (driverUnique).

    
    */


    let driverCont = [];
 
    //fetch unique driver data from drivers list
   
    driverUnique.forEach((driver) => {
      // Step 5: Get driver information using the 'getDriver' function for each unique driver ID
      
      let driverInfo = getDriver(driver);
      // Step 6: Push the obtained driver information promise to the 'driverCont' array
      driverCont.push(driverInfo);
    });

    
    // settle all promises to remove error code
    let driverContainer = await Promise.allSettled(driverCont);
    
    /* after settling promises, the container 
    is mutated and shows a property of status and the rest of 
    the driver's info falls into a property called value
    
    */

    /* 
    Promise.allSettled is a method that takes an array of promises and returns a 
    new promise that is fulfilled with an array of promise 
    state descriptors. It is "settled" when all the promises in the array are either fulfilled or rejected.
    */



    /*

        It ensures that the driver information promises for all unique drivers are settled (either fulfilled or rejected) 
        before moving on to the next steps in the code.
        It allows you to handle each promise's result individually, even if some promises are rejected 
        (e.g., if the getDriver function encounters an error for a specific driver).
        So, in summary, await Promise.allSettled(driverCont) is used to manage multiple promises concurrently, 
        ensuring that the script can proceed with the next steps after all 
        driver information promises have been resolved, regardless of whether they were fulfilled or rejected.

    */



    // filter out only drivers with fulfilled promises and map/extract the values of the driver info
    const fulfilledDrivers = driverContainer
      .filter((result) => result.status == "fulfilled")
      .map((result) => result.value);
    
    // get count of drivers with multiple vehicles, reducing by passing in the conditions of the length of the vehicle array
    const multiVehicles = fulfilledDrivers.reduce((acc, obj) => {
      // Step 3: Check if a driver has more than one vehicle by examining the length of the vehicle array
      if (obj.vehicleID.length > 1) {
        // If a driver has more than one vehicle, increment the accumulator
        return (acc += 1);
      } else {
        // If a driver has one or no vehicle, return the accumulator unchanged
        return acc;
      }
    }, 0);
    
    // Get count of all occurrences of the driver's trips as an object
    let count = {};
    
    // identify Driver ID with the highest number of occurrences => trips
    driverIds.forEach(function (i) {

        /* 
            The driverIds array is created earlier in the script is created above (line 65)

        */


      // Step 4: Count the occurrences of each driver ID in the 'driverIds' array
      count[i] = (count[i] || 0) + 1;
    });
    
    // convert to an array to sort in descending order
    const countEntries = Object.entries(count);
    
    const sortedEntries = countEntries.sort((a, b) => b[1] - a[1]);
    
    const maxDriverID = sortedEntries[0][0].toString();
    const maxDriverTrips = sortedEntries[0][1];

    /*  
        sortedEntries[0][0]: This accesses the first element of the sorted array, 
        which is itself an array [key, value]. 
        Here, it retrieves the driver ID (key) of the driver with the most trips.
    sortedEntries[0][1]: 
    This retrieves the count of trips (value) for the driver with the most trips.
    
    */

    /*  
   
        The result is that maxDriverID contains the driver ID with the most trips, and maxDriverTrips contains the count of trips for that driver. These values are then used to extract additional information about the driver,
         such as their name and total amount earned, in the subsequent parts of the script.
    */


    
    // extract driver information of the driver with the most no of trips
    const maxDriverDetails = await getDriver(maxDriverID);

    /* 
        maxDriverID: This variable holds the driver ID of the driver with the most trips. It was previously
         determined by sorting the counts of trips for each driver.
    
    */

    
    // extract the total amount earned from trips
    const maxDriverBilled = trips.reduce((accumulator, obj) => {

        

      // Step 5: Sum up the billed amount for the trips of the driver with the most trips
      if (obj.driverID == maxDriverID && typeof obj.billedAmount === "string") {
        return accumulator + parseFloat(obj.billedAmount.replaceAll(",", ""));
      } else if (obj.driverID == maxDriverID && typeof obj.billedAmount === "number") {
        return accumulator + obj.billedAmount;
      } else {
        return accumulator;
      }
    }, 0);
    

    const driverTotalContainer = [];
    // Loop through unique drivers and filter the trips of each unique driver into an array of trips
    for (const key of driverUnique) {

      // filter out the trips whose driver ID matches the driverIDs in the unique ID list
      const tripsPerDriver = trips.filter((trip) => trip.driverID == key);

      /* 
      
      trip) => trip.driverID == key: This is an arrow function used as the filtering condition.
       It checks if the driverID property of each trip object is equal to the value of the key variable. 
       The key variable represents a specific driver ID.
      
      */
    
      // Calculate the total billed amount and number of trips for this driver
      const totalAmountEarned = tripsPerDriver.reduce((accumulator, obj) => {
        if (typeof obj.billedAmount === "string") {
          // Step 6: Sum up the billed amount for each trip of the current driver
          return accumulator + parseFloat(obj.billedAmount.replaceAll(",", ""));
        } else if (typeof obj.billedAmount === "number") {
          return accumulator + obj.billedAmount;
        } else {
          return accumulator;
        }
      }, 0);
    
      const noOfTrips = tripsPerDriver.reduce((trip) => {
        return tripsPerDriver.length;
      }, 0);
    
      // push unique driver IDs, total amount earned, and no of trips
      driverTotalContainer.push({
        driverID: key,
        totalAmount: totalAmountEarned,
        noOfTrips: noOfTrips,
      });
    }
    
    driverTotalContainer.sort((a, b) => b.totalAmount - a.totalAmount);
    
    // after sorting in descending order, the highest-earning driver is the driver in index 0
    const highestDriver = driverTotalContainer[0].driverID;
    
    // Retrieve the information of the highest-earning driver
    const highestDriverInfo = await getDriver(highestDriver);
    
    // Step 7: Create an output object with the required data
    const output = {
      noOfCashTrips: cashTrips.length,
      noOfNonCashTrips: nonCashTrips.length,
      billedTotal: parseFloat(sumTotalBilled.toFixed(2)),
      cashBilledTotal: sumTotalCashBilled,
      nonCashBilledTotal: parseFloat(sumNonTotalCashBilled.toFixed(2)),
      noOfDriversWithMoreThanOneVehicle: multiVehicles,
      mostTripsByDriver: {
        name: maxDriverDetails.name,
        email: maxDriverDetails.email,
        phone: maxDriverDetails.phone,
        noOfTrips: maxDriverTrips,
        totalAmountEarned: maxDriverBilled,
      },
      highestEarningDriver: {
        name: highestDriverInfo.name,
        email: highestDriverInfo.email,
        phone: highestDriverInfo.phone,
        noOfTrips: driverTotalContainer[0].noOfTrips,
        totalAmountEarned: driverTotalContainer[0].totalAmount,
      },
    };
    
    // Step 8: Return the output object
    return output;
    
    // Step 9: Handle errors in case data is not available
    } catch (error) {
      console.error("the data is not available");
    }
    
    // Step 10: Export the 'analysis' function for external use
    }
    
    module.exports = analysis;
    