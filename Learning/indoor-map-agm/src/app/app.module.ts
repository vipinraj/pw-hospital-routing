import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { MaterializeModule } from "angular2-materialize";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCuF0jO6w-aCgx7P28epp7zKGbNJwjlw6g'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
