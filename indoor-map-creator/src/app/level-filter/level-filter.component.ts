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
    levelFilterService.levelList$.subscribe(
      (items) => {
        this.levels = items;
        // console.log(items);
      }, (error: any) => {
        // console.log(error);
      }, () => console.log('Complete')
    );
  }

  ngOnInit() {
  }

  onFilterChange(event) {
    console.log(event.value);
    this.onFilterChanged.emit(event.value);
  }
}
