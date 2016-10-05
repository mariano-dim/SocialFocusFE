import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';

import { routing } from './app.routes';

import { LoginComponent } from './components/login.component';
import { DashboardComponent } from './components/dashboard.component';

@NgModule({
  imports: [ BrowserModule, routing, FormsModule, HttpModule],
  declarations: [ AppComponent, LoginComponent, DashboardComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
