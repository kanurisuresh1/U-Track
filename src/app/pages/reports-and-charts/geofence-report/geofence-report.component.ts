import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { Location, DatePipe } from '@angular/common';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormGroup, FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { GeofenceReportDetails } from '../../../@theme/components/Model/GeofenceReport';
import { MatOption } from '@angular/material/core';
@Component({
  selector: 'ngx-geofence-report',
  templateUrl: './geofence-report.component.html',
  styleUrls: ['./geofence-report.component.scss']
})
export class GeofenceReportComponent implements OnInit {
  ELEMENT_DATA: GeofenceReportDetails[];
  device_geofence_trans_id: string;
  startdate: string;
  enddate: string;
  geofence_name: string;
  displayedColumns: string[] = ['id', 'geofenceName', 'vehicleNumber', 'enterTime', 'exitTime', 'duration'];

  dataSource = new MatTableDataSource<GeofenceReportDetails>(this.ELEMENT_DATA)
  maindata: any[] = [];
  vehicles = [];
  geofenceList = [];
  servicing_date: any;
  deviceLinkId: any;
  deviceGeofenceTransId: any;
  todayDate: Date = new Date();
  pipe = new DatePipe('en-US');
  yesterDay = new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('GeofenceSelected') private geofenceSelected: MatOption;
  @ViewChild("content") content: ElementRef;


  constructor(private uTrackService: UtrackService,
    private headerService: HeaderInteractorService,
    private location: Location,
  ) { }

  geofenceSearchForm = new FormGroup({
    vechicleName: new FormControl(''),
    geofenceName: new FormControl(''),
    startDate: new FormControl(this.yesterDay),
    endDate: new FormControl(this.todayDate)
  })
  ngOnInit(): void {

    this.headerService.updateHeaderTitle('Geofence Report')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getVehicles();

  }



  back() {
    this.location.back();
  }

  getVehicles() {
    this.uTrackService.getHomeLite().subscribe(response => {
      this.vehicles = response.data
      this.deviceLinkId = this.vehicles[0].device_id;
    })
    this.getGeofenceList();
    this.fetchDataFromApi();
  }

  getGeofenceList() {
    this.uTrackService.geofence_list().subscribe(res => {
      this.geofenceList = res.data
      this.deviceGeofenceTransId = this.geofenceList[0].geofence_id
    })
    this.fetchDataFromApi();
  }

  private filterValue = "";

  applyFilter(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.dataSource.filter = this.filterValue;
      this.fetchDataFromApi();
    }
  }

  search() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element') as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue;
    this.fetchDataFromApi();
  }

  refresh() {
    this.fetchDataFromApi()
  }

  fetchDataFromApi() {
    this.uTrackService.geofence_report(this.geofenceSearchForm.value.vechicleName, this.geofenceSearchForm.value.geofenceName, this.pipe.transform(this.geofenceSearchForm.value.startDate, 'yyyy-MM-dd HH:mm:SS'), this.pipe.transform(this.geofenceSearchForm.value.endDate, 'yyyy-MM-dd HH:mm:SS')).subscribe(response => {
      this.maindata = response.data;
      this.ELEMENT_DATA = this.maindata;
      this.dataSource.data = this.ELEMENT_DATA
    })
  }


  selectAllVehicles() {
    if (this.allSelected.selected) {
      this.geofenceSearchForm.controls.vechicleName
        .patchValue([...this.vehicles.map(item => item.device_id), 0]);
    }
    else {
      this.geofenceSearchForm.controls.vechicleName.patchValue([]);
    }
  }

  selectAllGeofences() {
    if (this.geofenceSelected.selected) {
      this.geofenceSearchForm.controls.geofenceName
        .patchValue([...this.geofenceList.map(item => item.geofence_id), 0]);
    }
    else {
      this.geofenceSearchForm.controls.geofenceName.patchValue([]);
    }
  }

  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let customerTableColumn: string[] = ['ID', 'Geofence Name', 'Vehicle Number', 'Enter Time', 'Exit Time', 'Duration'];
    let data: String[][] = [];
    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.geofence_name)
      row.push(value.vehicle_number)
      row.push(value.geofence_enter_date_time)
      row.push(value.geofence_exit_date_time)
      row.push(value.duration_mins)
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(customerTableColumn, data)

    doc.save('GeofenceReport.pdf');
  }

  viewReport() {
    this.fetchDataFromApi();
  }

}
