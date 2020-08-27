import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-full-vechicle-details',
  templateUrl: './full-vechicle-details.component.html',
  styleUrls: ['./full-vechicle-details.component.scss']
})
export class FullVechicleDetailsComponent implements OnInit {
  constructor(private location: Location) { }
  ngOnInit(): void {
  }
  back() {
    this.location.back()
  }

}
