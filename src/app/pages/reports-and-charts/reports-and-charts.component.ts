import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../@theme/components/Services/header-interactor.service';

@Component({
  selector: 'ngx-reports-and-charts',
  templateUrl: './reports-and-charts.component.html',
  styleUrls: ['./reports-and-charts.component.scss']
})
export class ReportsAndChartsComponent implements OnInit {

  constructor(private headerService : HeaderInteractorService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Reports And Charts')
  }
}
