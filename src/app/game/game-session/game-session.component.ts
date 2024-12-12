import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import axios from 'axios';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit  {

  token: string = 'BQDy2tfmlSGn6WJefU3orGSd0h1aFPQahwzDssoWj_wanbVwMYGe3e2sS-AVcGf9LCRldmW1QCWf0t-jUX0YrlceP1lBINgPbtCXCbAwXUET2Zt31kg';

  // song arrays
  popIds: string[]=["7Fo8TAyGJr4VmhE68QamMf","4lxfqrEsLX6N1N4OCSkILp","77tT1kLj6mCWtFNqiOmP9H","0PFtn5NtBbbUNbU9EAmIWF","3fMbdgg4jU18AjLCKBhRSm"]
  songIds:string[]=[];

  pickedSong: SafeResourceUrl  = '';
  pickedSongObj: any=null;
  readyToPlay: boolean=false;
  seconds: number  = 0;
  timeLimit: number=31;

  buttons = ["choice 1","choice 2","choice 3","choice 4"];
  alreadySelectedAnswer: boolean=false;
  correctButtonNumber:number = -1;
  choiceMade: boolean=false;

  /* Query Parameters */
  @Input() genre: string = "pop";
  @Input() gameMode: string = "NTA"; // either NTA or NTS
  @Input() isInverted: boolean=true;

  


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

  constructor(private sanitizer: DomSanitizer, private router: Router) { }

  
  notIncremented= true;

  transitionToNextLevel()
  {
    if(this.notIncremented)
    {
      this.notIncremented=false;
      console.log("changed value of qs "+this.questionState);
      this.questionState += 1;
      console.log("now changed value of qs "+this.questionState);
      this.sendLevelNumber();
      if(this.questionState > 3)
      {
        this.router.navigate(['/scoreboard']); 
      }
      
    }
    
    
  }

  checkAnswer(buttonNumber:number)
  {
    if(this.choiceMade==false && buttonNumber== this.correctButtonNumber)
    {
      this.points += 31 - this.seconds;
      this.sendPoints();
      this.choiceMade=true;
      setInterval(this.transitionToNextLevel.bind(this), 2000);
    }
    else if(this.choiceMade==false && buttonNumber!= this.correctButtonNumber)
    {
      this.choiceMade=true
      setInterval(this.transitionToNextLevel.bind(this), 2000);
    }
  }

  
  ngOnInit(): void
  {
    this.seconds=0;
    this.readyToPlay=false;
    this.getRandomSongFromArtist(true, -1);
    
  }

  
  incrementSeconds()
  {
    if( this.seconds < this.timeLimit)
    {
      this.seconds = this.seconds + 1;
    } 
    else
    {
      this.transitionToNextLevel();
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
        
        if(this.gameMode=="NTA")
        {
          this.buttons[i]=this.pickedSongObj.artists[0].name ;
        }
        else
        {
          this.buttons[i]=this.pickedSongObj.name;
        }
        this.alreadySelectedAnswer=true;
        this.correctButtonNumber=i;
      }
      else
      {
        this.getRandomSongFromArtist(false, i);
      }
    }

    this.alreadySelectedAnswer=false
    
  }

  

  
  duplicateArtists: any = []

  async getRandomSongFromArtist(isQuestionArtist:boolean, buttonNumber: number): Promise<void> 
  {
    var selectedAristId = this.popIds[Math.floor(Math.random() * this.popIds.length)];
    while(this.duplicateArtists.includes(selectedAristId))
    {
      selectedAristId = this.popIds[Math.floor(Math.random() * this.popIds.length)];
    }
    this.duplicateArtists.push(selectedAristId);
    
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
        if(isQuestionArtist)
        {
          this.pickedSongObj=pickedSong;
        }
        else
        {
          if(this.gameMode=="NTA")
          {
            this.buttons[buttonNumber] = pickedSong.artists[0]?.name || 'Unknown Artist';
          }
          else
          {
            this.buttons[buttonNumber] = pickedSong.name;
          }

        }
        
        const trackId = pickedSong.external_urls.spotify.split("/track/")[1];
        const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
          
       
        if(isQuestionArtist)
        {
          this.pickedSong = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
          console.log("Picked song was: " + embedUrl);
          const artistName = pickedSong.artists[0]?.name || 'Unknown Artist';
          console.log("what is the name of the song? "+ pickedSong.name)
          
          console.log(`Artist Name: ${artistName}`);

          this.readyToPlay = true;
          setInterval(this.incrementSeconds.bind(this), 1000);
          this.setButtons();
        }
       
        
      } 
      else
      {
        console.error('No tracks found for this artist.');
      }
    } 
    catch (error: any)
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
