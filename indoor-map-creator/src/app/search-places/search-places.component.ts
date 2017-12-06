/*
 * This component corresponds to the location (places)
 * search box. It uses Google Map's Places API to get
 * the search done.
 */
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapApiService } from '../services/map-api.service';
declare var google: any;

@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.css']
})
export class SearchPlacesComponent implements OnInit, AfterViewInit {
  // map instance
  map: any;
  // map api instance
  mapApi: GoogleMapsAPIWrapper;
  // reference to search box HTML element
  @ViewChild('searchBox') searchBox: ElementRef;

  constructor(private _mapApiService: MapApiService) {
  }

  ngOnInit() {
    // get the map API instance from mapAPIService
    this._mapApiService.mapApiSource.subscribe(
      (mapApi) => {
        this.mapApi = mapApi;
      });
    // get the map instance from map api instance
    this.mapApi.getNativeMap().then((map: any) => {
      this.map = map;
      // initialize and bind places' search box to HTML text box
      var searchBox = new google.maps.places.SearchBox(this.searchBox.nativeElement);
      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // For each place, get the  name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        // fit bound of map to choosen location
        map.fitBounds(bounds);
      });
    });
  }
  ngAfterViewInit() {
  }
}
