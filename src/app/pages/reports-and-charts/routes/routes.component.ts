import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NbIconLibraries } from '@nebular/theme';


@Component({
  selector: 'ngx-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  constructor(private location: Location,
    private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('font-awesome');
  }

  ngOnInit(): void {
  }
  back() {
    this.location.back()
  }

}
