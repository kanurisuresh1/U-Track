import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../../@theme/components/Services/header-interactor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private headerService : HeaderInteractorService, private location: Location,) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Product Details')
  }

  back() {
    this.location.back()
  }

}
