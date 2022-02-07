import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from 'src/app/models/Quote';
import { VoteRequest } from 'src/app/models/VoteRequest'

@Component({
  selector: 'app-quotedetails',
  templateUrl: './quotedetails.component.html',
  styleUrls: ['./quotedetails.component.css']
})
export class QuotedetailsComponent implements OnInit {

  @Input() quote?: Quote;
  @Input() index?: number;

  @Output() onUpdateVoteCount :EventEmitter<VoteRequest> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  sendVoteCountUpdate (isUpVt: boolean){
    let request:VoteRequest = {
      isUpVt:isUpVt,
      voteIndex: this.index!
    }
    this.onUpdateVoteCount.emit(request);
  }

}
