import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CurrentDevicePositionResponse } from '../../../@theme/components/Model/CurrentDevicePositionResponse';
import { DatePipe } from '@angular/common';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import * as $ from 'jquery';
import { SingleCustomDeviceReportStatsResponse } from '../../../@theme/components/Model/SingleCustomDeviceReportStatsResponse';

@Component({
    selector: 'ngx-live-track',
    templateUrl: './live-track.component.html',
    styleUrls: ['./live-track.component.scss']
})


export class LiveTrackComponent implements OnInit {

    map
    datepipe = new DatePipe('en-us');
    data: CurrentDevicePositionResponse;
    latitude: any;
    longitude: any;
    speed_killometer: string;
    fuel: number;
    course: string;
    marker: any;
    latitudedata: string;
    longitudedata: string;
    speed: string;
    device_time: any;
    Location: string;
    deviceLinkId: any;
    vehicle_type: any;
    selectedObject: any;
    product_type: any;


    today_max_speed: string;
    today_avg_speed: string;
    today_total_distance: number;
    today_travelled_time: string;
    yesterday_max_speed: string;
    yesterday_avg_speed: string;
    yesterday_total_distance: number;
    yesterday_travelled_time: string;
    last7days_avg_speed: string;
    last7days_total_distance: number;
    last7days_travelled_time: string;
    last7days_max_speed: string;


    constructor(private headerService: HeaderInteractorService, private http: HttpClient, private apiService: UtrackService,) { }

    ngOnInit(): void {
        this.headerService.updateHeaderTitle('Live Track')
        this.map = new google.maps.Map(document.getElementById('livemap'), {
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
        this.getVehicles();

    }


    updateSelectedValue(event: string) {
        this.selectedObject = JSON.parse(event);
        this.vehicle_type = this.selectedObject.vehicle_type;
        this.product_type = this.selectedObject.product_type;
        this.first_loadlive_track(this.selectedObject.device_link_id, this.selectedObject.device_id)
    }


    changeMapType() {
        var selectmap = (document.getElementById('maptype') as HTMLInputElement).value
        this.map.setMapTypeId(selectmap);
    }


    first_loadlive_track(device_link_id, device_id) {
        const params = new HttpParams()
            .set('user_id', localStorage.getItem("USER_ID"))
            .set('user_type', localStorage.getItem("USER_TYPE"))
            .set('device_id', device_id)
            .set('device_link_id', device_link_id)
            .set('device_token', "Web")
            .set('X-Api-Key', environment.X_API_KEY)
        this.http.get<CurrentDevicePositionResponse>(environment.apiBaseUrl + 'current_device_position', { params }).subscribe(response => {
            if (response.status) {
                this.data = response.data;
                this.updatedata(this.data);
                console.log(response.data)
            }
        })
    }

    vehicles = []

    getVehicles() {
        this.apiService.getHomeLite().subscribe(response => {
            this.vehicles = response.data
            console.log(this.vehicles)
            this.deviceLinkId = this.vehicles[0].device_link_id;
            this.first_loadlive_track(this.deviceLinkId, this.vehicles[0].device_id);
            this.get_statistics_data(this.deviceLinkId);
        })
    }



    updatedata(data) {

        this.latitude = data.latitude;
        this.longitude = data.longitude;
        console.log(data)

        var finalLocationWithDistance = "";

        if (data.last_location == null) {
            finalLocationWithDistance = "-";
        } else {
            if (data.last_loc_distance == null || data.last_loc_distance == 0.00) {
                finalLocationWithDistance = data.last_location;
            } else {
                finalLocationWithDistance = data.last_loc_distance + ' KM From ' + data.last_location;
            }
        }


        this.updateMapData(data);

        this.speed_killometer = (data.speed * 2).toFixed(2);
        var fuel = parseFloat(data.fuel_point).toFixed(1);
        var temp1 = parseFloat(data.temp1).toFixed(1);
        var current_datetime = new Date(data.devicetime);


        var fueltextcolor;

        if (this.fuel > 10) {
            fueltextcolor = "<span style='color: green;'>" + fuel + " Liters</span>";
        } else {
            fueltextcolor = "<span style='color: red;'>" + fuel + " Liters</span>";
        }


        this.latitudedata = parseFloat(this.latitude).toFixed(4);
        this.longitudedata = parseFloat(this.longitude).toFixed(4);
        this.speed = parseInt(this.speed_killometer) + " KMPH";
        this.device_time = this.datepipe.transform(new Date(data.devicetime), 'dd MMM yyyy hh:mm:ss a');
        this.Location = finalLocationWithDistance;


        if ("Temperature" == this.product_type) {
            $("#product_property_name").show();
            $("#product_property_value").show();
            document.getElementById("product_property_name").innerHTML = "Temperature : ";
            document.getElementById("product_property_value").innerHTML = "<span style='color: blue;'>" + temp1 + "<sup>o</sup>" + "C</span>";
        } else if ("Fuel" == this.product_type) {
            $("#product_property_name").show();
            $("#product_property_value").show();
            document.getElementById("product_property_name").innerHTML = "Fuel : ";
            document.getElementById("product_property_value").innerHTML = fueltextcolor;

        } else {
            $("#product_property_name").hide();
            $("#product_property_value").hide();
        }


    }


    updateMapData(row) {

        var mapImage;

        var course = row.course / 10;

        var live_position_valuecourse = course.toFixed(1);

        var live_position_value = parseInt(live_position_valuecourse) * 10;

        var imageCarRed = 'assets/images/red-car/car_r_' + live_position_value + '.png';
        var imageCarGreen = 'assets/images/green-car/car_g_' + live_position_value + '.png';
        var imageCarYellow = 'assets/images/yellow-car/car_y_' + live_position_value + '.png';

        var imageTruckGreen = 'assets/images/all-trucks/truck_g_' + live_position_value + '.png';
        var imageTruckRed = 'assets/images/all-trucks/truck_r_' + live_position_value + '.png';
        var imageTruckYellow = 'assets/images/all-trucks/truck_y_' + live_position_value + '.png';

        var imageAutoGreen = 'assets/images/auto/auto_g_' + live_position_value + '.png';
        var imageAutoRed = 'assets/images/auto/auto_r_' + live_position_value + '.png';
        var imageAutoYellow = 'assets/images/auto/auto_y_' + live_position_value + '.png';

        var imageBikeGreen = 'assets/images/bike/bike_g_' + live_position_value + '.png';
        var imageBikeRed = 'assets/images/bike/bike_r_' + live_position_value + '.png';
        var imageBikeYellow = 'assets/images/bike/bike_y_' + live_position_value + '.png';

        var imageBusGreen = 'assets/images/bus/bus_g_' + live_position_value + '.png';
        var imageBusRed = 'assets/images/bus/bus_r_' + live_position_value + '.png';
        var imageBusYellow = 'assets/images/bus/bus_y_' + live_position_value + '.png';

        var imageScootyGreen = 'assets/images/scooty/scooty_g_' + live_position_value + '.png';
        var imageScootyRed = 'assets/images/scooty/scooty_r_' + live_position_value + '.png';
        var imageScootyYellow = 'assets/images/scooty/scooty_y_' + live_position_value + '.png';

        var imageTrainGreen = 'assets/images/train/train_g_' + live_position_value + '.png';
        var imageTrainRed = 'assets/images/train/train_r_' + live_position_value + '.png';
        var imageTrainYellow = 'assets/images/train/train_y_' + live_position_value + '.png';

        var imageIdCardRed = "assets/images/map_icons/marker_type_red_id.png";
        var imageIdCardGreen = "assets/images/map_icons/marker_type_green_id.png";
        var imageIdCardYellow = "assets/images/map_icons/marker_type_yellow_id.png";

        var imageMobileRed = "images/map_icons/marker_type_red_mobile.png";
        var imageMobileGreen = "images/map_icons/marker_type_green_mobile.png";
        var imageMobileYellow = "images/map_icons/marker_type_yellow_mobile.png";


        if (row.speed && row.devicetime && row.fixtime &&
            ((new Date()).getTime() - (new Date(row.devicetime)).getTime()) < 7200000) {

            if (row.speed > 0) {

                switch (this.vehicle_type) {
                    case "Car":
                        mapImage = imageCarGreen;
                        break;
                    case "Bus":
                        mapImage = imageBusGreen;
                        break;
                    case "Truck":
                        mapImage = imageTruckGreen;
                        break;
                    case "Auto":
                        mapImage = imageAutoGreen;
                        break;
                    case "Bike":
                        mapImage = imageBikeGreen;
                        break;
                    case "Mobile":
                        mapImage = imageMobileGreen;
                        break;
                    case "IdCard":
                        mapImage = imageIdCardGreen;
                        break;
                    case "Scooty":
                        mapImage = imageScootyGreen;
                        break;
                    case "Train":
                        mapImage = imageTrainGreen;
                        break;
                }

            } else if (row.speed == 0) {

                switch (this.vehicle_type) {
                    case "Car":
                        mapImage = imageCarRed;
                        break;
                    case "Bus":
                        mapImage = imageBusRed;
                        break;
                    case "Truck":
                        mapImage = imageTruckRed;
                        break;
                    case "Auto":
                        mapImage = imageAutoRed;
                        break;
                    case "Bike":
                        mapImage = imageBikeRed;
                        break;
                    case "Mobile":
                        mapImage = imageMobileRed;
                        break;
                    case "IDCard":
                        mapImage = imageIdCardRed;
                        break;
                    case "Scooty":
                        mapImage = imageScootyRed;
                        break;
                    case "Train":
                        mapImage = imageTrainRed;
                        break;
                }

            }

        } else {

            switch (this.vehicle_type) {

                case "Car":
                    mapImage = imageCarYellow;
                    break;
                case "Bus":
                    mapImage = imageBusYellow;
                    break;
                case "Truck":
                    mapImage = imageTruckYellow;
                    break;
                case "Auto":
                    mapImage = imageAutoYellow;
                    break;
                case "Bike":
                    mapImage = imageBikeYellow;
                    break;
                case "Mobile":
                    mapImage = imageMobileYellow;
                    break;
                case "IDCard":
                    mapImage = imageIdCardYellow;
                    break;
                case "Scooty":
                    mapImage = imageScootyYellow;
                    break;
                case "Train":
                    mapImage = imageTrainYellow;
                    break;
            }

        }

        var icon = {
            path: mapImage,
            scale: 1,
            rotation: 130,
        };

        var latlng = new google.maps.LatLng(parseFloat(this.latitude), parseFloat(this.longitude));

        if (this.marker == null) {
            this.marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(this.latitude),
                    lng: parseFloat(this.longitude)
                },
                // zoom: 13,
                map: this.map,
                icon: mapImage,
                animation: google.maps.Animation.DROP
            });
            this.map.setCenter(latlng);
        } else {
            this.marker.setIcon(mapImage);
            /* marker.setPosition(latlng);
             map.setCenter(latlng);*/
            this.animatedMove(this.marker, .5, this.marker.getPosition(), latlng);
        }
    }


    animatedMove(marker, t, current, moveto) {
        var lat = current.lat();
        var lng = current.lng();

        var deltalat = (moveto.lat() - current.lat()) / 100;
        var deltalng = (moveto.lng() - current.lng()) / 100;

        var delay = 10 * t;
        for (var i = 0; i < 100; i++) {
            (function (ind) {
                setTimeout(
                    function () {
                        var lat = marker.position.lat();
                        var lng = marker.position.lng();
                        lat += deltalat;
                        lng += deltalng;
                        this.latlng = new google.maps.LatLng(lat, lng);
                        marker.setPosition(this.latlng);
                    }, delay * ind
                );
            })(i)
        }

        this.map.setCenter(moveto);
    }


    get_statistics_data(device_link_id,) {

        var stringStartDate = this.datepipe.transform(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')

        var stringEndData = this.datepipe.transform(new Date(), 'yyyy-MM-dd')

        const params = new HttpParams()
        .set('user_id', localStorage.getItem("USER_ID"))
        .set('device_link_id', device_link_id )
        .set('from_date', stringStartDate)
        .set('to_date', stringEndData )
        .set('device_token', "Web")
        .set('X-Api-Key', environment.X_API_KEY)
    this.http.get<SingleCustomDeviceReportStatsResponse>(environment.apiBaseUrl + 'single_custom_device_report_stats', { params }).subscribe(response => {
        if (response.status) {
            this.singledevicedata=response.data.detail
             console.log(this.singledevicedata) ;
             var today = response.data.detail.length - 1;
             this.today_max_speed = response.data.detail[today].max_speed;
             this.today_avg_speed = response.data.detail[today].avg_speed;
             this.today_total_distance = Number(response.data.detail[today].total_distance)/1000 ;

             this.today_travelled_time = response.data.detail[today].total_travelled_time;

             if (this.today_travelled_time == "0") {
                 this.today_travelled_time = "00:00:00"
             } else {
                this.today_travelled_time= 
                this.datepipe.transform(new Date( Number(this.today_travelled_time) *1000), 'hh:mm:ss');
             }

             var yesterday = response.data.detail.length - 2;
             this.yesterday_max_speed = response.data.detail[yesterday].max_speed;
             this.yesterday_avg_speed = response.data.detail[yesterday].avg_speed;
             this.yesterday_total_distance = Number(response.data.detail[yesterday].total_distance) / 1000;
             this.yesterday_travelled_time = response.data.detail[yesterday].total_travelled_time;


             if (this.yesterday_travelled_time == "0") {
                 this.yesterday_travelled_time = "00:00:00"
             } else {
                 this.yesterday_travelled_time = 
                 this.datepipe.transform(new Date( Number(this.yesterday_travelled_time) *1000), 'hh:mm:ss');
             }

             this.last7days_max_speed = response.data.max_speed;
             this.last7days_avg_speed = response.data.avg_speed;
             this.last7days_total_distance = Number(response.data.total_distance )/ 1000;
             this.last7days_travelled_time = response.data.total_travelled_time;

             if (this.last7days_travelled_time == "0") {
                 this.last7days_travelled_time = "00:00:00"
             } else {
                 this.last7days_travelled_time =
                 this.datepipe.transform(new Date( Number(this.last7days_travelled_time) *1000), 'hh:mm:ss'); 
             }
      
        }
    }) 

    }
    singledevicedata=[]


}
