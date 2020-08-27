export interface GetVehicleDetailsData {
    vehicle_detail_id: string;
    user_id: string;
    device_link_id: string;
    driver_id: string;
    vehicle_image: string;
    engine_number: string;
    chassis_number: string;
    make?: any;
    model?: any;
    over_speed: string;
    buy_date?: any;
    fuel_tank_size: string;
    fuel_type: string;
    mileage_per_litre: string;
    vehicle_registration_date?: any;
    registered_owner_name?: any;
    insurance_vender_name?: any;
    insurance_cost: string;
    insurance_number?: any;
    insurance_buy_date?: any;
    insurance_renewal_date?: any;
    pollution_check_date?: any;
    pollution_check_renewal_date?: any;
    pollution_check_cost: string;
    national_permit_id?: any;
    national_permit_date: string;
    truck_mobile_device_token: string;
    vehicle_full_image: string;
    vehicle_number_image: string;
    device_image: string;
    sim_image: string;
    added_date: string;
    modified_date: string;
    status: string;
    vehicle_image_list: VehicleImageList[];
}
export interface VehicleImageList {
    vehicle_image_id: string;
    user_id: string;
    device_link_id: string;
    image_file: string;
    image_type: string;
    added_date: string;
    modified_date: string;
    status: string;
}
export interface GetVehicleDetails {
    status: boolean;
    message: string;
    data: GetVehicleDetailsData;
}
