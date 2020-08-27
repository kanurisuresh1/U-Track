import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { HeaderInteractorService } from '../../@theme/components/Services/header-interactor.service';
import { HomeData } from '../../@theme/components/Model/Home';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtrackService } from '../../@theme/components/Services/Utrack.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  ELEMENT_DATA: HomeData[];
  driverDetails = [];
  options: any = {};
  themeSubscription: any;

  totalVehicle = 0;
  movingVehicle = 0;
  stoppedVehicle = 0;
  dataNotFoundVehicle = 0;

  todayDate = new Date().getTime()

  displayedColumns: string[] = ['id', 'vehicle_number', 'vehicle_type', 'last_location', 'driver_name', 'fixtime', 'last_running_time', 'batteryLevel', 'fuel_point', 'temp1'];
  dataSource = new MatTableDataSource<HomeData>(this.ELEMENT_DATA)


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;



  constructor(private headerService: HeaderInteractorService,
    private uTrackService: UtrackService,
    private theme: NbThemeService) {
    this.headerService.updateHeaderTitle('Home')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.home();

  }

  ngOninit() {
    this.headerService.updateHeaderTitle('Home')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.home();
    
  }

  home() {

    this.uTrackService.getHomeWebService().subscribe(response => {

      this.totalVehicle = Number(response.data.length)
      response.data.forEach(newData => {

        let lastTravelTime = Date.parse(newData.devicetime);


        if ((this.todayDate -lastTravelTime) < 7200000) {
          this.dataNotFoundVehicle = this.dataNotFoundVehicle + 1;
        }
        else {

          if (Number(newData.speed) > 0) {
            this.movingVehicle = this.movingVehicle + 1
          } else {
            this.stoppedVehicle = this.stoppedVehicle + 1
          }
        }

      })


      if (response.status) {

        response.data.forEach(data => {
          if (data.product_type == "Temperature") {
            data.fuel_point = "-"
          } else if (data.product_type == "Fuel") {
            data.temp1 = "-"
          } else {
            data.temp1 = "-"
            data.fuel_point = "-"
          }
          if (Number(data.batteryLevel) > 100) {
            data.batteryLevel = "100";
          }

          if (data.last_running_time != "" && data.last_running_time != undefined
            && data.last_running_time != null &&
            data.last_running_time != "0000-00-00 00:00:00") {
            data.stopped_time = String((new Date(data.last_running_time)).getMilliseconds() / 1000);

          } else {
            data.stopped_time = "-"
          }


        })
        this.ELEMENT_DATA = response.data
        this.dataSource.data = this.ELEMENT_DATA;

      }
      else {

      }
    })
  }

  private filterValue = "";

  applyFilter(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.dataSource.filter = this.filterValue;
      this.home();
    }
  }
  refresh() {
    this.home()
  }
  search() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element') as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue;
    this.home();
  }
  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let Columns: string[] = ['Id', 'Vehicle Number', 'Vehicle Type', 'Last Location', 'Driver Name(Number)', 'Date & Time', 'Stopped Time', 'Battery Level', 'Fuel', 'Temperature'];
    let data: String[][] = [];

    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.vehicle_number);
      row.push(value.vehicle_type);
      row.push(value.last_location);
      row.push(value.driver_name);
      row.push(value.fixtime);
      row.push(value.last_running_time);
      row.push(value.batteryLevel);
      row.push(value.fuel_point);
      row.push(value.temp1);

      data.push(row);
      i++;
    }),
      (doc as any).autoTable(Columns, data)

    doc.save('AssetsList.pdf');
  }


  ngAfterViewInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight, colors.infoLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['USA', 'Germany', 'France', 'Canada', 'Russia', 'Italy'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Countries',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: 'Germany' },
              { value: 310, name: 'France' },
              { value: 234, name: 'Canada' },
              { value: 135, name: 'Russia' },
              { value: 1548, name: 'USA' },
              { value: 1755, name: 'Italy' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
