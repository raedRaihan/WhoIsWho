import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import axios from 'axios';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit  {

  token: string = 'BQBSLyRbB3h3hQ4saA38KYeGobEWPvotnjQn5UTanC_EC4ihm1IM0nc2Wuz8wgbJqNhkPXDMQGx5YEMH_NWAehEBZfBADXmhFhd-Wqr1edYiI70JS4w';

  pickedSong: SafeResourceUrl  = '';
  pickedSongObj: any=null;
  popIds: string[]=["7Fo8TAyGJr4VmhE68QamMf","4lxfqrEsLX6N1N4OCSkILp","77tT1kLj6mCWtFNqiOmP9H","0PFtn5NtBbbUNbU9EAmIWF","3fMbdgg4jU18AjLCKBhRSm"]
  readyToPlay: boolean=false;
  seconds: number  = 0;
  timeLimit: number=31;

  buttons = ["choice 1","choice 2","choice 3","choice 4"];
  alreadySelectedAnswer: boolean=false;
  correctButtonNumber:number = -1;
  choiceMade: boolean=false;

  /* Points variables*/
  @Input() points: number=0;
  @Output() pointEvent= new EventEmitter<number>();
  sendPoints()
  {
    this.pointEvent.emit(this.points);
  }

  /* QuestionNumber variables*/
  @Input() questionState: number =1;
  @Output() levelNumEvent= new EventEmitter<number>();
  sendLevelNumber()
  {
    this.levelNumEvent.emit(this.questionState);
  }

  constructor(private sanitizer: DomSanitizer) { }

  transitionToNextLevel()
  {
    this.questionState += 1;
    this.sendLevelNumber();
  }

  checkAnswer(buttonNumber:number)
  {
    if(this.choiceMade==false && buttonNumber== this.correctButtonNumber)
    {
      this.points += 31 - this.seconds;
      this.questionState += 1;
      this.sendPoints();
      this.choiceMade=true;
      setInterval(this.transitionToNextLevel.bind(this), 2000);
    }
  }

  
  ngOnInit(): void
  {
    this.seconds=0;
    this.readyToPlay=false;
    this.getRandomSongFromArtist();

    
  }

  
  incrementSeconds()
  {
    if( this.seconds < this.timeLimit)
    {
      this.seconds = this.seconds + 1;
    } 
    
  }
  setButtons()
  {
    var chance= 0;

    for(let i = 0; i < 4; i++)
    {
      chance= Math.floor(Math.random() * (4 - 1 + 1)) + 1;

      if( this.alreadySelectedAnswer==false && (i==3 || chance==1 )) // set button to be correct answer 
      {
        this.buttons[i]=this.pickedSongObj.artists[0].name ;
        this.alreadySelectedAnswer=true;
        this.correctButtonNumber=i;
      }
    }

    this.alreadySelectedAnswer=false
    
  }

  

  

  async getRandomSongFromArtist(): Promise<void> 
  {
    const selectedAristId = this.popIds[Math.floor(Math.random() * this.popIds.length)];
    const apiUrl = `https://api.spotify.com/v1/artists/${selectedAristId}/top-tracks`;
    const headers = 
    {
      'Authorization': `Bearer ${this.token}`,
    };
    
    try
    {
      const response = await axios.get(apiUrl, { headers });

      const tracks = response.data.tracks;
      if(tracks.length > 0)
      {
        const pickedSong = tracks[Math.floor(Math.random() * tracks.length)];
        this.pickedSongObj=pickedSong;
        const trackId = pickedSong.external_urls.spotify.split("/track/")[1];
        const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;

        this.pickedSong = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);

        console.log("Picked song was: " + embedUrl);
        const artistName = pickedSong.artists[0]?.name || 'Unknown Artist';
        console.log(`Artist Name: ${artistName}`);

        this.readyToPlay = true;
        setInterval(this.incrementSeconds.bind(this), 1000);
        this.setButtons();
        
        
      } 
      else
      {
        console.error('No tracks found for this artist.');
      }
    } catch (error: any)
    {
      if (error.response)
      {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
      }
      else 
      {
        console.error('Error message:', error.message);
      }
    }
  }

}
