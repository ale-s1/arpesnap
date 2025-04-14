import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProcessVideoService } from '@app/core/services/process-video.service';
import { VideoService } from '@app/core/services/video.service';
import { HeaderComponent } from '@app/shared/components/header/header.component';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';
import { SideMenuComponent } from '@app/shared/components/side-menu/side-menu.component';

import { ToastrService } from 'ngx-toastr';

import { TimeLineComponent } from '@app/shared/components/time-line/time-line.component';
import {
  StreamState,
  ThumbnailResponse,
} from '@app/shared/interfaces/interfaces';

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
  imagesUrl: string[] = [];
  isLoading: boolean = false;
  state!: StreamState;
  currentUrl!: string;

  constructor(
    private videoService: VideoService,
    private processVideoService: ProcessVideoService,
    private toastr: ToastrService
  ) {
    this.videoService.getState().subscribe((s) => {
      this.state = s;
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
    this.currentUrl = url;
    this.handleThumbnails(file);
    this.playStream(url);
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
        this.videoService.destroy();
      },
    });
  }

  ngOnDestroy() {
    this.videoService.destroy();
  }
}
