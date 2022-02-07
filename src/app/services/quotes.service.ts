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

  getQuoteWithHighestUpVote():number{
    let theVal = 0;
    if(this.localQuotesArray.length >= 0){
      for(let x = 0; x <= this.localQuotesArray.length - 1; x++){
        let currentQuote = this.localQuotesArray[x];
        let quoteUpVtCount = currentQuote.upvt_count;
        if(quoteUpVtCount > 0){
          console.log("NaN changed to" + x)
          // theVal = x;
          console.log(currentQuote)

          if(theVal < x){
            theVal = x;
          }
        }

      }
    }
    return theVal;
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
