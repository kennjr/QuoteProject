import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { QuotesListComponent } from './components/quotes-list/quotes-list.component';
import { LoginComponent } from './components/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NewQuoteComponent } from './components/new-quote/new-quote.component';
import { ElapsedTimePipe } from './pipes/elapsed-time.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { QuotedetailsComponent } from './components/quotedetails/quotedetails.component';
import { QuotecollapsedComponent } from './components/quotecollapsed/quotecollapsed.component';

const appRoutes :Routes = [
  {path:'', component:QuotesListComponent},
  {path:'login', component:LoginComponent},
  {path:'about', component:AboutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuotesListComponent,
    LoginComponent,
    AboutComponent,
    NewQuoteComponent,
    ElapsedTimePipe,
    HighlightDirective,
    QuotedetailsComponent,
    QuotecollapsedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {enableTracing:true})
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
