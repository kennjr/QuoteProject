import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Quote } from 'src/app/models/Quote';
import { AuthService } from 'src/app/services/auth.service';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.css']
})
export class QuotesListComponent implements OnInit {

  details!:User;
  teststring:string="";

  allQuotes:Quote[] = [] ;

  constructor(private authservice :AuthService, private quoteservice :QuotesService) { }

  ngOnInit(): void {
    this.getUserDetails ();
    this.getAllQuotes ();
  }

  getUserDetails(){
    this.details = this.authservice.userDetails
    this.teststring = this.details.name + " " + this.details.email + " " + this.details.password + " " + this.details.timestamp
  }

  // The fun that'll get us all the quotes from the server
  getAllQuotes (){
    this.quoteservice.getQuotes().subscribe((quotes) => (this.allQuotes = quotes))
  }

}
