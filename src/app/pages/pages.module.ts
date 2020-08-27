import { NgModule } from '@angular/core';
import { NbMenuModule, NbTooltipModule, NbAccordionModule, NbIconModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ReportsAndChartsComponent } from './reports-and-charts/reports-and-charts.component';
import { GPSLockComponent } from './gpslock/gpslock.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FleetManagementComponent } from './fleet-management/fleet-management.component';
import { StoppageReportComponent } from './reports-and-charts/stoppage-report/stoppage-report.component';
import { TrackReportComponent } from './reports-and-charts/track-report/track-report.component';
import { DistanceReportComponent } from './reports-and-charts/distance-report/distance-report.component';
import { FullVechicleDetailsComponent } from './reports-and-charts/full-vechicle-details/full-vechicle-details.component';
import { DaywiseKmReportComponent } from './reports-and-charts/daywise-km-report/daywise-km-report.component';
import { DailySummaryKmReportComponent } from './reports-and-charts/daily-summary-km-report/daily-summary-km-report.component';
import { Twenty4HoursKmReportComponent } from './reports-and-charts/twenty4-hours-km-report/twenty4-hours-km-report.component';
import { Twenty4HoursAnalysisComponent } from './reports-and-charts/twenty4-hours-analysis/twenty4-hours-analysis.component';
import { GeofenceReportComponent } from './reports-and-charts/geofence-report/geofence-report.component';
import { DriverPerformanceComponent } from './reports-and-charts/driver-performance/driver-performance.component';
import { TrackNearestVechileComponent } from './reports-and-charts/track-nearest-vechile/track-nearest-vechile.component';
import { ChartsComponent } from './reports-and-charts/charts/charts.component';
import { TrackHistoryComponent } from './reports-and-charts/track-history/track-history.component';
import { TemperatureReportsComponent } from './reports-and-charts/temperature-reports/temperature-reports.component';
import { FuelReportsComponent } from './reports-and-charts/fuel-reports/fuel-reports.component';
import { RoutesComponent } from './reports-and-charts/routes/routes.component';
import { ServicingManagementComponent } from './fleet-management/servicing-management/servicing-management.component';
import { FuelManagementComponent } from './fleet-management/fuel-management/fuel-management.component';
import { DriverManagementComponent } from './fleet-management/driver-management/driver-management.component';
import { TyreManagementComponent } from './fleet-management/tyre-management/tyre-management.component';
import { SparePartManagementComponent } from './fleet-management/spare-part-management/spare-part-management.component';
import { AlertmanagementComponent } from './fleet-management/alertmanagement/alertmanagement.component';
import { KilometerSummerymanagementComponent } from './fleet-management/kilometer-summerymanagement/kilometer-summerymanagement.component';
import { KilometerCustomermanagementComponent } from './fleet-management/kilometer-customermanagement/kilometer-customermanagement.component';
import { CustomermanagementComponent } from './fleet-management/customermanagement/customermanagement.component';
import { ExpansesManagementComponent } from './fleet-management/expanses-management/expanses-management.component';
import { TripManagementComponent } from './fleet-management/trip-management/trip-management.component';
import { HubManagementComponent } from './fleet-management/hub-management/hub-management.component';
import { AddCustomerManagementComponent } from './fleet-management/customermanagement/add-customer-management/add-customer-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VechiclesDetailsComponent } from './fleet-management/vechicles-details/vechicles-details.component';

// table excel data 
import { MatTableExporterModule } from 'mat-table-exporter';

// pdf format
import { HttpClientModule } from '@angular/common/http'; // <============
import { NgHttpLoaderModule } from 'ng-http-loader';
import { CustomerDetailsComponent } from './fleet-management/customermanagement/customer-details/customer-details.component';
import { AddFuelManagementComponent } from './fleet-management/fuel-management/add-fuel-management/add-fuel-management.component';
import { AddServiceManagementComponent } from './fleet-management/servicing-management/add-service-management/add-service-management.component';
import { VehicleNumberDetailsComponent } from './fleet-management/vechicles-details/vehicle-number-details/vehicle-number-details.component';
import { ViewServiceImageComponent } from './fleet-management/servicing-management/view-service-image/view-service-image.component';
import { ViewFuelImageComponent } from './fleet-management/fuel-management/view-fuel-image/view-fuel-image.component';
import { ShowvehicleImageComponent } from './fleet-management/vechicles-details/showvehicle-image/showvehicle-image.component';
import { DriverListComponent } from './fleet-management/driver-management/driver-list/driver-list.component';
import { AddDriverComponent } from './fleet-management/driver-management/add-driver/add-driver.component';
import { DashboardReportComponent } from './reports-and-charts/dashboard-report/dashboard-report.component';
import { ChartsModule } from 'ng2-charts';

import { MatDatetimepickerModule, MatNativeDatetimeModule } from "@mat-datetimepicker/core";

import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    MatTableExporterModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    NbTooltipModule,
    NbAccordionModule,
    ChartsModule,
    NbIconModule,
    MatNativeDatetimeModule,
    MatDatetimepickerModule,
    NgxEchartsModule,


  ],
  declarations: [
    PagesComponent,
    ReportsAndChartsComponent,
    GPSLockComponent,
    NotificationsComponent,
    FleetManagementComponent,
    StoppageReportComponent,
    TrackReportComponent,
    DistanceReportComponent,
    FullVechicleDetailsComponent,
    DaywiseKmReportComponent,
    DailySummaryKmReportComponent,
    Twenty4HoursKmReportComponent,
    Twenty4HoursAnalysisComponent,
    GeofenceReportComponent,
    DriverPerformanceComponent,
    TrackNearestVechileComponent,
    ChartsComponent,
    TrackHistoryComponent,
    TemperatureReportsComponent,
    FuelReportsComponent,
    RoutesComponent,
    ServicingManagementComponent,
    FuelManagementComponent,
    DriverManagementComponent,
    TyreManagementComponent,
    SparePartManagementComponent,
    AlertmanagementComponent,
    KilometerSummerymanagementComponent,
    KilometerCustomermanagementComponent,
    CustomermanagementComponent,
    ExpansesManagementComponent,
    TripManagementComponent,
    HubManagementComponent,
    AddCustomerManagementComponent,
    VechiclesDetailsComponent,
    CustomerDetailsComponent,
    AddFuelManagementComponent,
    AddServiceManagementComponent,
    VehicleNumberDetailsComponent,
    ViewServiceImageComponent,
    ViewFuelImageComponent,
    ShowvehicleImageComponent,
    DriverListComponent,
    AddDriverComponent,
    DashboardReportComponent,
  ],
  providers: [MatNativeDatetimeModule,
    MatDatetimepickerModule,]
})
export class PagesModule {
}
