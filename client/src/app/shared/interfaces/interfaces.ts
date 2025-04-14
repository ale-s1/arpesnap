export interface ThumbnailResponse {
  thumbnails: string[];
}

export interface StreamState {
  playing: boolean;
  paused: boolean;
  ended: boolean;
  currentTime: number;
  readableCurrentTime: string;
  readableDuration: string;
  duration: number;
  error: boolean;
  isVideoLooping: boolean;
}
