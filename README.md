# Physical Web Hospital Routing Project
This project is done as part of the [Google Summer of Code 2017](https://summerofcode.withgoogle.com/projects/#5755385163022336) program.
The basic idea of this project is to build a solution with which users can easily navigate inside hospitals using an application in his/her smartphone/tablet/laptop. The application will show the indoor map of the hospital with the position of the user highlighted and updated as he/she move within the building. This solution does not require GPS but uses Physical Web beacons for positioning.
## Core technologies
###### Physical Web beacons
Bluetooth Low Energy based beacons which advertises URLs which can be scanned by nearby devices.
###### Web Bluetooth API
A JavaScript API available as part of the Chrome Browser which lets users to directly interact with BLE beacons nearby.
###### Google Map API
API provided by Google to programmatically render maps as well as to interact with maps.
###### Simple Indoor Tagging
An indoor tagging schema for indoor mapping.
###### GeoJSON
An open standard for representing geographical features in JSON format along with their non-spatial attributes (tags).
###### Angular
Framework for building interactive single page web applications.
## Architecture
This solution contains three components:
- Indoor Navigator
    - Provides indoor map of a building with ability to switch between levels (floors). Also, lets used to find their current location by highlighting the nearest feature (room, corridor, etc) based on the proximity of the Physical Web Beacon.
- Indoor Map Creator
    - Provides a DIY based GUI to build indoor maps of buildings with multiple floors. Provides option to attach a Physical Web Beacon reference number to all features to enable beacon based navigation.
- Indoor Map Creator API
    - REST API to be consumed by the Indoor Map Creator to persist the data as well as the Indoor Navigator to consume GeoJSON

## License

MIT © [Vipin Raj](https://www.linkedin.com/in/vipin-raj-94422476/)

<p align="center">
  <img src="https://lh5.googleusercontent.com/_uwWzNbZjbpgSICWTqjo2Yn-b3lzj2y-Um8XbhXyhRAMecshGI0PnGK6N0fU2IDFTFvdg7d3kbKq-5CQKYgtpavztSCeC33QGvs2-AHM0csx5kc-RwleCIHysG47FfrH6uvDl82Z" width="250px" alt="Google Summer of Code" />
</p>
