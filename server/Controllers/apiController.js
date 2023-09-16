const geoCoderKey = 'VVNfZmE1NmNiODg5MWM3NGM4NmI3NWVkOGYxNjUwZWQxMjM6MWFiOTk3MzctZGZkMC00NzlmLTljYmItZDYyMTZlMjEyZWYw';
const tripAdvisorKey = '1E8652C75A5F4F3F8B12A9EE2EF42B04'

const apiController = {};

apiController.getLatLong = async (req, res, next) => {

  const { city, country } = req.body;

  console.log('Hittin this shit')

  const latLong = await fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${city}%2C%20${country}&apiKey=${geoCoderKey}`)
  .then(response => response.json())
  .then(data => {

    console.log('API data', data)

    const {latitude, longitude} = data.locations[0].referencePosition;

    return {
      latitude,
      longitude,
    }

  }).catch(err => {
    
    return next({
      log: 'Express error caught in apiController.getLatLong',
      message: {err: 'API is broken'}
    })
  })

  res.locals.coords = latLong;
  return next();
}

apiController.getItinerary = (req, res, next) => {
  const { latitude, longitude } = res.locals.coords;

  


}



module.exports = apiController