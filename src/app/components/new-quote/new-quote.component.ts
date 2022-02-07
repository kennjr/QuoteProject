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
    // Check whether the fields are empty
    if(quoteInput != "" && authorInput != ""){
      let theDate = this.datepipe.transform(new Date(), "mm/dd/yyyy")
      const quote :Quote = {
        author:authorInput,
        quote:quoteInput,
        upvt_count:0,
        dwnvt_count:0,
        time:new Date().toLocaleTimeString(),
        date:theDate!.toString()
      }

      // Send the created quote to the parent component for it to be added to the db
      this.onAddNewQuoteData.emit(quote);
      this.closeComponent();
    }
    else if( quoteInput == "" ){
      alert("The quote field is empty")
    }
    else if( authorInput == "" ){
      alert("The author field is empty")
    }
  }

  // Close the component whenever this fun is called
  closeComponent(){
    this.onCloseComponent.emit(true); 
  }

}
