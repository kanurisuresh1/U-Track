import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../@theme/components/Services/header-interactor.service';

@Component({
  selector: 'ngx-fleet-management',
  templateUrl: './fleet-management.component.html',
  styleUrls: ['./fleet-management.component.scss']
})
export class FleetManagementComponent implements OnInit {

  constructor(private headerService : HeaderInteractorService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Fleet Management')
  }
}
