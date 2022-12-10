import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Image, ImageResponse, ImagesResponse } from './image.interface';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private baseUrl =
    'http://ec2-3-121-239-98.eu-central-1.compute.amazonaws.com:8080/memo';
  // private baseUrl = 'http://localhost:8080/memo';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getImage(id: number): Observable<ImageResponse> {
    return this.http.get<ImageResponse>(`${this.baseUrl}/image/${id}`);
  }

  getImages(): Observable<ImagesResponse[]> {
    return this.http.get<ImagesResponse[]>(`${this.baseUrl}/image`);
  }

  postImage(formData: any) {
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });

    const req = new HttpRequest('POST', `${this.baseUrl}/image`, formData, {
      headers: headers,
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  deleteImage(id: number) {
    return this.http.delete(`${this.baseUrl}/image/${id}`);
  }

  convertToImage(image: ImageResponse): Image {
    return {
      id: image.id,
      name: image.fileName.replace(/\.\w{1,5}$/, ''),
      source: this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/jpg;base64,${image.content}`
      ),
    };
  }
}
