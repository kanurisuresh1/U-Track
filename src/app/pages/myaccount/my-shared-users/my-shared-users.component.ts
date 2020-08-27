import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';

@Component({
  selector: 'ngx-my-shared-users',
  templateUrl: './my-shared-users.component.html',
  styleUrls: ['./my-shared-users.component.scss']
})
export class MySharedUsersComponent implements OnInit {

  constructor(private headerService : HeaderInteractorService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('My Shared Users')
  }

}
