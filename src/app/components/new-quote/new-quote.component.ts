import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Quote } from 'src/app/models/Quote';
<<<<<<< HEAD
=======
// We need this for us to format the date as desired 
import { DatePipe } from '@angular/common';
>>>>>>> development
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent implements OnInit {

  quote:string="";
  author:string="";
  details!:User;
  currentUsername:string = "Anonymous";

  @Output() onCloseComponent :EventEmitter<boolean> = new EventEmitter ();
  @Output() onAddNewQuoteData :EventEmitter<Quote> = new EventEmitter ();

<<<<<<< HEAD
  constructor(private authservice: AuthService) { }
=======
  constructor(private datepipe: DatePipe, private authservice: AuthService) { }
>>>>>>> development

  ngOnInit(): void {
    this.getUserDetails();
  }

  addNewQuote(){
    let quoteInput = this.quote;
    let authorInput = this.author;
    // Check whether the fields are empty
    if(quoteInput != "" && authorInput != ""){
      let today = new Date()
      console.log("Today " + (today.getMonth()+1)  + "/" + today.getDate() + "/" + today.getFullYear())
<<<<<<< HEAD
      let id = Math.random()
=======
      
>>>>>>> development
      const quote :Quote = {
        id:id,
        author:authorInput,
        quote:quoteInput,
        upvt_count:0,
        dwnvt_count:0,
        creator:this.currentUsername,
        time:today.toLocaleTimeString(),
<<<<<<< HEAD
        date:today.toString()
        // date:((today.getMonth()+1)  + "/" + today.getDate() + "/" + today.getFullYear()).toString()
=======
        date:((today.getMonth()+1)  + "/" + today.getDate() + "/" + today.getFullYear()).toString()
>>>>>>> development
      }
      console.log("Today end" + today.toTimeString())

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

  getUserDetails(){
    let userdetails = this.authservice.userDetails
    if (userdetails == false){
      this.currentUsername = "Anonymous";
    }else{
      this.details = userdetails;
      this.currentUsername = this.details.name;
    }
  }

  // Close the component whenever this fun is called
  closeComponent(){
    this.onCloseComponent.emit(true); 
  }

}
