const express = require('express');
const router = express.Router();

// require the Drone model here
const droneModel = require('./../models/Drone.model');

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here

  // finding all drones in db to display them
  droneModel.find()
  .then(allDrones => {
    console.log(allDrones);
    res.render('drones/list.hbs', { allDrones });
  })
  .catch(e => {
    // making sure the error is properly handled
    next(e);
  })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here

  // loading the create form
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here

  // loading the user's input
  const userInput = req.body;
  console.log(userInput);

  // inserting this new drone into db
  droneModel.create(userInput)
  .then(newDrone => {
    res.redirect('/drones');
  })
  .catch(e => {
    // making sure the error is properly handled
    next(e);
  })

});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
