import { Component, OnInit } from '@angular/core';
import { HeaderInteractorService } from '../../../../@theme/components/Services/header-interactor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss']
})
export class IndustriesComponent implements OnInit {
  

  constructor(private headerService: HeaderInteractorService,private location : Location) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Industries')
  }

  back() {
    this.location.back();
  }



  showSelectedDiv(show) {

  if (show == "Logistics") {
      document.getElementById("LogisticsDiv").style.display = "block";

  }else if (show == "ConstructionDiv") {
    alert("sureshj")
    document.getElementById("ConstructionDiv").style.display = "block";
   
  }else if (show == "RetailDiv") {

    document.getElementById("RetailDiv").style.display = "block";
   
  }else if (show == "ServiceDiv") {

    document.getElementById("ServiceDiv").style.display = "block";
   
  }else if (show == "GovernmentDiv") {

    document.getElementById("GovernmentDiv").style.display = "block";
   
  }else if (show == "FoodDiv") {

    document.getElementById("FoodDiv").style.display = "block";
   
  }else if (show == "CourierDiv") {

    document.getElementById("CourierDiv").style.display = "block";
   
  }else if (show == "WasteDiv") {

    document.getElementById("WasteDiv").style.display = "block";
   
  }else if (show == "EngineeringDiv") {

    document.getElementById("EngineeringDiv").style.display = "block";
   
  }else if (show == "SecurityDiv") {

    document.getElementById("SecurityDiv").style.display = "block";
   
  }

}

}
