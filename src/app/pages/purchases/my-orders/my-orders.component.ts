import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { Location } from '@angular/common';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MyOrderListRespones } from '../../../@theme/components/Model/MyOrderListRespones';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(private headerService : HeaderInteractorService,private location: Location,private http: HttpClient, private routes: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('My Orders')
    this.getMyOrderList();
  }

  getMyOrderList() {
    const params = new HttpParams()
      .set('user_id', localStorage.getItem("USER_ID"))
      .set('device_token', "Web")
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<MyOrderListRespones>(environment.apiBaseUrlProduct + 'order_list', { params }).subscribe(response => {
      if (response.status) {
        this.MyOrderListData = response.data
       console.log(this.MyOrderListData)
    
      } 
    })
  }

  MyOrderListData = []

  back() {
    this.location.back()
  }

  orderDetails(order_code){
    localStorage.setItem("ORDER_CODE", order_code);
    console.log(order_code)
    this.routes.navigate([`../order-details`],
      { relativeTo: this.activatedRoute })
  }
}
