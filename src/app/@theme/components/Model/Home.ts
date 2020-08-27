export interface HomeData {
    device_link_id: string;
    device_id: string;
    device_imei: string;
    gps_lock_status: string;
    vehicle_number: string;
    vehicle_name: string;
    expiry_date: string;
    vehicle_type: string;
    customer_id: string;
    customer_name: string;
    customer_image: string;
    customer_mobile: string;
    product_type: string;
    vehicle_image: string;
    driver_id: string;
    temp_driver_id: string;
    nick_name: string;
    driver_name: string;
    driver_mobile: string;
    latitude: string;
    longitude: string;
    course: string;
    speed: string;
    speed_formatted: any;
    servertime: string;
    devicetime: string;
    attributes: string;
    valid: string;
    fixtime: string;
    day_distance: string;
    last_running_time: string;
    last_location: string;
    last_loc_distance: string;
    ignition: boolean;
    motion_status: boolean;
    fuel_point: string;
    temp1: string;
    batteryLevel: string;
    device_user_list_count: number;
    inprogress_trip: any;
    stopped_time: string;
}

export interface Home {
    status: boolean;
    message: string;
    data: HomeData[];
}
