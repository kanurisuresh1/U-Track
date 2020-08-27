import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-track-history',
  templateUrl: './track-history.component.html',
  styleUrls: ['./track-history.component.scss']
})
export class TrackHistoryComponent implements OnInit {
  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  back() {
    this.location.back()
  }

}
