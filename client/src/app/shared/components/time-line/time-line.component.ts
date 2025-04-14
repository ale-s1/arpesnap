import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { VideoService } from '@app/core/services/video.service';
import { StreamState } from '@app/shared/interfaces/interfaces';

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

  imagesUrl: string[] = [];
  @Input() set setImg(imgs: string[]) {
    this.imagesUrl = imgs;
  }

  rangeMin = 0;
  rangeMax = 100;

  rangeIndicatorStart = 0;
  rangeIndicatorEnd = 100;

  state!: StreamState;

  constructor(
    private videoService: VideoService,
    private toastr: ToastrService
  ) {
    this.videoService.getState().subscribe((state) => {
      this.state = state;
      if (state.playing) {
        this.rangeBoundaries();
      }
    });
  }

  rangeBoundaries() {
    const rangeStartTime =
      (this.rangeIndicatorStart / this.rangeMax) * this.state.duration;

    const rangeEndTime =
      (this.rangeIndicatorEnd / this.rangeMax) * this.state.duration;

    if (this.state.ended) {
      this.videoService.seekTo(rangeStartTime);
    }

    if (this.state.currentTime >= rangeEndTime) {
      this.videoService.pause();
    }
  }

  playVideo() {
    this.videoService.play();
  }

  pauseVideo() {
    this.videoService.pause();
  }

  restartVideo() {
    this.videoService.seekTo(0);
  }

  rangeStartValue(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    const rangeValue = Number(target.value);
    this.rangeIndicatorStart = Math.min(rangeValue, this.rangeIndicatorEnd - 5);
    this.rangeStartElement.nativeElement.value = this.rangeIndicatorStart;
    const cal =
      (this.rangeIndicatorStart / this.rangeIndicatorEnd) * this.state.duration;
    this.videoService.seekTo(cal);
  }

  rangeEndValue(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    const rangeValue = Number(target.value);
    this.rangeIndicatorEnd = Math.max(rangeValue, this.rangeIndicatorStart + 5);
    this.rangeEndElement.nativeElement.value = this.rangeIndicatorEnd;
  }
}
