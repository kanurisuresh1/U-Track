import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { MygroupListResponse } from '../../../@theme/components/Model/MygroupListRespones';

@Component({
  selector: 'ngx-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  imagePath:string;
  TotaldeviceListId:string;
  device_link_id_list:string;


  constructor(private headerService : HeaderInteractorService, private http: HttpClient,private routes: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('My Groups')
    this.getMyGroupList();
  }

  getMyGroupList() {

    const params = new HttpParams()
      .set('user_id', localStorage.getItem("USER_ID"))
      .set('device_token', "Web")
      .set('user_type', "Customer")
      .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<MygroupListResponse>(environment.apiBaseUrl + 'group_list', { params }).subscribe(respone => {
      if (respone.status) {
        this.MyGroupList = respone.data;
        this.MyGroupList.forEach((row) => {
         row.imagePath = "assets/images/groups-icons/" + row.group_icon_name + ".png";
         row.TotaldeviceListId= row.device_link_id_list.length 
        //  row.device_link_id_list=row.device_link_id_list[0].device_link_id 
        })
      }
    })
  }

  MyGroupList=[]

  createGroup() {
    this.routes.navigate([`../create-group`],
    { relativeTo: this.activatedRoute })
    }

    editGroupList(GroupId, GroupName, GroupImageName,DeviceLinkListId) {
      localStorage.setItem("GroupId", GroupId);
      localStorage.setItem("GroupName", GroupName);
      localStorage.setItem("GroupImageName", GroupImageName);
      localStorage.setItem("DeviceLinkListId", DeviceLinkListId);
      this.routes.navigate([`../mygroups/edit-group`],
        { relativeTo: this.activatedRoute })
    } 


}
