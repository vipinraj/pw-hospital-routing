import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
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
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { TagEditorConfirmDeactivateGuard } from './services/TagEditorConfirmDeactivateGuard';
import { LayerFilterComponent } from './layer-filter/layer-filter.component';

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
    LayerFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
  providers: [FeatureService, TagEditorConfirmDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
