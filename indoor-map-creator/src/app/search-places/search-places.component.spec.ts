import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlacesComponent } from './search-places.component';

describe('SearchPlacesComponent', () => {
  let component: SearchPlacesComponent;
  let fixture: ComponentFixture<SearchPlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
