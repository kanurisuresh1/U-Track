import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MyWalletResponse } from '../../../@theme/components/Model/MyWalletResponse';

@Component({
  selector: 'ngx-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.scss']
})
export class MyWalletComponent implements OnInit {

  Creditdate: string;
  Debitdate: string;
  datepipe = new DatePipe('en-us');


  constructor(private headerService: HeaderInteractorService, private http: HttpClient) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('My Wallet')
    this.getMyWallateList();
    this.getreferralList();
  }

  getMyWallateList() {

    const params = new HttpParams()
      .set('user_id', localStorage.getItem("USER_ID"))
      .set('device_token', "Web")
      .set('user_type', "Customer")
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<MyWalletResponse>(environment.apiBaseUrl + 'my_wallet_transactions', { params }).subscribe(respone => {
      if (respone.status) {

        this.MyWalleteList = respone.data;

        this.MyWalleteList.forEach((row) => {

          if (row.transaction_type == "Credit") {
            this.CreditList.push(row)
            row.Creditdate = this.datepipe.transform(new Date(row.added_date), 'dd MMM yyyy hh:mm:ss a');
          }

          if (row.transaction_type == "Debit") {
            this.DebitList.push(row)
            row.Debitdate = this.datepipe.transform(new Date(row.added_date), 'dd MMM yyyy hh:mm:ss a');
          }
        })
      }
    })
  }

  getreferralList() {

    const params = new HttpParams()
      .set('user_id', localStorage.getItem("USER_ID"))
      .set('device_token', "Web")
      .set('user_type', "Customer")
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<MyWalletResponse>(environment.apiBaseUrl + 'my_referrals', { params }).subscribe(respone => {
      if (respone.status) {
        this.referralList = respone.data;
      }
    })
  }

  referralList = []
  MyWalleteList = []
  CreditList = []
  DebitList = []

}
