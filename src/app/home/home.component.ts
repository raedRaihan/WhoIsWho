import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}

  genres: string[] = [];
  selectedGenre: string = '';
  authLoading: boolean = false;
  configLoading: boolean = false;
  ngOnInit(): void {
    this.authLoading = true;
  
    this.spotifyService.getToken().then((token) => {
      this.authLoading = false;
  
      const songQuery = 'fireflies';
      this.spotifyService.searchSong(songQuery, token).then((result) => {
        console.log('Search Results:', result.tracks.items);
      }).catch((error) => {
        console.error('Error searching for song:', error);
      });
  

      const playlistQuery = 'pop playlist';
      this.spotifyService.getRandomSongsFromPlaylist(playlistQuery, token).then((songs) => {
        console.log('Random Songs from Playlist:', songs);
      }).catch((error) => {
        console.error('Error fetching songs from playlist:', error);
      });
    });
  }
  
  

  setGenre(selectedGenre: string): void {
    this.selectedGenre = selectedGenre;
    console.log(this.selectedGenre);
  }
}
