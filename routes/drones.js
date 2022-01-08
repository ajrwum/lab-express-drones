const express = require('express');
const router = express.Router();

// loading mongoose to check documents' id
const mongoose = require('mongoose');

// require the Drone model here
const droneModel = require('./../models/Drone.model');

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here

  console.log('--- --- /drones - GET');
  // finding all drones in db to display them
  droneModel.find()
  .then(allDrones => {
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

  console.log('--- --- /drones/create - GET');
  // loading the create form
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here

  console.log('--- --- /drones/create - POST');
  // loading the user's input
  const userInput = req.body;

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

  console.log('--- --- /drones/:id/edit - GET');
  // loading the drone to display it for update
  droneModel.findById(req.params.id)
  .then(drone => {
    // rendering the uopdate form, passing the drone to update
    res.render(`drones/update-form`, { drone });
  })
  .catch(e => {
    // making sure the error is properly handled
    next(e);
  })
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here

  console.log('--- --- /drones/:id/edit - POST');
  // checking the id
  if (mongoose.isValidObjectId(req.params.id)) {
    // updating the drone in the db
    droneModel.findByIdAndUpdate(req.params.id, req.body)
    .then(updated => {
      // redirecting to the list of
      res.redirect('/drones');
    })
    .catch(e => {
      // making sure the error is properly handled
      next(e);
    })
  }
  else {
    try {
      // throwing an error to pass to next()
      throw new Error('Invalid id');
    }
    catch (e) {
      // making sure the error is properly handled
      next(e);
    }
  }
});

// --- HELPER FUNCTION to delete a drone
const deleteDrone = async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here

  // retrieving the drone id in req.params
  const id = req.params.id;
  // console.log(`--- helper function: deleteDrone - ${req.method} - ${id}`);
  try {
    // checking the id
    if (mongoose.isValidObjectId(id)) {
      // updating the drone in the db
      await droneModel.findByIdAndDelete(id)
      // redirecting to the list of
      res.redirect('/drones');
    }
    else {
      // throwing an error to pass to next()
      throw new Error('Invalid id');
    }  
  }
  catch (e) {
    // making sure the error is properly handled
    next(e);
  }
}

// --- GET version - when triggered via a <a> tag
router.get('/drones/:id/delete', deleteDrone);
// --- POST version - when triggered via a <button> tag in a form with post method
router.post('/drones/:id/delete', deleteDrone);


module.exports = router;
