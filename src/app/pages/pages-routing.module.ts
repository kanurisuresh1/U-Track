import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ReportsAndChartsComponent } from './reports-and-charts/reports-and-charts.component';
import { GPSLockComponent } from './gpslock/gpslock.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FleetManagementComponent } from './fleet-management/fleet-management.component';
import { LiveTrackComponent } from './dashboard/live-track/live-track.component';
import { TrackHistoryComponent } from './dashboard/track-history/track-history.component';
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
import { RoutesComponent } from './reports-and-charts/routes/routes.component';
import { TrackNearestVechileComponent } from './reports-and-charts/track-nearest-vechile/track-nearest-vechile.component';
import { ChartsComponent } from './reports-and-charts/charts/charts.component';
import { TemperatureReportsComponent } from './reports-and-charts/temperature-reports/temperature-reports.component';
import { FuelReportsComponent } from './reports-and-charts/fuel-reports/fuel-reports.component';
import { ServicingManagementComponent } from './fleet-management/servicing-management/servicing-management.component';
import { FuelManagementComponent } from './fleet-management/fuel-management/fuel-management.component';
import { DriverManagementComponent } from './fleet-management/driver-management/driver-management.component';
import { TyreManagementComponent } from './fleet-management/tyre-management/tyre-management.component';
import { SparePartManagementComponent } from './fleet-management/spare-part-management/spare-part-management.component';
import { AlertmanagementComponent } from './fleet-management/alertmanagement/alertmanagement.component';
import { KilometerSummerymanagementComponent } from './fleet-management/kilometer-summerymanagement/kilometer-summerymanagement.component';
import { CustomermanagementComponent } from './fleet-management/customermanagement/customermanagement.component';
import { ExpansesManagementComponent } from './fleet-management/expanses-management/expanses-management.component';
import { TripManagementComponent } from './fleet-management/trip-management/trip-management.component';
import { HubManagementComponent } from './fleet-management/hub-management/hub-management.component';
import { AboutUsComponent } from './others/help/about-us/about-us.component';
import { AddCustomerManagementComponent } from './fleet-management/customermanagement/add-customer-management/add-customer-management.component';
import { VechiclesDetailsComponent } from './fleet-management/vechicles-details/vechicles-details.component';
import { CustomerDetailsComponent } from './fleet-management/customermanagement/customer-details/customer-details.component';
import { VehicleNumberDetailsComponent } from './fleet-management/vechicles-details/vehicle-number-details/vehicle-number-details.component';
import { DriverListComponent } from './fleet-management/driver-management/driver-list/driver-list.component';
import { AddDriverComponent } from './fleet-management/driver-management/add-driver/add-driver.component';
import { TermsAndConditionsComponent } from './others/help/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './others/help/privacy-policy/privacy-policy.component';
import { ProductWarrentyComponent } from './others/help/product-warrenty/product-warrenty.component';
import { ServicesAndReportsComponent } from './others/help/services-and-reports/services-and-reports.component';
import { WhyUtrackComponent } from './others/help/why-utrack/why-utrack.component';
import { AdvantagesComponent } from './others/help/advantages/advantages.component';
import { IndustriesComponent } from './others/help/industries/industries.component';
import { HowToUseComponent } from './others/help/how-to-use/how-to-use.component';
import { FAQSComponent } from './others/help/faqs/faqs.component';
import { DashboardReportComponent } from './reports-and-charts/dashboard-report/dashboard-report.component';
import { CreateGroupComponent } from './Myaccount/my-groups/create-group/create-group.component';
import { EditGroupComponent } from './Myaccount/my-groups/edit-group/edit-group.component';
import { MyExecutiveComponent } from './others/help/my-executive/my-executive.component';
import { PlanDetailsComponent } from './purchases/buy-plans/plan-details/plan-details.component';
import { PurchasedPlanHistoryComponent } from './purchases/buy-plans/purchased-plan-history/purchased-plan-history.component';
import { PurchasedPlanDetailsComponent } from './purchases/buy-plans/purchased-plan-details/purchased-plan-details.component';
import { ProductDetailsComponent } from './purchases/buy-products/product-details/product-details.component';
import { OrderDetailsComponent } from './purchases/my-orders/order-details/order-details.component';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'livetrack',
        component: LiveTrackComponent,
      },
      {
        path: 'trackhistory',
        component: TrackHistoryComponent
      },

      { path: 'reports_charts', component: ReportsAndChartsComponent },

      // Reports and Charts Internal Links

      { path: 'reports_charts/stop-page-report', component: StoppageReportComponent },
      { path: 'reports_charts/track-report', component: TrackReportComponent },
      { path: 'reports_charts/distance-report', component: DistanceReportComponent },
      { path: 'reports_charts/full-vechicle-details', component: VechiclesDetailsComponent },
      { path: 'reports_charts/daywise-km-report', component: DaywiseKmReportComponent },
      { path: 'reports_charts/daily-summary-km-report', component: DailySummaryKmReportComponent },
      { path: 'reports_charts/24hours-km-report', component: Twenty4HoursKmReportComponent },
      { path: 'reports_charts/24hours-analysis', component: Twenty4HoursAnalysisComponent },
      { path: 'reports_charts/geofence-report', component: GeofenceReportComponent },
      { path: 'reports_charts/driver-performance', component: DriverPerformanceComponent },
      { path: 'reports_charts/routes', component: RoutesComponent },
      { path: 'reports_charts/track-nearest-vechicle', component: TrackNearestVechileComponent },
      { path: 'reports_charts/charts', component: ChartsComponent },
      { path: 'reports_charts/track-history', component: TrackHistoryComponent },
      { path: 'reports_charts/temperature-reports', component: TemperatureReportsComponent },
      { path: 'reports_charts/fuel-reports', component: FuelReportsComponent },
      { path: 'reports_charts/dashboard-report', component: DashboardReportComponent },



      //full vehicle details link 
      { path: 'reports_charts/vehicle-details/:device_link_id', component: VehicleNumberDetailsComponent },




      { path: 'gpslock', component: GPSLockComponent },

      { path: 'fleet-management', component: FleetManagementComponent },

      // Fleet Management Internal Links
      { path: 'fleet-management/service-management', component: ServicingManagementComponent },
      { path: 'fleet-management/fuel-management', component: FuelManagementComponent },
      { path: 'fleet-management/driver-management', component: DriverManagementComponent },
      { path: 'fleet-management/tyre-management', component: TyreManagementComponent },
      { path: 'fleet-management/spare-parts-management', component: SparePartManagementComponent },
      { path: 'fleet-management/alert-management', component: AlertmanagementComponent },
      { path: 'fleet-management/kilometer-summary-management', component: KilometerSummerymanagementComponent },
      { path: 'fleet-management/customer-management', component: CustomermanagementComponent },
      { path: 'fleet-management/expanses-management', component: ExpansesManagementComponent },
      { path: 'fleet-management/trip-management', component: TripManagementComponent },
      { path: 'fleet-management/hub-management', component: HubManagementComponent },
      { path: 'fleet-management/vechicle-management', component: VechiclesDetailsComponent },
      { path: 'fleet-management/customer-details/:customer_id', component: CustomerDetailsComponent },

      { path: 'fleet-management/vehicle-details/:device_link_id', component: VehicleNumberDetailsComponent },
      { path: 'fleet-management/driver-management/driver-list', component: DriverListComponent },
      { path: 'fleet-management/driver-management/add-driver', component: AddDriverComponent },


      {
        path: 'myaccount',
        loadChildren: () => import('./Myaccount/myaccount.module')
          .then(m => m.MyaccountModule),
      },

      //MyAccount Internal Paths
      {
        path: 'myaccount/my-executive',
        component: MyExecutiveComponent,
      },
      { path: 'myaccount/create-group',
       component: CreateGroupComponent },
      { path: 'myaccount/mygroups/edit-group', 
      component: EditGroupComponent },

      {
        path: 'purchases',
        loadChildren: () => import('./purchases/purchases.module')
          .then(m => m.PurchasesModule),
      },

      // add suresh path
      
      { path: 'purchases/plan-details', component: PlanDetailsComponent },

      { path: 'purchases/purchased-plan-details',component: PurchasedPlanDetailsComponent  },

      { path: 'purchases/purchased-plan-history',component: PurchasedPlanHistoryComponent },
      
      { path: 'purchases/product-details',component: ProductDetailsComponent },

      { path: 'purchases/order-details',component: OrderDetailsComponent },
      
      { path: 'notifications', component: NotificationsComponent },

      {
        path: 'others',
        loadChildren: () => import('./others/others.module')
          .then(m => m.OthersModule),
      },
      //Others/Help Internal child links
      { path: 'help/terms_conditions', component: TermsAndConditionsComponent },
      { path: 'help/privacy_policy', component: PrivacyPolicyComponent },
      { path: 'help/product_warranty', component: ProductWarrentyComponent },
      { path: 'help/about_us', component: AboutUsComponent },
      { path: 'help/services_and_reports', component: ServicesAndReportsComponent },
      { path: 'help/why_utrack', component: WhyUtrackComponent },
      { path: 'help/advantages', component: AdvantagesComponent },
      { path: 'help/industries', component: IndustriesComponent },
      { path: 'help/faqs', component: FAQSComponent },
      { path: 'help/how_to_use', component: HowToUseComponent },
      { path: 'help/my_executive', component: MyExecutiveComponent },


      {
        path: 'miscellaneous',
        loadChildren: () => import('./miscellaneous/miscellaneous.module')
          .then(m => m.MiscellaneousModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
