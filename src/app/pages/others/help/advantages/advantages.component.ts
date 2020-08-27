import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../../@theme/components/Services/header-interactor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss']
})
export class AdvantagesComponent implements OnInit {

  constructor(private headerService: HeaderInteractorService,
    private location : Location) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Advantages')
  }

  back() {
    this.location.back();
  }

}
