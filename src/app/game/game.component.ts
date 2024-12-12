import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  points: number=0;
  questionState: number =1;



  /* Query Parameters */
  genre: string = "pop";
  gameMode: string = "NTA"; // either NTA or NTS
  isInverted: boolean=true;

  backroundColor: string="#2D2D2A";


  constructor(private route: ActivatedRoute) { }

  receivePoints($event: number)
  {
    this.points=$event;
  }
  
  
  recLevelNumber($event: number)
  {
    this.questionState=$event;
  }

  
  ngOnInit(): void
  {
    this.route.queryParams.subscribe( (queryParam) =>
    {

      this.genre=queryParam['genre'];
      this.gameMode=queryParam['gameMode'];
      this.isInverted=JSON.parse(queryParam['isInverted']);
    });

    if(this.isInverted==false)
    {
      this.backroundColor="#1DB954";
    }

    
  }

  
  

  

}
