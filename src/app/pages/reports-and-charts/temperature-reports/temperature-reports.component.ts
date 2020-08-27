import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { VechicleDetails } from '../../../@theme/components/Model/GetAllVechiclesDetails';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import * as _moment from 'moment';
import { GeofenceReportDetails } from '../../../@theme/components/Model/GeofenceReport';
import { stringify } from 'querystring';
import { TemperatureDetails } from '../../../@theme/components/Model/TemperatureReports';
import { StoppageReportResponseData } from '../../../@theme/components/Model/StoppageReportResponse';
import { NbThemeService } from '@nebular/theme';
const moment = _moment;
@Component({
  selector: 'ngx-temperature-reports',
  templateUrl: './temperature-reports.component.html',
  styleUrls: ['./temperature-reports.component.scss']
})
export class TemperatureReportsComponent implements OnInit, OnDestroy {

  //Graph View 

  options: any = {};
  themeSubscription: any;


  ELEMENT_DATA: StoppageReportResponseData[];
  device_link_id: string;
  displayedColumns: string[] = ['id', 'temperature', 'latitude', 'longitude', 'landmark'];

  dataSource = new MatTableDataSource<StoppageReportResponseData>(this.ELEMENT_DATA)
  maindata: any[] = [];
  vehicles = [];
  servicing_date: any;
  deviceLinkId: any;
  deviceGeofenceTransId: any;
  todayDate: Date = new Date();
  yesterDay = new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000));
  pipe = new DatePipe('en-US');

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;

  constructor(private headerService: HeaderInteractorService,
    private routes: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private uTrackService: UtrackService,
    private theme: NbThemeService
  ) { }

  TemperatureSearchForm = new FormGroup({
    vechicleName: new FormControl(''),
    startDate: new FormControl(this.yesterDay),
    endDate: new FormControl(this.todayDate)
  })


  ngOnInit(): void {

    this.headerService.updateHeaderTitle('Temperature Report')
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
      this.deviceLinkId = this.vehicles[0].device_link_id;
      this.fetchDataFromApi();

    })
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
    this.uTrackService.new_track_report_web_mongo(this.deviceLinkId,
      this.pipe.transform(this.TemperatureSearchForm.value.startDate, 'yyyy-MM-dd HH:mm:ss'),
      this.pipe.transform(this.TemperatureSearchForm.value.endDate, 'yyyy-MM-dd HH:mm:ss')).subscribe(response => {
        this.maindata = response.data;
        this.ELEMENT_DATA = this.maindata;
        this.dataSource.data = this.ELEMENT_DATA
      })
  }

  viewReport() {
    this.fetchDataFromApi();
  }

  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let customerTableColumn: string[] = ['ID', 'Temperature', 'Latitude', 'Longitude', 'Landmark'];
    let data: String[][] = [];
    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {
      console.log(value)
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.t)
      row.push(value.la.toString())
      row.push(value.lo.toString())
      row.push(value.ln)
      data.push(row);
      i++;
    }),
      (doc as any).autoTable(customerTableColumn, data)

    doc.save('AllTemperatureDetails.pdf');
  }


  // Graph View 

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [ colors.info],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: [ '2016 Precipitation'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.info,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: [
              '2016-1',
              '2016-2',
              '2016-3',
              '2016-4',
              '2016-5',
              '2016-6',
              '2016-7',
              '2016-8',
              '2016-9',
              '2016-10',
              '2016-11',
              '2016-12',
            ],
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.success,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Precipitation  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: [
              '2015-1',
              '2015-2',
              '2015-3',
              '2015-4',
              '2015-5',
              '2015-6',
              '2015-7',
              '2015-8',
              '2015-9',
              '2015-10',
              '2015-11',
              '2015-12',
            ],
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          
          {
            name: '2016 Precipitation',
            type: 'line',
            smooth: true,
            data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
