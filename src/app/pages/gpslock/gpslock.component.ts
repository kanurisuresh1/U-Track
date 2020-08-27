import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../@theme/components/Services/header-interactor.service';

@Component({
  selector: 'ngx-gpslock',
  templateUrl: './gpslock.component.html',
  styleUrls: ['./gpslock.component.scss']
})
export class GPSLockComponent implements OnInit {

  constructor(private headerService : HeaderInteractorService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('GPS Lock')
  }

}
