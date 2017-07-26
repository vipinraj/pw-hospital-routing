import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
declare var google: any;

// takes care of location search
@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.css'],
  providers: []
})
export class SearchPlacesComponent implements OnInit, AfterViewInit {
  map: any;
  @Input() mapApi: GoogleMapsAPIWrapper;
  @ViewChild('searchBox') searchBox: ElementRef;

  constructor() { 
  }

  ngOnInit() {
    console.log(this.searchBox);
    this.mapApi.getNativeMap().then((map: any) => {
      this.map = map;
      var searchBox = new google.maps.places.SearchBox(this.searchBox.nativeElement);
      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          // var icon = {
          //   url: place.icon,
          //   size: new google.maps.Size(71, 71),
          //   origin: new google.maps.Point(0, 0),
          //   anchor: new google.maps.Point(17, 34),
          //   scaledSize: new google.maps.Size(25, 25)
          // };

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
