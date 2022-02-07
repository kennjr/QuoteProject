import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from 'src/app/models/Quote';
import { VoteRequest } from 'src/app/models/VoteRequest'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quotedetails',
  templateUrl: './quotedetails.component.html',
  styleUrls: ['./quotedetails.component.css']
})
export class QuotedetailsComponent implements OnInit {

  @Input() quote?: Quote;
  @Input() index?: number;
  @Input() username?: string;

  currentName!:string;


  @Output() onUpdateVoteCount :EventEmitter<VoteRequest> = new EventEmitter()
  @Output() onToggleQuoteView :EventEmitter<number> = new EventEmitter ()

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  showQuoteDetails (){
    this.onToggleQuoteView.emit(this.index)
  }

  getUserDetails(){
    
    let theName = this.authservice.userDetails;
    if(theName == false){
      console.log("The name" + theName)
      this.currentName = "Anonymous";
    }else{
      console.log("The name" + theName)
      this.currentName = theName.name;
    }
  }

  sendVoteCountUpdate (isUpVt: boolean){
    let request:VoteRequest = {
      isUpVt:isUpVt,
      voteIndex: this.index!
    }
    this.onUpdateVoteCount.emit(request);
  }

}
