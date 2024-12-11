import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  points: number=0;
  questionState: number =1;


  message = "hello world";

  constructor() { }

  receivePoints($event: number)
  {
    this.points=$event;
  }
  receiveMessage($event: string)
  {
    this.message=$event;
  }
  
  recLevelNumber($event: number)
  {
    this.questionState=$event;
  }

  
  ngOnInit(): void
  {
   

    
  }

  
  

  

}
