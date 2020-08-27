export interface MyProfileResponse {
  status: boolean;
  message: string;
  data?: MyProfileResponseData[];
}
export interface MyProfileResponseData {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_code: string;
  mobile: string;
  profile_image: string;
  state_id: string;
  district_id: string;
  city_id?: any;
  address1: string;
  address2?: any;
  area_name: string;
  zipcode: string;
  latitude?: any;
  longitude?: any;
  user_type: string;
  register_date: string;
  notify_pref: string;
  referral_code: string;
  wallet_balance: string;
  device_type: string;
  device_name: string;
  app_version: string;
  device_os: string;
  status: string;
  dl_front: string;
  dl_back: string;
  dl_number: string;
  is_corporate: string;
  state: string;
  district_name: string;
  city?: any;
  registered_by_type: string;
  registered_by_id: string;
  company_id: string;
  company_name: string;
  company_logo: string;
  company_state_id: string;
  company_district_id: string;
  company_city_id: string;
  company_address: string;
  company_landmark: string;
  company_area: string;
  company_pincode: string;
  company_email: string;
  company_mobile: string;
  company_state: string;
  company_district_name: string;
  company_city?: any;
  total_devices_buy: string;
}