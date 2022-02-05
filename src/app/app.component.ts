import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from './models/Quote';
import { User } from './models/User';
import { AuthService } from './services/auth.service';
import { QuotesService } from './services/quotes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QuoteProject';

  userInfo! :User;
  username :string = "";

  quotes:Quote[] = [];

  constructor (private router:Router, private authservice: AuthService, private quoteservice: QuotesService){}

  addNewNoteRequest = false;

  newQuote(status: boolean){
    this.addNewNoteRequest = status;
  }

  hasRoute (route :string){
    return this.router.url === route;
  }

  addANewQuote(quote :Quote){
    if (this.username == ""){
      this.getUserDetails();
    }

    quote.creator = this.username;
    this.addNewQuoteToDB(quote);
  }

  getUserDetails(){
    this.userInfo = this.authservice.userDetails;
    this.username = this.userInfo.name;
  }

  // The fun. that communicates with the server
  addNewQuoteToDB (quote: Quote){
    // console.log(task)
    this.quoteservice.addQuote(quote).subscribe((quote) => (this.quotes.unshift(quote)))
    console.log(this.quotes);
  }
}
