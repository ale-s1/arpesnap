import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/../environments/environment';
import { ThumbnailResponse } from '@app/shared/types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcessVideoService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getThumbnails(file: File): Observable<ThumbnailResponse> {
    const formData = new FormData();
    formData.append('video', file);
    return this.http.post<ThumbnailResponse>(
      this.baseUrl + '/public/thumbnails',
      formData
    );
  }

  extractAudio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseUrl + '/public/extract-audio', formData, {
      responseType: 'blob',
    });
  }
}
