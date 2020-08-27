import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { ContactUsRespones } from '../../../@theme/components/Model/ContactUsRespones';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private headerService: HeaderInteractorService,
    private http: HttpClient, private location: Location,
    private toasterService: NbToastrService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Contact Us')
  }

  contactUsForm = new FormGroup({

    subject: new FormControl('', [Validators.required]),
    discription: new FormControl('', [Validators.required]),

  })

  back() {
    this.location.back();
  }


  contactUs() {

    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    const formData = new FormData();

    formData.append('user_id', localStorage.getItem("USER_ID"));

    formData.append('subject', this.contactUsForm.value.subject);
    formData.append('description', this.contactUsForm.value.discription);


    this.http.post<ContactUsRespones>(environment.apiBaseUrl + 'contact_us_request', formData, { headers }).subscribe(response => {
      if (response.status) {

        this.toasterService.success('Pragati Utrack', response.message)

      } else {
        this.toasterService.danger('Pragati Utrack', response.message)


      }
    })

  }

}
