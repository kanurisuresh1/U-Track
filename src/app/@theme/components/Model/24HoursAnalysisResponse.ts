export interface Twenty4HoursAnalysisData {
    vehicle_analysis_id: string;
    device_link_id: string;
    device_id: string;
    vehicle_number: string;
    vehicle_type: string;
    report_date: string;
    driver_id: string;
    driver_name: string;
    driver_number: string;
    customer_id: string;
    customer_name: string;
    customer_number: string;
    total_distance: string;
    total_night_distance: string;
    total_day_distance: string;
    total_distance_formatted: any;
    total_night_distance_formatted: any;
    total_day_distance_formatted: any;
    max_speed: string;
    avg_speed: string;
    max_speed_formatted: any;
    avg_speed_formatted: any;
    sudden_accerlation: string;
    sudden_deceleration: string;
    total_stopped_time: string;
    total_stopped_time_formatted: any;
    total_travelled_time: string;
    total_travelled_time_formatted: any;
    total_night_travelled_time: string;
    total_day_travelled_time: string;
    added_date: string;
    status: string;
}

export interface Twenty4HoursAnalysis {
    status: boolean;
    message: string;
    data: Twenty4HoursAnalysisData[];
}


