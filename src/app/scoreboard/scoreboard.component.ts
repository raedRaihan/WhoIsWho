import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScoreboardService } from '../services/scoreboard.service';  // Import the service

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
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
      const queryName = params['name'];
      const queryScore = params['score'];
      if (queryName && queryScore && !isNaN(+queryScore)) {
        this.addScore(queryName, +queryScore);
      }
    });
  }

  addScore(name: string, score: number): void {
    if (name && score !== null) {
      this.scoreboardService.addScore(name, score);
      this.scoreboard = this.scoreboardService.getScores();  
    }
  }
}
