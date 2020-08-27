import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';

@Component({
  selector: 'ngx-my-geofence',
  templateUrl: './my-geofence.component.html',
  styleUrls: ['./my-geofence.component.scss']
})
export class MyGeofenceComponent implements OnInit {

  constructor(private headerService : HeaderInteractorService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('My Geofence');
    var  map = new google.maps.Map(document.getElementById('Geofencemap'), {
      zoom: 16,
      center: {
          lat: 17.438557777777778,
          lng: 78.39158222222223
      },
      disableDefaultUI: true,
      mapTypeControl: false,
      fullscreenControl: true,
      zoomControl: true,
  });
  }

}
