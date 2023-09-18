const express = require('express');

const apiController = require('../Controllers/apiController')

const router = express.Router();

router.post('/', apiController.getLatLong, apiController.getItinerary, (req, res) => {

  console.log('finished post request')
  return res.status(201).json(res.locals.itinerary);
})

module.exports = router;