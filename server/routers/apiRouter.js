const express = require('express');

const apiController = require('../Controllers/APIController')

const router = express.Router();

router.post('/details', (req, res) => {
  console.log('Responded with photos and ratings for requested locations');
  return res.status(401).json({
    msg: 'Middleware hasn\'t been set up yet :('
  });
})

router.post('/', apiController.getLatLong, apiController.getItineraryInfo, apiController.getItineraryDetails, apiController.compileItinerary, (req, res) => {
  console.log('Responded with Itinerary')
  return res.status(201).json(res.locals.itinerary);
})

module.exports = router;