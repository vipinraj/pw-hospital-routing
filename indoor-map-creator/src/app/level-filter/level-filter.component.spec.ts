import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelFilterComponent } from './level-filter.component';

describe('LayerFilterComponent', () => {
  let component: LevelFilterComponent;
  let fixture: ComponentFixture<LevelFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
