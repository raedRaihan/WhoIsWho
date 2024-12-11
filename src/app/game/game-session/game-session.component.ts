import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent /* implements OnInit */ {

  /*
  pickedSong: SafeResourceUrl  = '';
  pickedSongObj: any=null;
  token: string = 'BQCAGQ5FDplJ-8h7Qnm7A_PAWDpNcf2OKvTlrbbJN32xQ2N0pbyw7MWEl_qbmTcvOTLZRJm7AOeQETtwr6uPZLWvKfHcnq9RAkY_MbVxNKFrgXr8wRQ';
  popIds: string[]=["7Fo8TAyGJr4VmhE68QamMf","4lxfqrEsLX6N1N4OCSkILp","77tT1kLj6mCWtFNqiOmP9H","0PFtn5NtBbbUNbU9EAmIWF","3fMbdgg4jU18AjLCKBhRSm"]
  readyToPlay: boolean=false;
  seconds: number  = 0;
  timeLimit: number=31;

  button1Text: string="Option Sigma";
  buttons = ["choice 1","choice 2","choice 3","choice 4"];
  alreadySelectedAnswer: boolean=false;


  message = "hello world";
  constructor(private sanitizer: DomSanitizer) { }

  
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
      }
    }

    this.alreadySelectedAnswer=false
    
  }

  receiveMessage($event: string)
  {
    this.message=$event;
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
*/
}
