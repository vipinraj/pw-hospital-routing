import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-layer-filter',
  templateUrl: './layer-filter.component.html',
  styleUrls: ['./layer-filter.component.css']
})
export class LayerFilterComponent implements OnInit {
  @Output() onFilterChanged: EventEmitter<any>;
  constructor() { 
    this.onFilterChanged = new EventEmitter();
  }

  ngOnInit() {
  }

  onFilterChange(event) {
    console.log(event.value);
    this.onFilterChanged.emit(event.value);
  }
}
