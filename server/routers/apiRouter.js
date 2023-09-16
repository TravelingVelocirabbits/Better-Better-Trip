const express = require('express');
const apiController = require('../Controllers/APIController.js');
const router = express.Router();

router.post('/', apiController.getLatLong, (req, res) => {

  console.log('finished post request')
  return res.status(201).json(res.locals.coords);
})

module.exports = router;