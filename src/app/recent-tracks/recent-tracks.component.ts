import { Component, Inject, OnInit, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-recent-tracks',
  templateUrl: './recent-tracks.component.html',
  styleUrls: ['./recent-tracks.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Ensure required modules are imported
  providers: [ApiService] // Provide ApiService in the component scope
})
export class RecentTracksComponent implements OnInit {
  recentTracks: any[] = [];
  private audio: HTMLAudioElement | null = null;
  audioEnabled: boolean = false; // Flag to enable audio after user interaction
  topArtits: any[] = []
  constructor(private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio(); // Initialize the Audio object in the browser environment
    }

    // Fetch the recent tracks using ApiService
    if (isPlatformBrowser(this.platformId)) {
      this.apiService.getRecentTracks().subscribe(
        (data) => {
          this.recentTracks = data;
          console.log('Recent Tracks:', this.recentTracks);
        },
        (error) => console.error('Failed to get recent tracks:', error)
      );
      // YOUR TOP ARTIST :
      this.apiService.getTopArtists().subscribe(
        (data) => {
          this.topArtits = data;
          console.log('top artiste:', this.topArtits);
        },
        (error) => console.error('Failed to get top artiste:', error)
      );
    } else {
      console.log('Running on the server, skipping localStorage access.');
    }
  }

  // Listener for any click on the document to enable audio
  @HostListener('document:click')
  enableAudioOnInteraction() {
    if (!this.audioEnabled) {
      this.audioEnabled = true;
      console.log('Audio features enabled.');
    }
  }

  playAudio(previewUrl: string) {
    console.log('Trying to play audio:', previewUrl);
    if (this.audioEnabled && this.audio && previewUrl) {
      this.audio.src = previewUrl;
      this.audio.load();
      this.audio.play().then(() => {
        console.log('Audio playback started.');
      }).catch((error) => {
        console.error('Failed to start audio playback:', error);
      });
    }
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}
