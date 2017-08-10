import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { MaterialModule, MdNativeDateModule, MdDialogModule } from '@angular/material';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SidePaneComponent } from './side-pane/side-pane.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { SearchPlacesComponent } from './search-places/search-places.component';
import { FeatureTypeSelectorComponent } from './feature-type-selector/feature-type-selector.component';
import { FeatureTagEditorComponent } from './feature-tag-editor/feature-tag-editor.component';

import { FeatureService } from './services/feature.service';
import { LevelFilterService } from './services/level-filter.service';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { TagEditorConfirmDeactivateGuard } from './services/TagEditorConfirmDeactivateGuard';
import { LevelFilterComponent } from './level-filter/level-filter.component';
import { DeleteFeatureDialogComponent } from './delete-feature-dialog/delete-feature-dialog.component';

const routes = [
  { path: '', component: SearchPlacesComponent },
  { path: 'select-feature/:selectedGeomType/:refId', component: FeatureTypeSelectorComponent },
  { path: 'edit-tags/:refId', component: FeatureTagEditorComponent, canDeactivate: [TagEditorConfirmDeactivateGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidePaneComponent,
    ToolBarComponent,
    SearchPlacesComponent,
    FeatureTypeSelectorComponent,
    FeatureTagEditorComponent,
    DynamicFormFieldComponent,
    LevelFilterComponent,
    DeleteFeatureDialogComponent
  ],
  entryComponents : [
    DeleteFeatureDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdDialogModule,
    ReactiveFormsModule,
    AgmCoreModule,
    MaterialModule,
    MdNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCuF0jO6w-aCgx7P28epp7zKGbNJwjlw6g',
      libraries: ['places']
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [FeatureService, TagEditorConfirmDeactivateGuard, LevelFilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
