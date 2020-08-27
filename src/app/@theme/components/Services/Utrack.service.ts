import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CustomerManagementDetails, Customers } from '../Model/CustomerManagementDetails';
import { StateResponse } from '../Model/StateRessponse';
import { AllVechiclesDetails } from '../Model/GetAllVechiclesDetails';
import { AllVehicleServiceManagement } from '../Model/VechicleServiceManagementDetails';
import { FuelManagementResponse } from '../Model/FuelManagementResponse';
import { HomeLite } from '../Model/HomeLite';
import { BasicResponse } from '../Model/Basic';
import { service_master_list } from '../Model/service_master_list';
import { GetVehicleDetails } from '../Model/GetVehicleNumberDetails';
import { DriverManagementList } from '../Model/DriverManagementList';
import { DistrictResponse } from '../Model/DistrictResponse';
import { CityResponce } from '../Model/CityResponse';
import { Home } from '../Model/Home';
import { DayWiseKmReport } from '../Model/DayWiseKmResponse';
import { NewAllDeviceReportStatsResponse } from '../Model/NewAllDeviceReportStatsResponse';
import { AllDeviceReportStatus24Hours } from '../Model/All_device_Status_24_HoursKMReportResponse';
import { Twenty4HoursAnalysis } from '../Model/24HoursAnalysisResponse';
import { DatePipe } from '@angular/common';
import { GeofenceReport } from '../Model/GeofenceReport';
import { GeofenceList } from '../Model/GeofenceList';
import { MyUsersList } from '../Model/MyUsersList';
import { DriverPerformanceReport } from '../Model/DriverPerformanceReport';
import { TemperatureList } from '../Model/TemperatureReports';
import { NotificationResponse } from '../Model/NotificationResponse';
import { LessKmsReportNotificationResponse } from '../Model/LessKMSReportNotificationRespones';
import { ChangeEmailResponse } from '../Model/ChangeResponse';
import { ChangeNumberResponse } from '../Model/ChangeNumberResponse';
import { ChangePasswordResponse } from '../Model/ChangePasswordResopnse';
import { StoppageReportResponse } from '../Model/StoppageReportResponse';

@Injectable({
  providedIn: 'root'
})
export class UtrackService {
  public USER_ID = localStorage.getItem("USER_ID");
  pipe = new DatePipe('en-US');

  constructor(private http: HttpClient) { }

  getCustomerManagementDetails() {

    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.get<Customers>(environment.apiBaseUrl + 'customer_list?user_id=' + this.USER_ID + '&user_type=Customer&device_token=Web', { headers })
  }

  getStates() {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.get<StateResponse>(environment.apiBaseUrl + 'state_list', { headers })
  }

  getDistricts(state_id) {

    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('state_id', state_id)
    return this.http.get<DistrictResponse>(environment.apiBaseUrl + 'district_list', { params })
  }

  getCities(district_id) {

    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('district_id', district_id)
    return this.http.get<CityResponce>(environment.apiBaseUrl + 'city_list', { params })
  }

  customer_add(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'customer_add', formData, { headers })
  }
  customer_edit(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'customer_edit', formData, { headers })
  }

  getAllVechiclesDetails() {

    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY);
    return this.http.get<AllVechiclesDetails>(environment.apiBaseUrl + 'get_all_vehicle_details?&device_token=Web', { params })
  }

  getVehiclesDetails(device_link_id) {

    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('device_token', "Web")
      .set('X-Api-Key', environment.X_API_KEY)
      .set('device_link_id', device_link_id)

    return this.http.get<GetVehicleDetails>(environment.apiBaseUrl + 'get_vehicle_details', { params })
  }


  getAllVehicleServiceDetails() {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      // .set('device_link_id', "90")
      .set('X-Api-Key', environment.X_API_KEY);
    return this.http.get<AllVehicleServiceManagement>(environment.apiBaseUrl + 'vehicle_service_list?&device_token=Web', { params })
  }



  getFuelDetails() {

    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('device_link_id', "")
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"));
    return this.http.get<FuelManagementResponse>(environment.apiBaseUrl + 'vehicle_fuel_listing?&device_token=Web', { params })

  }

  vehicle_fuel_add(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'vehicle_fuel_add', formData, { headers })
  }

  vehicle_fuel_delete(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'vehicle_fuel_delete', formData, { headers })
  }

  // Service Management Start
  vehicle_service_add(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'vehicle_service_add', formData, { headers })
  }

  vehicle_service_edit(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'vehicle_service_edit', formData, { headers })
  }

  vehicle_service_delete(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'vehicle_service_delete', formData, { headers })
  }



  getHomeLite() {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('device_token', "Web")
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"));
    return this.http.get<HomeLite>(environment.apiBaseUrl + 'home_lite', { params })
  }

  getHomeWebService() {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('device_token', "Web");
    return this.http.get<Home>(environment.apiBaseUrl + 'home', { params })
  }

  service_master_list() {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('device_token', "Web");
    return this.http.get<service_master_list>(environment.apiBaseUrl + 'service_master_list', { params })
  }

  vehicle_detail_edit(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'vehicle_detail_edit', formData, { headers })
  }

  vehicle_image_delete(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'vehicle_image_delete', formData, { headers })
  }


  //Driver Management 

  // my_users_list() {

  //   const headers = {
  //     'X-Api-Key': environment.X_API_KEY,
  //   }
  //   return this.http.get<DriverManagementList>(environment.apiBaseUrl + 'my_users_list?user_id=' + this.USER_ID + '&user_type=Customer&device_token=Web&type=1', { headers })
  // }

  assign_driver_to_vehicle(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'assign_driver_to_vehicle', formData, { headers })
  }

  remove_driver_from_vehicle(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }
    return this.http.post<BasicResponse>(environment.apiBaseUrl + 'remove_driver_from_vehicle', formData, { headers })
  }

  //Reports And Charts
  //Day wise Km Report

  single_custom_device_report_stats() {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('device_token', "Web")
      .set('from_date', "2020-07-25")
      .set('to_date', "2020-08-01")
      .set('device_link_id', "96")
    return this.http.get<DayWiseKmReport>(environment.apiBaseUrl + 'single_custom_device_report_stats', { params })
  }

  //Dashboard Report
  getDashboardReport() {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"));
    return this.http.get<Home>(environment.apiBaseUrl + 'home?&device_token=Web', { params })
  }

  //Daily Summary Report
  new_all_device_report_stats(report_date) {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('device_token', "Web")
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('report_date', report_date)
    return this.http.get<NewAllDeviceReportStatsResponse>(environment.apiBaseUrl + 'new_all_device_report_stats', { params })
  }

  // 24 hours KM Report
  all_device_report_stats_24_hours() {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
    return this.http.get<AllDeviceReportStatus24Hours>(environment.apiBaseUrl + 'all_device_report_stats_24_hours', { params })
  }

  analysis_report(device_link_id, from_date, to_date) {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set("device_token", "Web")
      .set("device_link_id", device_link_id)
      .set("from_date", from_date)
      .set("to_date", to_date)

    return this.http.get<Twenty4HoursAnalysis>(environment.apiBaseUrl + 'analysis_report', { params })
  }


  // maheswari Reports Code

  getdaywisekmDetails(device_link_id, from_date, to_date) {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('device_token', "Web")
      .set('from_date', from_date)
      .set('to_date', to_date)
      .set('device_link_id', device_link_id)
    return this.http.get<DayWiseKmReport>(environment.apiBaseUrl + 'single_custom_device_report_stats', { params })
  }

  geofence_report(device_id, geofence_id, from_date_time, to_date_time) {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('device_token', "Web")
      .set('to_date_time', to_date_time)
      .set('from_date_time', from_date_time)
      .set('geofence_id', geofence_id)
      .set('device_id', device_id)
    return this.http.get<GeofenceReport>(environment.apiBaseUrl + 'geofence_report', { params })
  }

  geofence_list() {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('device_token', "Web")
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"));
    return this.http.get<GeofenceList>(environment.apiBaseUrl + 'geofence_list', { params })
  }

  driver_performance_report(driver_id, from_date, to_date) {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('device_token', "Web")
      .set('driver_id', driver_id)
      .set('from_date', from_date)
      .set('to_date', to_date)
    return this.http.get<DriverPerformanceReport>(environment.apiBaseUrl + 'driver_performance_report', { params })
  }

  my_users_list() {
    const params = new HttpParams()
      .set('device_token', "Web")
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('type', '1')
    return this.http.get<MyUsersList>(environment.apiBaseUrl + 'my_users_list', { params })
  }


  temp_report(device_link_id, from_date, to_date) {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('device_token', "Web")
      .set('to_date', to_date)
      .set('from_date', from_date)
      .set('device_link_id', device_link_id)
      .set('order_by', "fixtime")
      .set('time_diff', "30")
    return this.http.get<TemperatureList>(environment.apiBaseUrl + 'temp_report', { params })
  }

  // Suresh Code 12-08-2020

  getNotifocationListDetails(page_index) {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('device_token', "Web")
      .set('X-Api-Key', environment.X_API_KEY)
      .set('page_index', page_index)
    return this.http.get<NotificationResponse>(environment.apiBaseUrl + 'user_notifications_list', { params })
  }


  getNotifocationLessKmsReportDetails(page_index) {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('device_token', "Web")
      .set('X-Api-Key', environment.X_API_KEY)
      .set('page_index', page_index)
    return this.http.get<LessKmsReportNotificationResponse>(environment.apiBaseUrl + 'less_kms_report_stats', { params })
  }



  // Settings
  //Change Email

  change_email(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }

    return this.http.post<ChangeEmailResponse>(environment.apiBaseUrl + 'change_email', formData, { headers })
  }

  //Change Password
  change_password(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }

    return this.http.post<ChangePasswordResponse>(environment.apiBaseUrl + 'changchange_passworde_email', formData, { headers })
  }

  //Change Number 
  change_mobile(formData) {
    const headers = {
      'X-Api-Key': environment.X_API_KEY,
    }

    return this.http.post<ChangeNumberResponse>(environment.apiBaseUrl + 'change_mobile', formData, { headers })
  }

  //Stoppage Report

  new_track_report_web_mongo(device_link_id, from_date, to_date) {
    const params = new HttpParams()
      .set('user_id', this.USER_ID)
      .set('X-Api-Key', environment.X_API_KEY)
      .set('user_type', localStorage.getItem("USER_TYPE"))
      .set('device_token', "Web")
      .set('to_date', to_date)
      .set('from_date', from_date)
      .set('device_link_id', device_link_id)
      .set('order_by', "fixtime")
      .set('time_diff', "30")
      .set('enable_locations', "1")
      .set('enable_consecutive', "0")
    return this.http.get<StoppageReportResponse>(environment.apiBaseUrl + 'new_track_report_web_mongo', { params })
  }


}





