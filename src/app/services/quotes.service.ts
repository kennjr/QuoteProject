import { Injectable } from '@angular/core';
import { Quote } from '../models/Quote';
import { Observable, of } from 'rxjs';
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

}
