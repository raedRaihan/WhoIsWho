import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {
  private scoreboard: { name: string; score: number }[] = [];

  constructor() {
    this.loadScores();
  }

  getScores(): { name: string; score: number }[] {
    return this.scoreboard;
  }

  addScore(name: string, score: number): void {
    if (name && score !== null) {
      this.scoreboard.push({ name, score });
      this.scoreboard.sort((a, b) => b.score - a.score); 
      this.saveScores();  
    }
  }

  private loadScores(): void {
    const savedScores = localStorage.getItem('highScores');
    if (savedScores) {
      this.scoreboard = JSON.parse(savedScores);
    }
  }

  private saveScores(): void {
    localStorage.setItem('highScores', JSON.stringify(this.scoreboard));
  }
}
