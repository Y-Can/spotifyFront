import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8888';

  constructor(private http: HttpClient) { }

  
  getRecentTracks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recent-tracks`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
  }
  
  // getRecentTracks(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/recent-tracks`);
  // }

  getTopArtists(): Observable<any> {
    return this.http.get(`${this.baseUrl}/top-artists`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });  }
    
    
    getArtistTopTrack(artistId: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/artist-top-track/${artistId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      }).pipe(
        catchError((error) => {
          console.error('Error fetching artist top track:', error);
          return throwError(() => new Error('Error fetching artist top track'));
        })
      );
    }
    
    getTopMonthTrack(): Observable<any> {
      return this.http.get(`${this.baseUrl}/my-top-tracks`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
      });
    }
    getMyPlaylists(): Observable<any> {
      return this.http.get(`${this.baseUrl}/my-playlists`);
    }
}
