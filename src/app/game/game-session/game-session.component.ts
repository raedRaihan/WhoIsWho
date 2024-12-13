import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import axios from 'axios';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit  {

  token: string = '';

  // song arrays
  popIds: string[]=["7Fo8TAyGJr4VmhE68QamMf","4lxfqrEsLX6N1N4OCSkILp","77tT1kLj6mCWtFNqiOmP9H","0PFtn5NtBbbUNbU9EAmIWF","3fMbdgg4jU18AjLCKBhRSm"];
  rockIds: string[]=["0k17h0D3J5VfsdmQ1iZtE9","6IRouO5mvvfcyxtPDKMYFN","22WZ7M8sxp5THdruNY3gXt","2UazAtjfzqBF0Nho2awK4z","7Bah8E0kCETqEpAHI6CPzQ","2Ex4vjQ6mSh5woTlDWto6d"];
  rapIds: string[]=["7B4hKK0S9QYnaoqa9OuwgX","6DPYiyq5kWVQS4RGwxzPC7","3Mcii5XWf6E0lrY3Uky4cA","5NMN8ahOjFuRoyYVjKGFGq","6OxjXk1y4QXXRUJyldFIIG"]
  eurobeatIds: string[]=["1uXrhF4cZsmDQZDueF9uJT","6MucfkxCV71PqB4YcA23e3","25JX78Duv0fYqFeZ70jvwK","3PIG5hkfeomy1hf4Xo33Wl","1Q8vDbSorFlD9bhicfYcLR"];
  countryIds: string[]=["7290H8m1Dwt8G7jm1y9CQx","3kvy8do7n0qVqvlNFS4yOF","1FClsNYBUoNFtGgzeG74dW","4L1z1IcfK7lbqx8izGHaw5","5PSWc8Y94zFsAtZlTe7ipI"];
  hipHopIds: string[]=["3q7HBObVc0L8jNeTe5Gofh","3nFkdlSjzX9mRTtwJOzDYB","7dGJo4pcD2V6oG8kP0tJRR","5K4W6rqBFWDnAN6FQUkS6x","0hCNtLu0JehylgoiP8L4Gh"];
  jazzIds: string[]=["4V7Ate3UISn8cy06xnAprh","0kbYTNQb4Pb1rPbbaF0pT4","2hGh5VOeeqimQFxqXvfCUf","325pT767xzWjDOcIjXBihK","1W8TbFzNS15VwsempfY12H"];
  alternativeIds: string[]=["4Z8W4fKeB5YxbusRsdQVPb","4F84IBURUo98rz4r61KF70","7dIxU1XgxBIa3KJAWzaFAC","0L8ExT028jH3ddEcZwqJJ5","3yY2gUcIsjMr8hjo51PoJ8"];
  jPopIds: string[]=["01wau5CL3Z1vfJJWkzBkqg","64tJ2EAv1R6UaZqc4iOCyj","630wzNP2OL7fl4Xl0GnMWq","6jTjjAjvYvMYfaqi837p5x","7i9bNUSGORP5MIgrii3cJc"];
  kPopIds: string[]=["3Nrfpe0tUJi4K4DXYWgMUX","3cjEqqelV9zb4BYE3qDQ4O","6nfDaffa50mKtEOwR8g4df","4Kxlr1PRlDKEB0ekOCyHgX","41MozSoPIsD1dJM0CLPjZF"];
  emoIds: string[]=["7FBcuc1gsnv6Y1nwFtNRCb","1FIzwiROYEiAdCClC6Kvly","3Ayl7mCk0nScecqOzvNp6s","4UXqAaa6dQYAk18Lv7PEgX","54Bjxn26WsjfslQbNVtSCm"];
  songIds: string[]=[];

  pickedSong: SafeResourceUrl  = '';
  pickedSongObj: any=null;
  readyToPlay: boolean=false;
  seconds: number  = 0;
  timeLimit: number=31;

  buttons = ["choice 1","choice 2","choice 3","choice 4"];
  alreadySelectedAnswer: boolean=false;
  correctButtonNumber:number = -1;
  choiceMade: boolean=false;
  // button colors
  button1Color: string="white";
  button2Color: string="white";
  button3Color: string="white";
  button4Color: string="white";

  /* Query Parameters */
  @Input() genre: string = "pop";
  @Input() gameMode: string = "NTA"; // either NTA or NTS
  @Input() isInverted: boolean=true;
  @Input() rounds: number = 3;

  


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

  constructor(private sanitizer: DomSanitizer, private router: Router, private spotifyService: SpotifyService) { }

  ngOnInit(): void
  {
  

   this.spotifyService.getToken().then((token) =>
     {
      this.token = token;

      if (this.genre == "pop")
      {
        this.songIds = [...this.popIds];
      } 
      else if (this.genre == "rock")
      {
        this.songIds = [...this.rockIds];
      }
      else if (this.genre == "rap")
      {
        this.songIds = [...this.rapIds];
      }  
      else if (this.genre == "eurobeat")
      {
        this.songIds = [...this.eurobeatIds];
      }
      else if (this.genre == "country")
      {
        this.songIds = [...this.countryIds];
      } 
      else if (this.genre == "hip-hop")
      {
        this.songIds = [...this.hipHopIds];
      }
      else if (this.genre == "jazz")
      {
        this.songIds = [...this.jazzIds];
      }
      else if (this.genre == "alternative")
      {
        this.songIds = [...this.alternativeIds];
      }
      else if (this.genre == "j-pop")
      {
        this.songIds = [...this.jPopIds];
      }
      else if (this.genre == "k-pop")
      {
        this.songIds = [...this.kPopIds];
      }
      else if (this.genre == "emo")
      {
        this.songIds = [...this.emoIds];
      }
      else
      {
        const tempArray = [...this.popIds, ...this.rockIds, ...this.eurobeatIds, ...this.rapIds, ...this.countryIds, ...this.hipHopIds, ...this.jazzIds, ...this.alternativeIds, ...this.jPopIds, ...this.kPopIds, ...this.emoIds];
        this.songIds = [...tempArray];
        console.log("song ids " + this.songIds);
      }

      this.seconds = 0;
      this.readyToPlay = false;
      this.getRandomSongFromArtist(true, -1);

    }).catch(error => {
      console.error('Error fetching token:', error);
  });

  }


  
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
      if(this.questionState > this.rounds)
      {
        this.router.navigate(['/scoreboard'], { queryParams: { points: this.points}}); 
      }
      
    }
    
    
  }

  setButtonColor(buttonNumber:number, newColor: string)
  {
      if(buttonNumber==0)
      {
        
        this.button1Color=newColor;
        
      }
      else if(buttonNumber==1)
      {
        this.button2Color=newColor;
      }
      else if(buttonNumber==2) 
      {
        
        this.button3Color=newColor;
        
      }
      else if(buttonNumber==3)
      {
        this.button4Color=newColor;
      }
  }

  checkAnswer(buttonNumber:number)
  {
    if(this.choiceMade==false && buttonNumber== this.correctButtonNumber) // right answer
    {
      this.setButtonColor(buttonNumber,"green");
      this.points += 31 - this.seconds;
      if (this.genre == "all")
      {
        this.points += 5; 
      }
      this.sendPoints();
      this.choiceMade=true;
      
      setInterval(this.transitionToNextLevel.bind(this), 2000);
    }
    else if(this.choiceMade==false && buttonNumber!= this.correctButtonNumber) // wrong answer
    {
      this.setButtonColor(buttonNumber,"red");
      this.choiceMade=true
      setInterval(this.transitionToNextLevel.bind(this), 2000);
    }
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
    var selectedAristId = this.songIds[Math.floor(Math.random() * this.songIds.length)];
    while(this.duplicateArtists.includes(selectedAristId))
    {
      selectedAristId = this.songIds[Math.floor(Math.random() * this.songIds.length)];
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
