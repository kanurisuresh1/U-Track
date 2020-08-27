import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';

@Component({
  selector: 'ngx-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.scss']
})
export class MyRoutesComponent implements OnInit {

  constructor(private headerService : HeaderInteractorService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('My Routes');
  }
}
