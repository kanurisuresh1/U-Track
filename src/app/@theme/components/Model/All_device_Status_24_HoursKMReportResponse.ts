export interface Today {
    max_speed: string;
    max_speed_formatted: any;
    avg_speed: string;
    avg_speed_formatted: any;
    total_travelled_time: string;
    total_travelled_time_formatted: string;
    total_distance: string;
    total_distance_formatted:string;
}

export interface AllDeviceReportStatus24HoursData {
    device_link_id: string;
    device_id: string;
    vehicle_number: string;
    today: Today;
}

export interface AllDeviceReportStatus24Hours {
    status: boolean;
    message: string;
    data: AllDeviceReportStatus24HoursData[];
}
