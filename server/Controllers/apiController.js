const { split } = require('postcss/lib/list');
const {Location} = require('../Models/userModel');

const geoCoderKey = 'VVNfZmE1NmNiODg5MWM3NGM4NmI3NWVkOGYxNjUwZWQxMjM6MWFiOTk3MzctZGZkMC00NzlmLTljYmItZDYyMTZlMjEyZWYw';
const tripAdvisorKey = '1E8652C75A5F4F3F8B12A9EE2EF42B04';

const apiController = {};

apiController.getLatLong = async (req, res, next) => {

  res.locals.TESTING = true;

  if (res.locals.TESTING === true) {
    res.locals.itinerary = [
      {
          "hotel": {
              "name": "Hilton Sydney",
              "distance": 0.14820227397979185,
              "bearing": "south",
              "address": "488 George St, Sydney, New South Wales 2000 Australia",
              "photo": "https://media-cdn.tripadvisor.com/media/photo-s/26/74/7f/cc/exterior.jpg",
              "rating": "4.0"
          },
          "restaurant": {
              "name": "Crust Gourmet Pizza",
              "distance": 0.004749549185602223,
              "bearing": "south",
              "address": "Pitt Street Mall Level 5 Westfield Centrepoint Shopping Mall, Sydney, New South Wales 2000 Australia",
              "photo": "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg",
              "rating": "3.0"
          },
          "attraction": {
              "name": "Astra Chauffeur Drive",
              "distance": 0.003694093811023952,
              "bearing": "north",
              "address": "Unit 309 Pitt Street Level 8, Sydney, New South Wales 2000 Australia",
              "photo": "https://media-cdn.tripadvisor.com/media/photo-s/0f/cc/8f/09/2017-bmw-7-series-m-sport.jpg",
              "rating": "4.0"
          }
      },
      {
          "hotel": {
              "name": "Criterion Hotel Sydney",
              "distance": 0.24832061902400204,
              "bearing": "south",
              "address": "260 Pitt St Cnr Park Street, Sydney, New South Wales 2000 Australia",
              "photo": "https://media-cdn.tripadvisor.com/media/photo-s/1b/cf/0b/35/criterion-hotel-sydney.jpg",
              "rating": "2.5"
          },
          "restaurant": {
              "name": "Romolos Cafe and Cucina",
              "distance": 0.035910116101833596,
              "bearing": "northwest",
              "address": "Shop 24 G 412-414 George St Strand Arcade, Sydney, New South Wales 2000 Australia",
              "photo": "https://media-cdn.tripadvisor.com/media/photo-p/14/30/33/9a/photo1jpg.jpg",
              "rating": "3.5"
          },
          "attraction": {
              "name": "Tresors",
              "distance": 0.041942254226201535,
              "bearing": "northwest",
              "address": "412 George St The Strand Arcade, Shop 30A, Sydney, New South Wales 2000 Australia",
              "photo": "https://media-cdn.tripadvisor.com/media/photo-s/15/e7/c3/61/this-is-the-entrance.jpg",
              "rating": "5.0"
          }
      },
      {
          "hotel": {
              "name": "Hotel Coronation",
              "distance": 0.23104783887290656,
              "bearing": "south",
              "address": "5 -7 Park St, Sydney, New South Wales 2000 Australia",
              "photo": "https://media-cdn.tripadvisor.com/media/photo-s/03/15/5b/aa/hotel-coronation.jpg",
              "rating": "4.0"
          },
          "restaurant": {
              "name": "Gumption by Coffee Alchemy",
              "distance": 0.03766848669445824,
              "bearing": "northwest",
              "address": "Shop 11 G 412-414 George St, Sydney, New South Wales 2000 Australia",
              "photo": "https://media-cdn.tripadvisor.com/media/photo-p/0c/34/17/24/gumption-by-coffee-alchemy.jpg",
              "rating": "4.0"
          },
          "attraction": {
              "name": "Aesop",
              "distance": 0.041942254226201535,
              "bearing": "northwest",
              "address": "412 - 414 George St The Strand Arcade, Sydney, New South Wales 2000 Australia",
              "photo": "https://media-cdn.tripadvisor.com/media/photo-s/0e/d6/0d/7a/aesop.jpg",
              "rating": "4.0"
          }
      }
    ];
    return next();
  }

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
      message: {err: err}
    })
  })

  res.locals.coords = latLong;
  res.locals.cityCountry = { city, country }

  return next();
}

apiController.getItineraryInfo = async (req, res, next) => {

  if (res.locals.TESTING === true) {
    return next();
  }

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
    
    // res.locals.photos = [];

    const categories = ['hotels', 'restaurants', 'attractions'];
  
    const fetchPromises = categories.map(async (category) => {
      const response = await fetch(`https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=${latitude}%2C${longitude}&key=${tripAdvisorKey}&category=${category}&radius=10&radiusUnit=mi&language=en`);
      const data = await response.json();
  
      for (let i = 0; i < 3; i++) {
        const { location_id, name, distance, bearing } = data.data[i];
        const address = data.data[i].address_obj.address_string;

        // const response = await fetch(`https://api.content.tripadvisor.com/api/v1/location/${location_id}/photos?key=${tripAdvisorKey}&language=en`);
        // const fetchData = await response.json();

        // let photo; 
        // if (!fetchData.data[0]) {
        //   photo = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';
        // }
        // else photo = fetchData.data[0].images.large.url;

        // res.locals.photos.push({category, location_id, name, photo});
  
        itineraryData[category].push({ locationID: location_id, name, distance, bearing, address });
      };

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

    res.locals.itineraryData = itineraryData

  } else {
    console.log('LOCATION ALREADY EXISTS')
  }

  res.locals.locationData = locationData;
  
  // const itinerary = [];
  
  // for (let i = 0; i < 3; i++) {
  //   let day = {
  //     hotel: {
  //       name: locationData.hotels[i].name,
  //       distance: locationData.hotels[i].distance,
  //       bearing: locationData.hotels[i].bearing,
  //       address: locationData.hotels[i].address,
  //       // photo: locationData.hotels[i].photo || false,
  //     },
  //     restaurant: {
  //       name: locationData.restaurants[i].name,
  //       distance: locationData.restaurants[i].distance,
  //       bearing: locationData.restaurants[i].bearing,
  //       address: locationData.restaurants[i].address,
  //     },
  //     attraction: {
  //       name: locationData.attractions[i].name,
  //       distance: locationData.attractions[i].distance,
  //       bearing: locationData.attractions[i].bearing,
  //       address: locationData.attractions[i].address,
  //     },
  //   }

  //   itinerary.push(day);
  // }

  // res.locals.itinerary = itinerary;

  // console.log('LOCATION DATA: ', locationData)
  return next();
}

apiController.getItineraryDetails = async (req, res, next) => {

  if (res.locals.TESTING === true) {
    return next();
  }

  // console.log('Itin Data', res.locals.itineraryData)
  // console.log('Loca Data', res.locals.locationData)

  const photoPromises = [];
  const ratingPromises = [];

  for (let category in res.locals.itineraryData) {

    const categoryArray = res.locals.itineraryData[category];

    categoryArray.forEach( async location => {
      // PHOTOS
      const photoPromise = fetch(`https://api.content.tripadvisor.com/api/v1/location/${location.locationID}/photos?key=${tripAdvisorKey}&language=en`)
      .then(response => response.json())
      .then(fetchData => {
        let photo;
        if (!fetchData.data[0]) {
          photo = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';
        }
        else photo = fetchData.data[0].images.large.url;

        return { locationID: location.locationID, name: location.name, photo };
      })

      const ratingPromise = fetch(`https://api.content.tripadvisor.com/api/v1/location/${location.locationID}/details?key=${tripAdvisorKey}&language=en&currency=USD`)
      .then(response => response.json())
      .then(fetchData => {
        const rating = fetchData.rating;

        return { locationID: location.locationID, name: location.name, rating };
      })

      photoPromises.push(photoPromise);
      ratingPromises.push(ratingPromise);

      })
    }

  const photos = await Promise.all(photoPromises);
  const ratings = await Promise.all(ratingPromises);

  res.locals.photos = photos
  res.locals.ratings = ratings


  // console.log('res.locals.photos: ', res.locals.photos)
  // console.log('res.locals.ratings: ', res.locals.ratings)

  return next();

}

apiController.compileItinerary = async (req, res, next) => {

  if (res.locals.TESTING === true) {
    return next();
  }

  const itinerary = [];
  
  for (let i = 0; i < 3; i++) {
    let day = {
      hotel: {
        name: res.locals.locationData.hotels[i].name,
        distance: res.locals.locationData.hotels[i].distance,
        bearing: res.locals.locationData.hotels[i].bearing,
        address: res.locals.locationData.hotels[i].address,
        photo: res.locals.photos[i].photo,
        rating: res.locals.ratings[i].rating,
      },
      restaurant: {
        name: res.locals.locationData.restaurants[i].name,
        distance: res.locals.locationData.restaurants[i].distance,
        bearing: res.locals.locationData.restaurants[i].bearing,
        address: res.locals.locationData.restaurants[i].address,
        photo: res.locals.photos[3 + i].photo,
        rating: res.locals.ratings[3 + i].rating,
      },
      attraction: {
        name: res.locals.locationData.attractions[i].name,
        distance: res.locals.locationData.attractions[i].distance,
        bearing: res.locals.locationData.attractions[i].bearing,
        address: res.locals.locationData.attractions[i].address,
        photo: res.locals.photos[6 + i].photo,
        rating: res.locals.ratings[6 + i].rating,
      },
    }

    itinerary.push(day);
  }

  res.locals.itinerary = itinerary;

  return next();
}


module.exports = apiController;

/*

Loca Data {
[1]   _id: new ObjectId("650799451c4e44d37ddd62b0"),
[1]   city: 'London',
[1]   country: 'England',
[1]   coords: '51.50642013549805,-0.12721000611782074',
[1]   hotels: [
[1]     {
[1]       name: "St. James's Hotel and Club Mayfair",
[1]       distance: 0.5594212825866821,
[1]       bearing: 'west',
[1]       address: '7-8 Park Place, London SW1A 1LS England',
[1]       _id: new ObjectId("650799451c4e44d37ddd62b2")
[1]     },
[1]     {
[1]       name: 'The Stafford London',
[1]       distance: 0.5469495183910489,
[1]       bearing: 'west',
[1]       address: "16/18 St. James's Place, London SW1A 1NJ England",
[1]       _id: new ObjectId("650799451c4e44d37ddd62b3")
[1]     },
[1]     {
[1]       name: 'John Howard Hotel',
[1]       distance: 0.44304399389974214,
[1]       bearing: 'southwest',
[1]       address: "4 Queen's Gate, London SW7 5EH England",
[1]       _id: new ObjectId("650799451c4e44d37ddd62b4")
[1]     }
[1]   ],
[1]   restaurants: [
[1]     {
[1]       name: 'The Old Shades London Pub & Dining',
[1]       distance: 0.007271366387638832,
[1]       bearing: 'northeast',
[1]       address: '37 Whitehall, London SW1A 2BX England',
[1]       _id: new ObjectId("650799451c4e44d37ddd62b6")
[1]     },
[1]     {
[1]       name: 'Walkers of Whitehall',
[1]       distance: 0.022586730071780747,
[1]       bearing: 'north',
[1]       address: '15 Whitehall Whitehall, London SW1A 2DD England',
[1]       _id: new ObjectId("650799451c4e44d37ddd62b7")
[1]     },
[1]     {
[1]       name: 'The Silver Cross',
[1]       distance: 0.018206055771385884,
[1]       bearing: 'north',
[1]       address: '33 Whitehall, London SW1A 2BX England',
[1]       _id: new ObjectId("650799451c4e44d37ddd62b8")
[1]     }
[1]   ],
[1]   attractions: [
[1]     {
[1]       name: 'The Lord Moon Of the Mall',
[1]       distance: 0.003764160365157071,
[1]       bearing: 'northeast',
[1]       address: '16-18 Whitehall, London England',
[1]       _id: new ObjectId("650799451c4e44d37ddd62ba")
[1]     },
[1]     {
[1]       name: 'Monument To The Raf',
[1]       distance: 0.008251329519604746,
[1]       bearing: 'northeast',
[1]       address: '79 Whitehall, London SW1A 2NL England',
[1]       _id: new ObjectId("650799451c4e44d37ddd62bb")
[1]     },
[1]     {
[1]       name: 'The Old Shades',
[1]       distance: 0.011542878095578368,
[1]       bearing: 'east',
[1]       address: '37 Whitehall, London SW1A 2BX England',
[1]       _id: new ObjectId("650799451c4e44d37ddd62bc")
[1]     }
[1]   ],
[1]   __v: 0
[1] }
*/