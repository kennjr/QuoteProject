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
export class AppComponent{
  title = 'QuoteProject';

  userInfo! :User;
  username :string = "Anonymous";
  checkUserDetails :boolean = false;

  quotes:Quote[] = [];

  constructor (private router:Router, private authservice: AuthService, private quoteservice: QuotesService){}

  addNewNoteRequest = false;

  newQuote(status: boolean){
    if(this.hasRoute("/")){
      this.addNewNoteRequest = status;
    }else{
      if(confirm("Navigate to home for you to add a quote")){
        this.addNewNoteRequest = status;
        this.router.navigateByUrl("/")
      }
    }
  }

  hasRoute (route :string){
    return this.router.url === route;
  }

  addANewQuote(quote :Quote){
    if (this.username == "Anonymous" && !this.checkUserDetails){
      this.getUserDetails();
    }

    quote.creator = this.username;
    console.log("The quote being added " + quote.creator )
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
    this.quoteservice.addQuoteToLocalArray(quote);
    console.log(this.quotes);
  }

  addMultipleQuotesToLocalArray(quotes: Quote[]){
    this.quoteservice.addBatchQuotesToLocalArray(quotes);
  }

}
