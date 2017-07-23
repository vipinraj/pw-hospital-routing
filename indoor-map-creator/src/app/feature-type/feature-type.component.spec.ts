import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTypeComponent } from './feature-type.component';

describe('FeatureTypeComponent', () => {
  let component: FeatureTypeComponent;
  let fixture: ComponentFixture<FeatureTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
