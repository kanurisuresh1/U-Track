export interface MygroupListResponse {
  status: boolean;
  message: string;
  data?: MygroupListResponseData[];
}
export interface MygroupListResponseData {
  group_id: string;
  user_id: string;
  group_name: string;
  group_icon_name: string;
  added_date: string;
  modified_date?: null;
  statu: string;
  device_link_id_list?: DeviceLinkIdListEntity[];
}
export interface DeviceLinkIdListEntity {
  device_link_id: string;
}
