import { Component, OnInit } from '@angular/core';

import { faHouse, faImage, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  homeIcon = faHouse;
  imagesIcon = faImage;
  uploadIcon = faUpload;

  constructor() { }

  ngOnInit(): void {
  }
}
