
// a. Calculate the minimum number of vehicles required to deliver the parcel for each location
// b. Make the most of the weight that each vehicle can carry. There shouldn't be any wasted space in the vehicle
// For example:
// To deliver to velachery, we will require one auto and two bike (20 + 5(bike) + 5(bike)) = 30
// We can deliver this in two auto (20 + 20) but 10 kg will be wasted in space
// The logic is to find the minimum number of vehicles required to deliver the parcel without wasting space in vehicle


const vehicles = [
  { type: 'cycle', weightCapacity: 1},
  { type: 'bike', weightCapacity: 5 },
  { type: 'auto', weightCapacity: 20 },
  { type: 'ace', weightCapacity: 50 },
  { type: 'tempo', weightCapacity: 100 }
];

const parcels = [
  { location: 'velachery', weight: 30 },
  { location: 'madipakkam', weight: 17 },
  { location: 'sholinganallur', weight: 240 }
];


function calculateMinimumVehiclesRequired(vehicles, parcels) {

    if(!Array.isArray(vehicles) || !Array.isArray(parcels) || vehicles.length === 0 || parcels.length === 0){
      console.error("Invalid input");
      return false;
    }

    //check any invalid data in vehicle array
    if(!vehicles.every((vehicle)=> typeof vehicle.type ==='string' && vehicle.type !== '' && typeof vehicle.weightCapacity === 'number' && !(vehicle.weightCapacity <=0))){
      console.error(`Invalid data in vehicles array`);
      return false;
    }

    const result = {};
    
    //iterate through each parcel
    parcels.forEach((parcel) => {

      const [parcelLocation ,parcelWeight] = [parcel.location, parcel.weight];

      //check type and empty values
      if(typeof parcelLocation !=='string' || !parcelLocation || typeof parcelWeight !=='number' || parcelWeight<=0){
        console.error("Invalid location or parcel weight");
        return false;
      }
      
      //sort vehicles in descending order based on it's weight capacity 
      const sortedVehicles = vehicles.sort((a, b) => b.weightCapacity - a.weightCapacity);
  
      let vehicleIndex = 0;
      let remainingWeight = parcelWeight;
      
      //required vechicles with type and count are stored in "requiredVehicles"
      const requiredVehicles = {};
      
      while (remainingWeight > 0 && vehicleIndex < sortedVehicles.length) {
        //current vehicle details from sorted array of vehicles
        const currentVehicle = sortedVehicles[vehicleIndex];
        const vehicleType = currentVehicle.type;
        const capacity = currentVehicle.weightCapacity;
        
        if (remainingWeight >= capacity) {
          
          //to get non-decimal value to store as count of vehicle
          const count = Math.floor(remainingWeight / capacity);
          
          //check whether the vehicle is already in required vehicles object
          requiredVehicles[vehicleType] = (requiredVehicles[vehicleType] || 0) + count;
          
          //calculate remaining weight to deliver 
          remainingWeight = remainingWeight % capacity;
        }
  
        vehicleIndex++;
      }
      //store ("location : {vehicle : count}") format in result object
      result[parcelLocation] = requiredVehicles;
    });

    return result;
  }
  
  const maximumVehiclesRequired = calculateMinimumVehiclesRequired(vehicles,parcels);
  // console.log(maximumVehiclesRequired);

  for (const location in maximumVehiclesRequired) {
    const requiredVehicles = maximumVehiclesRequired[location];
    console.log(`To deliver to ${location}, we will require ${Object.keys(requiredVehicles).map((type) => `${requiredVehicles[type]} ${type}`).join(' and ')} `);
  }
  
  
  
//remove empty property from "requiredVehicles"
// for(const location in requiredVehicles){
//   if(Object.values(requiredVehicles[location]).length ===0){
//      delete requiredVehicles[location];
//   }
// }


  



0




  