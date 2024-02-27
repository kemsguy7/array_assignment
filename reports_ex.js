// Step 1: Import required modules
const { getDriver, getVehicle, getTrips } = require('api');

/**
 * This function should return the data for drivers in the specified format
 *
 * Question 4
 *
 * @returns {any} Driver report data
 */

async function driverReport() {
  try {
    // Step 2: Fetch the trips using the getTrips function
    const trips = await getTrips();
    const drivers = {}; // Object to store driver data

    // Step 3: Process each trip and organize data by driver
    for (const trip of trips) {
      const driverID = trip.driverID;

      // Step 4: Check if the driverID is encountered for the first time, initialize driver data
      if (!drivers[driverID]) {

        /* 
            The code checks if a driver with the 
            current driverID already exists in the drivers object.
        */


        // Step 5: Initialize driver data with details fetched using getDriver
        const driverInfo = await getDriver(driverID);

        /* 
        
        Assign 
        the initialized driver data object to the drivers object with the driverID as the key. 
        This ensures that the data for each driver is organized under their unique ID.
        */

        drivers[driverID] = {
          fullName: driverInfo.name,
          id: driverID,
          phone: driverInfo.phone,
          noOfTrips: 0,
          noOfVehicles: 0,
          vehicles: [],
          noOfCashTrips: 0,
          noOfNonCashTrips: 0,
          totalAmountEarned: 0,
          totalCashAmount: 0,
          totalNonCashAmount: 0,
          trips: [],
        };
      }

      // Step 6: Update driver data based on the current trip
      drivers[driverID].noOfTrips++;
      drivers[driverID].totalAmountEarned += trip.billedAmount;

        /* 
            Update Trip Counts: For each trip, increment the noOfTrips counter for the respective driver. 
            Also, add the billed amount of the current trip to the totalAmountEarned for that driver.
        */

      // Step 7: Categorize trips as cash or non-cash and update respective counters
      if (trip.isCash) {

            /* 
            
                Check if the current trip is a cash trip (trip.isCash). 
                If it is, update the counters related to cash trips (noOfCashTrips 
                and totalCashAmount). If it's a non-cash trip, update the counters related 
                to non-cash trips (noOfNonCashTrips and totalNonCashAmount).
            */
        drivers[driverID].noOfCashTrips++;
        drivers[driverID].totalCashAmount += trip.billedAmount;
      } else {
        drivers[driverID].noOfNonCashTrips++;
        drivers[driverID].totalNonCashAmount += trip.billedAmount;
      }

      // Step 8: Add the details of the current trip to the driver's trips array
      drivers[driverID].trips.push({
        user: trip.userName,
        created: trip.created,
        pickup: trip.pickupAddress,
        destination: trip.destinationAddress,
        billed: trip.billedAmount,
        isCash: trip.isCash,
      });
    }

    // Step 9: Get vehicle information for each driver
    for (const driverID in drivers) {
      const driver = drivers[driverID];

      /* 
        Use the getDriver function to retrieve detailed information about the driver, 
        including associated vehicle IDs.
      */
      const driverInfo = await getDriver(driverID);

      // Step 10: Fetch vehicle information for each associated vehicle ID
      driver.noOfVehicles = driverInfo.vehicleID.length;
        /* 
            Update the noOfVehicles property of the current driver with the
             length of the array of associated vehicle IDs (driverInfo.vehicleID).
        */

      for (const vehicleID of driverInfo.vehicleID) {

        /* 
            Use the getVehicle function to retrieve details about the 
            specific vehicle associated with the current ID.
        */
        const vehicleInfo = await getVehicle(vehicleID);
        
        driver.vehicles.push({

            /* 
                Add the details of the vehicle (plate and manufacturer) to the vehicles array of the driver.
            */
          plate: vehicleInfo.plate,
          manufacturer: vehicleInfo.manufacturer,
        });
      }
    }

    // Step 11: Convert the drivers object into an array
    const driverArray = Object.values(drivers);

    /*
    Use the Object.values() method to convert the drivers object 
    (which contains driver information organized by driver ID) into an array.
     This array (driverArray) will contain the individual driver objects,
      allowing for easier handling and manipulation of the driver data.

    */

    // Step 12: Log the driverArray to the console (or return it, depending on your use case)
    console.log(driverArray);
  } catch (error) {
    // Step 13: Handle any errors that may occur during the process
    throw error;
  }
}


// Step 14: Export the driverReport function
module.exports = driverReport;
