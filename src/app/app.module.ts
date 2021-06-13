import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhFTNcSaK1b8WKNHzRNdet8FhIPb_nmi0'
    })
  ],
  providers: [MarkerManager,GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
