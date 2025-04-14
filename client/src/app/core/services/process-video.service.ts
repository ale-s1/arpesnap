import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/../environments/environment';
import { ThumbnailResponse } from '@app/shared/interfaces/interfaces';
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
}
