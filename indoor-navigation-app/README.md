# Physical Web Indoor Navigator

An indoor navigation application built on top of Google Maps. Uses GeoJSON for mapping hospital building features and Physical Web beacons for localization.

## To run
Install dependencies:
```
npm install
```
Build & run:
```
ng serve
```
## Changing GeoJSON
This application make use of GeoJSON data to render features on to of map. 
The GeoJSON source can be set in the environment.ts file:
```
src/environments/environment.ts
```
Source can be a URL to a file placed in `assets` folder or a URL to a project created by the [Indoor Map Creator](https://github.com/vipinraj/pw-hospital-routing/tree/master/indoor-map-creator)
