## Physical Web Indoor Map Creator API
REST API to be used by the [Indoor Map Creator](https://github.com/vipinraj/pw-hospital-routing/tree/master/indoor-map-creator) to persist map data in database and to expose GeoJSON resource URLs to be consumed by [Indoor Navigator](https://github.com/vipinraj/pw-hospital-routing/tree/master/indoor-navigation-app).

### To run
Install dependencies:
```
npm install
```
Build & run:
```
npm start
```
### To change the database
Change connection string in the `mongoose.connect('mongodb://localhost/indoorMapDb');` in `server.js` file.
