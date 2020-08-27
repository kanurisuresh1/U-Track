
    export interface GeofenceReportDetails {
        device_geofence_history_id: string;
        geofence_id: string;
        device_id: string;
        geofence_enter_date_time: string;
        geofence_exit_date_time: string;
        duration_mins: string;
        status: string;
        geofence_name: string;
        location_name: string;
        latitude: string;
        longitude: string;
        vehicle_number: string;
        device_link_id: string;
    }

    export interface GeofenceReport {
        status: boolean;
        message: string;
        data: GeofenceReportDetails[];
    }



