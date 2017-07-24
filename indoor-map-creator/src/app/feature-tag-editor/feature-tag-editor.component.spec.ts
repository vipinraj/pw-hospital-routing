import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTagEditorComponent } from './feature-tag-editor.component';

describe('FeatureTagEditorComponent', () => {
  let component: FeatureTagEditorComponent;
  let fixture: ComponentFixture<FeatureTagEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureTagEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTagEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
