const express = require('express');
const TAvalues = require('../models/TAvalues');

const Parameters = [
  { id: 1, text: "Blood Sugar", min: 70, max: 160 },
  { id: 2, text: "Haemoglobin", min: 8, max: 20 },
  { id: 3, text: "Temperature", min: 35, max: 42 },
  { id: 4, text: "Blood Pressure", min: 70, max: 160 },
];

module.exports = Parameters;