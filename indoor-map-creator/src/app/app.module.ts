import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';
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

import { FormFieldService } from './services/form-field.service';
import { FeatureService } from './services/feature.service';
import { LevelFilterService } from './services/level-filter.service';
import { BeaconReferenceService } from './services/beacon-reference.service';
import { CustomValidatorService } from './services/custom-validators.service';
import { UserService } from './services/user.service';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';
import { TagEditorConfirmDeactivateGuard } from './services/TagEditorConfirmDeactivateGuard';
import { FeatureTypeSelectorConfirmDeactivateGuard } from './services/FeatureTypeSelectorConfirmDeactivateGuard';
import { LoginActivateGuard } from './services/LoginActivateGuard';
import { LevelFilterComponent } from './level-filter/level-filter.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';

const routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: SearchPlacesComponent, canActivate: [LoginActivateGuard] },
  { path: 'select-feature/:selectedGeomType/:refId', component: FeatureTypeSelectorComponent, canDeactivate: [FeatureTypeSelectorConfirmDeactivateGuard] },
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
    ConfirmationDialogComponent,
    LoginDialogComponent,
    LoginPageComponent,
    UserAccountComponent,
    CreateProjectDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    LoginDialogComponent,
    UserAccountComponent,
    CreateProjectDialogComponent
  ],
  imports: [
    HttpModule,
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
  providers: [FeatureService, TagEditorConfirmDeactivateGuard, FeatureTypeSelectorConfirmDeactivateGuard, LoginActivateGuard, LevelFilterService, BeaconReferenceService, CustomValidatorService, UserService, FormFieldService],
  bootstrap: [AppComponent]
})
export class AppModule { }
