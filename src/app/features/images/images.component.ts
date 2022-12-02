import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs';

import { Image, ImageResponse } from 'src/app/services/image/image.interface';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  images: Image[] = [];

  constructor(
    private imageService: ImageService,
    private router: Router,
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    const observer = {
      next: (image: ImageResponse) => {
        this.images.push(this.imageService.convertToImage(image));
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    }

    this.imageService.getImages().pipe(
      concatMap((images) => images.map(image => this.imageService.getImage(image.id))),
      concatMap((image) => image)
    ).subscribe(observer);
  }

  navToDetail(id: number) {
    this.router.navigate(['/draw', { id: id }]);
  }
}
