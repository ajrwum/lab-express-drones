// Iteration #1

// some init
const drones = [
  {
    name: "Creeper XL 500",
    propellers: 3,
    maxSpeed: 12
  },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
];

// conecting to the db by executing the db config file
require('./../db/index');

// loading the model to validate the data to seed
const droneModel = require('../models/Drone.model');

// setting the function as an IIFE
(async function() {
  try{
    // being at dev stage, cleaning first th db
    const { deletedCount } = await droneModel.deleteMany();
    console.log(`DB clean successful: ${deletedCount} deleted.`);

    // now inserting the data
    const created = await droneModel.create(drones);
    console.log(`DB seeding successful: ${created.length} created`);

    // exiting the seeding process and closing the db connection
    process.exit();
  }
  catch (e) {
    console.error(e);
    // exiting the seeding process and incidentally closing the db connection 
    process.exit();
  }
})();

