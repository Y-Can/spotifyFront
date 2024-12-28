import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecentTracksComponent } from "./recent-tracks/recent-tracks.component";
import { CommonModule } from '@angular/common';
import { TopArtistsComponent } from './top-artists/top-artists.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,
       RecentTracksComponent,
       TopArtistsComponent,
       CommonModule]
})
export class AppComponent {
  title = 'spotifyFront';
  showRecentTracks: boolean = false;
  showTopArtists: boolean = false;

  displayRecentTracks() {
    this.showRecentTracks = true;
    
 
this.showTopArtists = false;
  }

  displayTopArtists() {
    this.showRecentTracks = false;
    this.showTopArtists = true;
  }
}
