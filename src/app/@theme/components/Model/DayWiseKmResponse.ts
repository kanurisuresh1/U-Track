export interface Detail {
    max_speed: string;
    avg_speed: string;
    total_travelled_time: string;
    total_distance: string;
    max_speed_formatted: any;
    avg_speed_formatted: any;
    total_travelled_time_formatted: any;
    total_distance_formatted: any;
    report_date: string;
}

export interface DayWiseKmReportData {
    detail: Detail[];
    max_speed: string;
    avg_speed: string;
    total_distance: string;
    total_travelled_time: string;
}

export interface DayWiseKmReport {
    status: boolean;
    message: string;
    data: DayWiseKmReportData;
}
