import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeNumberComponent } from './change-number/change-number.component';
import { ChangeEmailComponent } from './change-email/change-email.component';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private headerService: HeaderInteractorService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Settings')
  }


  ChangePassword() {
    let dialogReference = this.dialog.open(ChangePasswordComponent, {
      height: '55%',
      width: '39%',
    })
    dialogReference.afterClosed().subscribe(result => {

    })
  }

  ChangeNumber() {
    if (confirm('Are you sure want to Change Number?')) {
      let dialogReference = this.dialog.open(ChangeNumberComponent, {
        height: '35%',
        width: '35%',
      })
      dialogReference.afterClosed().subscribe(result => {

      })
    }
  }

  ChangeEmail() {

    if (confirm('Are you sure want to Change Email?')) {
      let dialogReference = this.dialog.open(ChangeEmailComponent, {
        height: '35%',
        width: '35%',
      })
      dialogReference.afterClosed().subscribe(result => {

      })
    }
  }

}


