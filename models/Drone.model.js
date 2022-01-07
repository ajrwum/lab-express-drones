// Iteration #1

// load necessary elements from mongoose
const { model, Schema } = require('mongoose');

// creating the Schema for a drone document
const droneSchema = new Schema({
  name: String,
  propellers: Number,
  maxSpeed: Number
});

// creating the model with the validating schema
const droneModel = model("drone", droneSchema);

module.exports = droneModel;
