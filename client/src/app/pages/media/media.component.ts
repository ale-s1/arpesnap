import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProcessVideoService } from '@app/core/services/process-video.service';
import { VideoService } from '@app/core/services/video.service';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';
import { SideMenuComponent } from '@app/shared/components/side-menu/side-menu.component';
import { ToastrService } from 'ngx-toastr';

import { AudioService } from '@app/core/services/audio.service';
import { TimeLineComponent } from '@app/shared/components/time-line/time-line.component';
import { ThumbnailResponse } from '@app/shared/types/types';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [
    CommonModule,
    SideMenuComponent,
    HeaderComponent,
    LoaderComponent,
    TimeLineComponent,
  ],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css',
})
export class MediaComponent {
  @ViewChild('video', { static: false }) video!: ElementRef;
  @ViewChild('audioContainer', { static: false }) audio!: ElementRef;

  file: File | null = null;
  imagesUrl: string[] = [];
  isLoading: boolean = false;
  audioState!: any;
  currentUrl!: string;
  showAudio: boolean = false;

  constructor(
    private videoService: VideoService,
    private processVideoService: ProcessVideoService,
    private toastr: ToastrService,
    private audioService: AudioService
  ) {
    this.audioService.getState().subscribe((state) => {
      this.audioState = state;
    });
  }

  onSelectFile(e: Event) {
    this.isLoading = true;
    const files = (e.target as HTMLInputElement).files;
    if (!files) {
      this.toastr.warning('Select a file');
      return;
    }
    const file = files[0];
    if (file.type != 'video/mp4') {
      this.toastr.warning('Invalid file type');
      return;
    }
    if (this.currentUrl) {
      URL.revokeObjectURL(this.currentUrl);
    }
    const url = URL.createObjectURL(file);
    this.videoService.initializeVideo(this.video.nativeElement);
    this.file = file;
    this.currentUrl = url;
    this.videoService.mute(false);

    this.playStream(this.currentUrl);
    this.handleThumbnails(file);

    if (this.audioState.active) {
      console.log('here');
      this.audioService.removeAudio();
      this.getExtractedAudio(true);
    }
  }

  playStream(url: string) {
    this.videoService.playStream(url).subscribe();
  }

  handleThumbnails(file: File): void {
    this.imagesUrl = [];
    this.processVideoService.getThumbnails(file).subscribe({
      next: (data: ThumbnailResponse) => {
        this.imagesUrl = data.thumbnails;
        this.videoService.play();
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error('Something went wrong, please select a video again');
        this.isLoading = false;
        this.cleanupVideo();
      },
    });
  }

  private cleanupVideo(): void {
    if (this.currentUrl) {
      URL.revokeObjectURL(this.currentUrl);
      this.currentUrl = '';
    }
    this.videoService.destroy();
    this.file = null;
    this.imagesUrl = [];
  }

  ngOnDestroy() {
    this.videoService.destroy();
  }

  getExtractedAudio(event: boolean) {
    if (!this.currentUrl) {
      this.toastr.warning('Select a file');
      return;
    }
    if (!event) {
      this.audioService.removeAudio();
      this.videoService.mute(false);
      return;
    }
    if (this.file) {
      this.videoService.pause();
      this.audioService.setActiveAudio(event);
      this.processVideoService.extractAudio(this.file).subscribe({
        next: (data: Blob) => {
          this.toastr.success('Audio extracted successfully');
          this.audioService.loadAudio(data);
          this.videoService.mute(true);
          this.audioService.play();
          this.videoService.play();
        },
        error: (error) => {
          this.toastr.error(
            'Something went wrong, please select a video again'
          );
        },
      });
    }
  }
}
