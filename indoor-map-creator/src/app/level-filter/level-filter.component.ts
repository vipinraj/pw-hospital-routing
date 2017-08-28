/* 
  This component is responsible for showing the
  layer filter select box.
*/
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LevelFilterService } from '../services/level-filter.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-level-filter',
  templateUrl: './level-filter.component.html',
  styleUrls: ['./level-filter.component.css'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LevelFilterComponent implements OnInit {
  @Output() onFilterChanged: EventEmitter<any>;
  levels: string[];

  constructor(private levelFilterService: LevelFilterService) {
    this.onFilterChanged = new EventEmitter();
    // get the list of levels from levelFilterService
    levelFilterService.levelList$.subscribe(
      (items) => {
        this.levels = items;
      }, (error: any) => {
      }, () => console.log('Complete')
    );
  }

  ngOnInit() {
  }

  onFilterChange(event) {
    this.onFilterChanged.emit(event.value);
  }
}
