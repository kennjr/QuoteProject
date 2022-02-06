import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { Quote } from 'src/app/models/Quote';
import { AuthService } from 'src/app/services/auth.service';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.css']
})
export class QuotesListComponent implements OnInit {
  @Input() quotesFromParent!:Quote[] ;

  details!:User;
  teststring:string="";

  allQuotes:Quote[] = [] ;
  allQuotesArray:Quote[] = [];

  constructor(private authservice :AuthService, private quoteservice :QuotesService) { }

  ngOnInit(): void {
    this.allQuotes = this.quotesFromParent
    this.getUserDetails ();
    this.getAllQuotes ();
    this.getLocalQuotesArray();
  }

  getUserDetails(){
    this.details = this.authservice.userDetails
    this.teststring = this.details.name + " " + this.details.email + " " + this.details.password + " " + this.details.timestamp
  }

  // The fun that'll get us all the quotes from the server
  getAllQuotes (){
    this.quoteservice.getQuotes().subscribe((quotes) => {
      this.allQuotesArray.push(...quotes)
      this.allQuotes = quotes
    })
  }

  getLocalQuotesArray(){
    this.quoteservice.getQuotesArray().subscribe((quotesArray) => (this.allQuotesArray = quotesArray))
  }

  toggleQuoteDetails (index: number){
    this.allQuotesArray[index].expandView = !this.allQuotesArray[index].expandView
  }

  updateVoteCount (index: number, isUpVt: boolean){
    let quote = this.allQuotesArray[index];
    if(isUpVt && !quote.isUpVt && !quote.isDwnVt){
      quote.upvt_count += 1;
      quote.isUpVt = true;
      console.log("The first")
    }
    else if(!isUpVt && !quote.isDwnVt && !quote.isUpVt){
      quote.dwnvt_count += 1;
      quote.isDwnVt = true;
      console.log("The second")
    }
    else if(isUpVt && quote.isDwnVt){
      quote.dwnvt_count -= 1;
      quote.upvt_count += 1;

      quote.isUpVt = true;
      quote.isDwnVt = false;
      console.log("The third")
    }
    else if(!isUpVt && quote.isUpVt){
      quote.dwnvt_count += 1;
      quote.upvt_count -= 1;

      quote.isUpVt = false;
      quote.isDwnVt = true;
      console.log("The fourth")
    }
    this.quoteservice.updateLocalArrayQuote(index, quote);
  }

}
