import { Injectable } from '@angular/core';

const AUTH_ENDPOINT =
  'https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token';
const TOKEN_KEY = 'whos-who-access-token';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor() {}

  getToken(): Promise<string> {
    console.log("right here ")
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log('Token found in localstorage');
        return Promise.resolve(storedToken.value);
      }
    }

    console.log('Fetching new token');
    return fetch(AUTH_ENDPOINT)
      .then((response) => response.json())
      .then(({ access_token, expires_in }) => {
        const newToken = {
          value: access_token,
          expiration: Date.now() + (expires_in - 20) * 1000, 
        };
        localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
        return newToken.value;
      });
  }
  
  // loadGenres(token: string): Promise<string[]> {
  //   return Promise.resolve([
  //     "rock",
  //     "rap",
  //     "pop",
  //     "country",
  //     "hip-hop",
  //     "jazz",
  //     "alternative",
  //     "j-pop",
  //     "k-pop",
  //     "emo",
  //   ]);
  // }
  loadGenres(): string[] {
    return [
      'rock',
      'all',
      'rap',
      'pop',
      'country',
      'hip-hop',
      'jazz',
      'alternative',
      'j-pop',
      'k-pop',
      'emo',
    ];
  }

  searchSong(query: string, token: string): Promise<any> {
    const endpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;
  
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error searching for song:', error);
        throw error;
      });
  }
  
    
  
}

