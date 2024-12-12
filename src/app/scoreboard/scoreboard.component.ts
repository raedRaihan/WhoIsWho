import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScoreboardService } from '../services/scoreboard.service';  // Import the service

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  nameModule = false;
  name: string = '';
  score: number = 0;
  scoreboard: { name: string; score: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private scoreboardService: ScoreboardService 
  ) {}

  ngOnInit(): void {
    this.scoreboard = this.scoreboardService.getScores();
    this.route.queryParams.subscribe((params) => {
      const queryScore = params['points'];
      if (queryScore && !isNaN(+queryScore)) {
        this.nameModule = true;
        this.score = queryScore
      }
    });
  }


  addScore(name: string): void {
    this.route.queryParams.subscribe((params) => {
      const queryScore = params['points'];
      if (name !== null) {
        this.scoreboardService.addScore(name, queryScore);
        this.scoreboard = this.scoreboardService.getScores();  
      }
    });
    
    this.nameModule = false

  }
}
