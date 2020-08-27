import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';

@Component({
  selector: 'ngx-track-history',
  templateUrl: './track-history.component.html',
  styleUrls: ['./track-history.component.scss']
})
export class TrackHistoryComponent implements OnInit {

  constructor(private headerService : HeaderInteractorService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Track History')
  }
}
