import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-fuel-reports',
  templateUrl: './fuel-reports.component.html',
  styleUrls: ['./fuel-reports.component.scss']
})
export class FuelReportsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  back() {
    this.location.back()
  }

}
