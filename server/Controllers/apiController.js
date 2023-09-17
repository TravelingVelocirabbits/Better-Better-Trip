const { split } = require('postcss/lib/list');
const {Location} = require('../Models/userModel');

const geoCoderKey = 'VVNfZmE1NmNiODg5MWM3NGM4NmI3NWVkOGYxNjUwZWQxMjM6MWFiOTk3MzctZGZkMC00NzlmLTljYmItZDYyMTZlMjEyZWYw';
const tripAdvisorKey = '1E8652C75A5F4F3F8B12A9EE2EF42B04';

const apiController = {};

apiController.getLatLong = async (req, res, next) => {

  const {location} = req.body;
  const splitLocation = location.split(',');
  const city = splitLocation[0].trim();
  const country = splitLocation[1].trim();

  const latLong = await fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${city}%2C%20${country}&apiKey=${geoCoderKey}`)
  .then(response => response.json())
  .then(data => {

    const {latitude, longitude} = data.locations[0].referencePosition;

    return {
      latitude,
      longitude,
    }

  }).catch(err => {
    return next({
      log: 'Express error caught in apiController.getLatLong',
      message: {err: 'Jesus'}
    })
  })

  res.locals.coords = latLong;
  res.locals.cityCountry = { city, country }

  return next();
}

apiController.getItinerary = async (req, res, next) => {

  const { latitude, longitude } = res.locals.coords;
  const coords = `${latitude},${longitude}`

  let locationData = await Location.findOne({coords})


  if (!locationData) {
    console.log('LOCATION DOESN\'T EXIST IN DB')
    const itineraryData = {
      hotels: [],
      restaurants: [],
      attractions: [],
    }
  
    const categories = ['hotels', 'restaurants', 'attractions'];
  
    const fetchPromises = categories.map(async (category, i) => {
      const response = await fetch(`https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${latitude}%2C${longitude}&key=${tripAdvisorKey}&category=${category}&radius=10&radiusUnit=mi&language=en`);
      const data = await response.json();
  
      data.data.forEach(location => {
        const { location_id, name, distance, bearing } = location;
        const address = location.address_obj.address_string;
  
        itineraryData[category].push({ location_id, name, distance, bearing, address });
      });
  
      return data;
    });
  
    try {
      await Promise.all(fetchPromises);
      
      const { city, country } = res.locals.cityCountry
      const newLocation = new Location({ city, country, coords });
      await newLocation.save();
      
      await Location.updateOne({ coords }, { $push: { hotels: { $each: itineraryData.hotels } } });
      await Location.updateOne({ coords }, { $push: { restaurants: { $each: itineraryData.restaurants } } });
      await Location.updateOne({ coords }, { $push: { attractions: { $each: itineraryData.attractions } } });
      
      locationData = await Location.findOne({ coords });
    } catch (err) {
      return next({
        log: 'Error in APIController',
        status: err.status || 500,
        message: { err: err }
      });
    }
  } else {
    console.log('LOCATION ALREADY EXISTS')
  }

  const itinerary = [];
  
  for (let i = 0; i < 5; i++) {
    let day = {
      hotel: {
        name: locationData.hotels[i].name,
        distance: locationData.hotels[i].distance,
        bearing: locationData.hotels[i].bearing,
        address: locationData.hotels[i].address,
      },
      restaurant: {
        name: locationData.restaurants[i].name,
        distance: locationData.restaurants[i].distance,
        bearing: locationData.restaurants[i].bearing,
        address: locationData.restaurants[i].address,
      },
      attraction: {
        name: locationData.attractions[i].name,
        distance: locationData.attractions[i].distance,
        bearing: locationData.attractions[i].bearing,
        address: locationData.attractions[i].address,
      },
    }

    itinerary.push(day);
  }

  res.locals.itinerary = itinerary;
  return next();
}

module.exports = apiController;
