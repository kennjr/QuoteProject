import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { QuotesListComponent } from './components/quotes-list/quotes-list.component';
import { LoginComponent } from './components/login/login.component';

import { RouterModule, Routes } from '@angular/router';

const appRoutes :Routes = [
  {path:'', component:QuotesListComponent},
  {path:'login', component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuotesListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing:true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
