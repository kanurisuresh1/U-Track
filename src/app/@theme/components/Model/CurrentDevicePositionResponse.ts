export interface CurrentDevicePositionResponse {
    status: boolean;
    message: string;
    data: CurrentDevicePositionResponse;
  }
  export interface CurrentDevicePositionResponse {
    device_link_id: string;
    position_id: string;
    latitude: string;
    longitude: string;
    course: string;
    speed: string;
    devicetime: string;
    servertime: string;
    last_location: string;
    last_loc_distance: string;
    valid: string;
    fixtime: string;
    fuel_point: string;
    temp1: string;
    batteryLevel: string;
  }
  