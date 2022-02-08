import { Injectable } from '@angular/core';
import { Quote } from '../models/Quote';
import { Observable, of } from 'rxjs';
import { Quotes } from 'defaultQuotes';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// This is needed if we are gon send data to the db or update data that's already in the db
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  private apiUrl = "http://localhost:5000/quotes";
  constructor(private httpclient: HttpClient) { }
  mostUpVotesIndex = 0

  localQuotesArray :Quote[] = [];

  getQuotes():Observable<Quote[]>{
    return this.httpclient.get<Quote[]>(this.apiUrl);
  }

  addQuote(quote :Quote) :Observable<Quote>{
    return this.httpclient.post<Quote>(this.apiUrl, quote, httpOptions);
  }

  addBatchQuotesToLocalArray(quotes: Quote[]){
    this.localQuotesArray.push(...quotes)
  }

  getQuotesArray():Observable<Quote[]>{
    return of(this.localQuotesArray)
  }

  addQuoteToLocalArray(quote :Quote){
    this.localQuotesArray.unshift(quote);
  }

  updateLocalArrayQuote(index: number, newQuote: Quote){
    this.localQuotesArray[index] = newQuote;
  }

  getQuoteWithHighestUpVote(array: Quote[]):number{
    let theVal = 0;
    let initialHighestCount = 0;
    if(array.length >= 0){
      for(let x = 0; x < array.length; x++){
        let currentQuote = array[x];
        let quoteUpVtCount = currentQuote.upvt_count;
        if(quoteUpVtCount > initialHighestCount){
          initialHighestCount = quoteUpVtCount
          console.log("NaN changed to" + x)
          // theVal = x;
          console.log("The number hasn't changed to "+ x)

          if(theVal < x){
            console.log("The number has changed to "+ x + " with a count of " + quoteUpVtCount)
            if(currentQuote.id != undefined && currentQuote.id != NaN && currentQuote.id != null){
              this.mostUpVotesIndex = currentQuote.id
            }
            theVal = x;
          }
        }

      }
    }
    return theVal;
  }

  get highestVoteCount (){
    return of(this.mostUpVotesIndex);
  }

  setHightestUpVtCount (newVal :number){
    this.mostUpVotesIndex = newVal
  }

  // This is the fun for deleting a quote from the local quotes array
  deleteQuoteFromArray(index:number){
    // Confirm that the index is valid
    if(index > -1){
      this.localQuotesArray.splice(index, 1);
    }
  }

  defaultLisOfQuotes (){
    return Quotes;
  }

}
