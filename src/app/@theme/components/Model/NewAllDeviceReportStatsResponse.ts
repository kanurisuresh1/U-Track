export interface NewAllDeviceReportStatsResponse {
  status: boolean;
  message: string;
  data: AllDeviceReportStats[];
}
export interface AllDeviceReportStats {
  this_week_travelled_time: string;
  today_travelled_time: string;
  this_weekVehiclelist_string: string;
  todayvehiclelist_string: string;
  device_link_id: string;
  device_id: string;
  vehicle_number: string;
  vehicle_type: string;
  today: DetailEntityOrToday;
  this_week: ThisWeekOrThisMonth;
  this_month: ThisWeekOrThisMonth;
}
export interface DetailEntityOrToday {
  max_speed: string;
  max_speed_formatted: any;
  avg_speed: string;
  avg_speed_formatted: any;
  total_travelled_time: string;
  total_travelled_time_formatted: any;
  total_distance: string;
  total_distance_formatted: any;
  report_date: string;
}
export interface ThisWeekOrThisMonth {
  detail?: DetailEntityOrToday[];

  max_speed: string;
  max_speed_formatted: any;
  avg_speed: string;
  avg_speed_formatted: any;
  total_travelled_time: string;
  total_travelled_time_formatted: any;
  total_distance: string;
  total_distance_formatted: any;

}


