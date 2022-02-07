import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { Quote } from 'src/app/models/Quote';
import { AuthService } from 'src/app/services/auth.service';
import { QuotesService } from 'src/app/services/quotes.service';
import { VoteRequest } from 'src/app/models/VoteRequest';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.css']
})
export class QuotesListComponent implements OnInit {

  details!:User;
  teststring:string="";

  allQuotes:Quote[] = [] ;
  allQuotesArray:Quote[] = [];

  constructor(private authservice :AuthService, private quoteservice :QuotesService) { }

  ngOnInit(): void {
    this.getAllQuotes ();
    this.getLocalQuotesArray();
    this.getUserDetails ();
  }

  mostUpvotedQuoteIndex:number = 0

  getUserDetails(){
    this.details = this.authservice.userDetails
    this.teststring = this.details.name + " " + this.details.email + " " + this.details.password + " " + this.details.timestamp
  }

  // The fun that'll get us all the quotes from the server
  getAllQuotes (){
    this.quoteservice.getQuotes().subscribe((quotes) => {
      this.allQuotesArray.push(...quotes)
      this.mostUpvotedQuoteIndex = this.quoteservice.getQuoteWithHighestUpVote();
      this.allQuotes = quotes
    })
  }

  getLocalQuotesArray(){
    this.quoteservice.getQuotesArray().subscribe((quotesArray) => {
      this.allQuotesArray = quotesArray
      this.mostUpvotedQuoteIndex = this.quoteservice.getQuoteWithHighestUpVote();
    })
  }

  toggleQuoteDetails (index: number){
    this.allQuotesArray[index].expandView = !this.allQuotesArray[index].expandView
  }

  // Update the num. of votes for an item based on the clicked btn
  updateVoteCount (voteRequest: VoteRequest){
    let index: number = voteRequest.voteIndex 
    let isUpVt: boolean = voteRequest.isUpVt!
    let quote = this.allQuotesArray[index];
    if(isUpVt && !quote.isUpVt && !quote.isDwnVt){
      quote.upvt_count += 1;
      quote.isUpVt = true;
    }
    else if(!isUpVt && !quote.isDwnVt && !quote.isUpVt){
      quote.dwnvt_count += 1;
      quote.isDwnVt = true;
    }
    else if(isUpVt && quote.isDwnVt && !quote.isUpVt){
      quote.dwnvt_count -= 1;
      quote.upvt_count += 1;

      quote.isUpVt = true;
      quote.isDwnVt = false;
    }
    // If is't a dwv-vt request and the user had already added an up-vote
    else if(!isUpVt && quote.isUpVt && !quote.isDwnVt){
      quote.dwnvt_count += 1;
      quote.upvt_count -= 1;

      quote.isUpVt = false;
      quote.isDwnVt = true;
    }
    // If the user added dwn votes and the dwn vote had been added then we just subtract the added dwn-vote
    else if(!isUpVt && quote.isDwnVt && !quote.isUpVt){
      quote.dwnvt_count -= 1;
      quote.upvt_count -= 1;

      quote.isUpVt = false;
      quote.isDwnVt = false;
    }
    // If the user added up votes and the up vote had been added then we just subtract the added up-vote
    else if(isUpVt && quote.isUpVt && !quote.isDwnVt){
      quote.dwnvt_count -= 1;
      quote.upvt_count -= 1;

      quote.isUpVt = false;
      quote.isDwnVt = false;
    }
    this.quoteservice.updateLocalArrayQuote(index, quote);
  }

  

  ngAfterViewInit(): void {
    console.log("The message ran")
    this.mostUpvotedQuoteIndex = this.quoteservice.getQuoteWithHighestUpVote()
  }

}
