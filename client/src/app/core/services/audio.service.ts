import { Injectable } from '@angular/core';
import { timeToString } from '@app/shared/utils/util';
import { BehaviorSubject } from 'rxjs';
import WaveSurfer from 'wavesurfer.js';
import { VideoService } from './video.service';

interface AudioState {
  playing: boolean;
  currentTime: number;
  readableCurrentTime: string;
  readableDuration: string;
  duration: number;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private state: AudioState = {
    playing: false,
    currentTime: 0,
    readableCurrentTime: '00:00:00',
    readableDuration: '00:00:00',
    duration: 0,
    active: false,
  };

  private waveForm!: WaveSurfer;
  private stateChange: BehaviorSubject<AudioState> = new BehaviorSubject(
    this.state
  );

  constructor(private videoService: VideoService) {}

  getState() {
    return this.stateChange.asObservable();
  }

  initializeWaveSurfer(container: HTMLElement) {
    this.waveForm = WaveSurfer.create({
      container: container,
      waveColor: 'violet',
      progressColor: 'purple',
      cursorColor: 'red',
      barWidth: 2,
      barRadius: 2,
    });
  }

  loadAudio(audioUrl: Blob) {
    this.waveForm.loadBlob(audioUrl);
    this.events();
  }

  events() {
    this.waveForm.on('interaction', () => {
      this.state.playing = true;
      this.play();
      this.videoService.seekTo(this.waveForm.getCurrentTime());
      this.stateChange.next(this.state);
    });

    this.waveForm.on('click', () => {
      this.videoService.seekTo(this.waveForm.getCurrentTime());
      this.state.playing = true;
      this.play();
      this.videoService.play();
      this.stateChange.next(this.state);
    });

    this.waveForm.on('play', () => {
      this.state.playing = true;
      this.stateChange.next(this.state);
    });

    this.waveForm.on('pause', () => {
      this.state.playing = false;
      this.stateChange.next(this.state);
    });

    this.waveForm.on('timeupdate', () => {
      this.state.currentTime = this.waveForm.getCurrentTime();
      this.state.readableCurrentTime = timeToString(
        this.waveForm.getCurrentTime()
      );
      this.stateChange.next(this.state);
    });

    this.waveForm.on('ready', () => {
      this.state.duration = this.waveForm.getDuration();
      this.state.readableDuration = timeToString(this.state.duration);
      this.stateChange.next(this.state);
    });
  }

  play() {
    this.waveForm.play();
    this.state.playing = true;
    this.stateChange.next(this.state);
  }

  pause() {
    this.waveForm.pause();
    this.state.playing = false;
    this.stateChange.next(this.state);
  }

  setActiveAudio(active: boolean) {
    this.state.active = active;
    this.stateChange.next(this.state);
  }
  seekTo(time: number) {
    this.waveForm.seekTo(time);
  }

  removeAudio() {
    this.waveForm.empty();
    this.stateChange.next(this.state);
  }
}
