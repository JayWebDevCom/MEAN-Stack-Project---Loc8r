## Loc8r
![CafeLoc8r](https://cdn2.iconfinder.com/data/icons/maps-and-navigation-glyph-2/128/70-512.png)

Loc8r is an example of a fullstack application built in Javascript. It is an express based web application that lists cafes and their corresponding facilities. It also allows for site visitors to leave reviews.

### Description
This application is driven by a mongo database via a mongoose module. It also uses the jade view engine. It demonstrates a great use of Model-View-Controller implementation and routes, controller logic and views are separated and dynamic.

The view files include javascript and HTML mixins meaning that they are dynamic and can render information for a variety of different cafe subjects which have different attributes and characteristics.

The application uses API logic and the request module to effectively make requests to the API segment of its codebase and retrieve and process JSON responses.

### Configuration
Clone this repo
* run `$ npm i`
* run `$ nodemon`
* Navigate to port 3000 of your locally hosted server.

I used the [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) Chrome App to populate the database with entries via a post API route using x-www-form-urlencoded data.

You may need to create a local database first.
```
* $ mongo
* $ use Loc8r;
```

You can also type the following outline as a method for creating new database records.
``` javascript
db.locations.save({
  name: "Joeys",
  address: "156 Orange Grove, Marley, AS1 3ER",
  rating: 3,
  facilities: ["Quizes", "Food", "Premium wifi", "Dating", "Games", "Movies"],
  coords: [-0.965083, 51.855],
  openingTimes: [
    {
      days: "Monday - Friday",
      opening: "7:00am",
      closing: "7:00pm",
      closed: false
    },
    {
      days: "Saturday",
      opening: "10:00am",
      closing: "6:00pm",
      closed: false
    },
    {
      days: "Sunday",
      opening: "11:00am",
      closing: "6:00pm",
      closed: false
    }
  ]
});
```
