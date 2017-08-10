import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFeatureDialogComponent } from './delete-feature-dialog.component';

describe('DeleteFeatureDialogComponent', () => {
  let component: DeleteFeatureDialogComponent;
  let fixture: ComponentFixture<DeleteFeatureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFeatureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFeatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
