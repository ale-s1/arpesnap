import { Injectable } from '@angular/core';
import { environment } from '@app/../environments/environment';
import { StreamState } from '@app/shared/types/types';
import { timeToString } from '@app/shared/utils/util';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private state: StreamState = {
    playing: false,
    paused: false,
    ended: false,
    currentTime: 0,
    readableCurrentTime: '00:00:00',
    readableDuration: '00:00:00',
    error: false,
    duration: 0,
    isVideoLooping: false,
    isFileSelected: false,
  };

  private videoEvents = [
    'ended',
    'playing',
    'pause',
    'timeupdate',
    'loadmetadata',
    'canplay',
  ];

  private destroy$ = new Subject<void>();
  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );
  private video!: HTMLVideoElement;
  private readonly baseUrl = environment.baseUrl;

  initializeVideo(videoElement: HTMLVideoElement) {
    this.video = videoElement;
  }

  private streamObservable(url: string): Observable<Event> {
    return new Observable((observer) => {
      this.video.src = url;
      this.video.load();
      this.state.isFileSelected = true;

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.video, this.videoEvents, handler);

      return () => {
        // Stop video
        this.video.pause();
        this.video.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.video, this.videoEvents, handler);
        this.resetState();
      };
    });
  }

  private addEvents(
    el: HTMLVideoElement,
    events: string[],
    handler: EventListener
  ) {
    events.forEach((event) => {
      el.addEventListener(event, handler);
    });
  }

  private removeEvents(
    el: HTMLVideoElement,
    events: string[],
    handler: EventListener
  ) {
    events.forEach((event) => {
      el.removeEventListener(event, handler);
    });
  }

  playStream(url: string) {
    return this.streamObservable(url).pipe(takeUntil(this.destroy$));
  }

  play() {
    this.video.play();
  }

  mute(muted: boolean) {
    this.video.muted = muted;
  }

  pause() {
    this.video.pause();
    console.log('here');
  }

  destroy() {
    this.destroy$.next();
  }

  seekTo(time: number) {
    this.video.currentTime = time;
  }

  private updateStateEvents(event: Event) {
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.video.duration;
        break;
      case 'playing':
        this.state.playing = true;
        this.state.ended = false;
        break;
      case 'pause':
        this.state.playing = false;
        this.state.paused = true;
        break;
      case 'timeupdate':
        this.state.currentTime = this.video.currentTime;
        this.state.readableCurrentTime = timeToString(this.video.currentTime);
        break;
      case 'ended':
        this.state.ended = true;
        break;
      case 'error':
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  private resetState() {
    this.state = {
      playing: false,
      paused: false,
      ended: false,
      currentTime: 0,
      readableCurrentTime: '00:00:00',
      readableDuration: '00:00:00',
      error: false,
      duration: 0,
      isVideoLooping: false,
      isFileSelected: false,
    };
  }
}
