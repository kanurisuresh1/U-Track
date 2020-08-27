export interface SingleCustomDeviceReportStatsResponse {
    status: boolean;
    message: string;
    data: Data;
  }
  export interface Data {
    detail?: (DetailEntity)[] | null;
    max_speed: string;
    avg_speed: string;
    total_distance: string;
    total_travelled_time: string;
  }
  export interface DetailEntity {
    max_speed: string;
    avg_speed: string;
    total_travelled_time: string;
    total_distance: string;
    report_date: string;
  }
  