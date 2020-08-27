import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../@theme/components/Services/header-interactor.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UtrackService } from '../../@theme/components/Services/Utrack.service';



@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificatindate: string;
  notificationTime: string;
  lessStartdate: string;
  lessStartTime: string;
  lessEndTime: string;
  datepipe = new DatePipe('en-us');
  private isLoadingApiData = false;

  constructor(private headerService: HeaderInteractorService, private http: HttpClient, private uTrackService: UtrackService,) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Notifications')
    this.getNotifocationList();
    this.getLessKmsReportList();

  }


  getNotifocationList() {
    this.page_index = 0
    this.uTrackService.getNotifocationListDetails(this.page_index).subscribe(response => {
      if (response.status) {
        this.NotificationList = response.data;
        this.NotificationList.forEach((row) => {
          row.notificatindate = this.datepipe.transform(new Date(row.added_date), 'dd MMM yyyy');
          row.notificationTime = this.datepipe.transform(new Date(row.added_date), 'hh:mm:ss a');
        })
        this.page_index++;
        // console.log(this.NotificationList)
      }
    })
  }

  NotificationList = []


  private page_index = 0;
  private haveNextPageData = true;

  onTableScroll(e) {
    const tableViewHeight = e.target.offsetHeight
    const tableScrollHeight = e.target.scrollHeight
    const scrollLocation = e.target.scrollTop;
    const buffer = 100;
    const limit = tableScrollHeight - tableViewHeight - buffer;

    if (scrollLocation > limit) {
      if (!this.isLoadingApiData && this.haveNextPageData) {
        this.isLoadingApiData = true
        this.uTrackService.getNotifocationListDetails(this.page_index.toString()).subscribe(response => {
          if (response.status) {
            this.NotificationList = response.data;
            this.NotificationList.forEach((row) => {
              row.notificatindate = this.datepipe.transform(new Date(row.added_date), 'dd MMM yyyy');
              row.notificationTime = this.datepipe.transform(new Date(row.added_date), 'hh:mm:ss a');
            })
            this.isLoadingApiData = false;
            this.page_index++;
          } else {
            this.isLoadingApiData = false;
            this.haveNextPageData = false;
          }
        })
      }

    }
  }


  getLessKmsReportList() {
    this.page_index = 0
    this.uTrackService.getNotifocationLessKmsReportDetails(this.page_index).subscribe(response => {
      if (response.status) {
        this.LessKmsReportList = response.data;
        this.LessKmsReportList.forEach((row) => {
          row.lessStartdate = this.datepipe.transform(new Date(row.start_date_time), 'dd MMM yyyy');
          row.lessStartTime = this.datepipe.transform(new Date(row.start_date_time), 'hh:mm a');
          row.lessEndTime = this.datepipe.transform(new Date(row.end_date_time), 'hh:mm a');
          // this.vehiclelistData = row.vehicle_list;
        })
        this.page_index++;
        console.log(this.LessKmsReportList)
        // console.log(this.vehiclelistData)

      }
    })
  }

  LessKmsReportList = []
  // vehiclelistData=[]

  lessKmsReportScorll(e) {
    const tableViewHeight = e.target.offsetHeight
    const tableScrollHeight = e.target.scrollHeight
    const scrollLocation = e.target.scrollTop;
    const buffer = 100;
    const limit = tableScrollHeight - tableViewHeight - buffer;

    if (scrollLocation > limit) {
      if (!this.isLoadingApiData && this.haveNextPageData) {
        this.isLoadingApiData = true
        this.uTrackService.getNotifocationLessKmsReportDetails(this.page_index.toString()).subscribe(response => {
          if (response.status) {
            this.LessKmsReportList = response.data;
            this.LessKmsReportList.forEach((row) => {
              row.lessStartdate = this.datepipe.transform(new Date(row.start_date_time), 'dd MMM yyyy');
              row.lessStartTime = this.datepipe.transform(new Date(row.start_date_time), 'hh:mm:ss a');
              row.lessEndTime = this.datepipe.transform(new Date(row.end_date_time), 'hh:mm:ss a');
              // this.vehiclelistData = row.vehicle_list;
            })
            this.isLoadingApiData = false;
            this.page_index++;
          } else {
            this.isLoadingApiData = false;
            this.haveNextPageData = false;
          }
        })
      }

    }
  }

}
