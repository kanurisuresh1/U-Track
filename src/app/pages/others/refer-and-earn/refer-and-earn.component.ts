import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';

@Component({
  selector: 'ngx-refer-and-earn',
  templateUrl: './refer-and-earn.component.html',
  styleUrls: ['./refer-and-earn.component.scss']
})
export class ReferAndEarnComponent implements OnInit {
  refercode:any;
  constructor(private headerService : HeaderInteractorService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Refer And Earn')
    this.refercode=localStorage.getItem("REFERRAL_CODE")
  }

}
