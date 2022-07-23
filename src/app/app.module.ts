import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './components/basic/basic.component';
import { ColdObservablesComponent } from './components/cold-observables/cold-observables.component';
import { HotObservablesComponent } from './components/hot-observables/hot-observables.component';
import { HotObservables2Component } from './components/hot-observables2/hot-observables2.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectChildComponent } from './components/subjects/subject-child/subject-child.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ColdObservablesComponent,
    HotObservablesComponent,
    HotObservables2Component,
    SubjectsComponent,
    SubjectChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
