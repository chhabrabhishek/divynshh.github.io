import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalStatusComponent } from './animal-status/animal-status.component';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    AppComponent,
    AnimalStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhFTNcSaK1b8WKNHzRNdet8FhIPb_nmi0'
    }),
    BrowserAnimationsModule
  ],  exports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [MarkerManager,GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
