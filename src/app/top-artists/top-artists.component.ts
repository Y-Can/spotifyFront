import { Component, Inject, OnInit, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-top-artists',
  standalone: true,
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.scss',
  imports: [CommonModule, HttpClientModule], // Ensure required modules are imported
  providers: [ApiService] // Provide ApiService in the component scope
})
export class TopArtistsComponent {
  artistTopTrack: any;
  private audio: HTMLAudioElement | null = null;
  audioEnabled: boolean = false; // Flag to enable audio after user interaction
  topArtists: any[] = []
  playlists: any[] = []
  topMonthTrack:any[] = []
  constructor(private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio(); // Initialize the Audio object in the browser environment
    }

    // Fetch the recent tracks using ApiService
    if (isPlatformBrowser(this.platformId)) {

      this.apiService.getTopArtists().subscribe(
        (data) => {
          this.topArtists = data;
          console.log('top artiste:', this.topArtists);
        },
        (error) => console.error('Failed to get top artiste:', error)
      );
      
      
      this.apiService.getTopMonthTrack().subscribe(
        (data) => {
          this.topMonthTrack = data;
          console.log('top monthtrach:', this.topMonthTrack);
        },
        (error) => console.error('Failed to get top monthtrach:', error)
      );
      
      this.apiService.getMyPlaylists().subscribe(
        data => {
          this.playlists = data;
          console.log('My Playlists:', this.playlists);
        },
        error => {
          console.error('Error fetching playlists:', error);
        }
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
  
  
    loadArtistTopTrack(artistId: string) {
      this.apiService.getArtistTopTrack(artistId).subscribe({
        next: (track) => {
          console.log('Artist top track:', track);
        },
        error: (err) => {
          console.error('Error fetching artist top track:', err);
          // Update UI to show error message
        }
      });
    }
}


