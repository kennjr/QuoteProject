import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Quote } from 'src/app/models/Quote';
// We need this for us to format the date as desired 
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent implements OnInit {

  quote:string="";
  author:string="";

  @Output() onCloseComponent :EventEmitter<boolean> = new EventEmitter ();
  @Output() onAddNewQuoteData :EventEmitter<Quote> = new EventEmitter ();

  constructor(private datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  addNewQuote(){
    let quoteInput = this.quote;
    let authorInput = this.author;
    if(quoteInput != "" && authorInput != ""){
      let today = new Date();

      let theDate = this.datepipe.transform(new Date(), "mm/dd/yyyy")
      const quote :Quote = {
        author:authorInput,
        quote:quoteInput,
        upvt_count:0,
        dwnvt_count:0,
        time:new Date().toLocaleTimeString(),
        date:theDate!.toString()
      }

      this.onAddNewQuoteData.emit(quote);
      this.closeComponent();
    }
    else if( quoteInput == "" ){

    }
    else if( authorInput == "" ){
      
    }
  }

  closeComponent(){
    this.onCloseComponent.emit(true); 
  }

}
