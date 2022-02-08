import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quote } from 'src/app/models/Quote';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-quotecollapsed',
  templateUrl: './quotecollapsed.component.html',
  styleUrls: ['./quotecollapsed.component.css']
})
export class QuotecollapsedComponent implements OnInit {

  @Input() quote?: Quote;
  @Input() index?: number;
  @Input() mostUpvotedQuoteIndex?: number;

  idOfQuoteWithMostVotes?: number;

  @Output() onToggleQuoteView :EventEmitter<number> = new EventEmitter ()

  constructor(private quoteservice: QuotesService) { }

  ngOnInit(): void {
    this.quoteservice.getidOfHighestVoteCount().subscribe((id) => (this.idOfQuoteWithMostVotes = id))
  }

  showQuoteDetails (){
    this.onToggleQuoteView.emit(this.index)
  }
}
