import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ImageResponse } from 'src/app/services/image/image.interface';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {
  source?: string;
  imageId: number = 0;
  fileName: string = "";

  width = 616;
  height = 742;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.imageId = Number(this.route.snapshot.paramMap.get('id'));

    const observer = {
      next: (image: ImageResponse) => {
        this.source = `data:image/jpg;base64,${image.content}`;
        this.fileName = image.fileName;
      },
      error: (err: HttpErrorResponse) => {
        this.ngZone.run(() => {
          this.router.navigate(['/images']);
        });
      }
    }
    this.imageService.getImage(this.imageId).subscribe(observer);
  }

  save(event: Blob) {
    if (this.imageId === 0) {
      this.ngZone.run(() => {
        this.router.navigate(['/images']);
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', new File([event], this.fileName));

    this.imageService.postImage(formData).subscribe((next) => { return; });

    const observer = {
      complete: () => {
        this.ngZone.run(() => {
          this.router.navigate(['/images']);
        });
      }
    }
    this.imageService.deleteImage(this.imageId).subscribe(observer);
  }

  cancel() {
    this.ngZone.run(() => {
      this.router.navigate(['/images']);
    });
  }
}
