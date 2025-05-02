import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AudioService } from '@app/core/services/audio.service';
import { VideoService } from '@app/core/services/video.service';
import { StreamState } from '@app/shared/types/types';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css',
})
export class TimeLineComponent {
  @ViewChild('rangeStartElement') rangeStartElement!: ElementRef;
  @ViewChild('rangeEndElement') rangeEndElement!: ElementRef;
  @ViewChild('audioContainer', { static: false }) audio!: ElementRef;

  imagesUrl: string[] = [];
  @Input() set setImg(imgs: string[]) {
    this.imagesUrl = imgs;
  }

  rangeMin = 0;
  rangeMax = 100;

  rangeIndicatorStart = 0;
  rangeIndicatorEnd = 100;

  audioState!: any;
  videoState!: StreamState;
  showAudio = false;

  constructor(
    private videoService: VideoService,
    private toastr: ToastrService,
    private audioService: AudioService
  ) {
    this.videoService.getState().subscribe((state) => {
      this.videoState = state;
      if (state.playing) {
        this.rangeBoundaries();
      }
      if (state.ended) {
        this.videoService.seekTo(0);
        this.audioService.seekTo(0);
      }
    });

    this.audioService.getState().subscribe((state) => {
      this.audioState = state;
      console.log('audio state', state.active);
    });
  }

  ngAfterViewInit() {
    this.audioService.initializeWaveSurfer(this.audio.nativeElement);
  }

  rangeBoundaries() {
    const rangeStartTime =
      (this.rangeIndicatorStart / this.rangeMax) * this.videoState.duration;

    const rangeEndTime =
      (this.rangeIndicatorEnd / this.rangeMax) * this.videoState.duration;

    if (this.videoState.ended) {
      this.videoService.seekTo(rangeStartTime);
      this.audioService.seekTo(rangeStartTime);
    }

    if (this.videoState.currentTime >= rangeEndTime) {
      this.videoService.pause();
      this.audioService.pause();
    }
  }

  playVideo() {
    this.videoService.play();
    this.audioService.play();
  }

  pauseVideo() {
    this.videoService.pause();
    this.audioService.pause();
  }

  restartVideo() {
    this.videoService.seekTo(0);
    this.audioService.seekTo(0);
  }

  rangeStartValue(event: Event) {
    this.restartVideo();
    const target = event.currentTarget as HTMLInputElement;
    const rangeValue = Number(target.value);
    this.rangeIndicatorStart = Math.min(rangeValue, this.rangeIndicatorEnd - 5);
    this.rangeStartElement.nativeElement.value = this.rangeIndicatorStart;
    const cal =
      (this.rangeIndicatorStart / this.rangeIndicatorEnd) *
      this.videoState.duration;
    this.videoService.seekTo(cal);
  }

  rangeEndValue(event: Event) {
    this.restartVideo();
    const target = event.currentTarget as HTMLInputElement;
    const rangeValue = Number(target.value);
    this.rangeIndicatorEnd = Math.max(rangeValue, this.rangeIndicatorStart + 5);
    this.rangeEndElement.nativeElement.value = this.rangeIndicatorEnd;
  }
}
