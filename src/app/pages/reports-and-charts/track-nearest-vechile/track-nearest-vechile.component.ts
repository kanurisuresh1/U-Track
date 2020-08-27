import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-track-nearest-vechile',
  templateUrl: './track-nearest-vechile.component.html',
  styleUrls: ['./track-nearest-vechile.component.scss']
})
export class TrackNearestVechileComponent implements OnInit {
  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  back() {
    this.location.back()
  }

}
