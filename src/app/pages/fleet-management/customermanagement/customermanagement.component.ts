import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UtrackService } from '../../../@theme/components/Services/Utrack.service';
import { CustomerManagementDetails } from '../../../@theme/components/Model/CustomerManagementDetails';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderInteractorService } from '../../../@theme/components/Services/header-interactor.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { AddCustomerManagementComponent } from './add-customer-management/add-customer-management.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as jsPDF from 'jspdf';
import  'jspdf-autotable';

@Component({
  selector: 'ngx-customermanagement',
  templateUrl: './customermanagement.component.html',
  styleUrls: ['./customermanagement.component.scss']
})
export class CustomermanagementComponent implements OnInit {



  ELEMENT_DATA: CustomerManagementDetails[]

  displayedColumns: string[] = ['customer_id', 'full_name', 'mobile', 'email', 'company_name', 'gst_number', 'state', 'added_date', 'address1', 'address2', 'edit'];
  dataSource = new MatTableDataSource<CustomerManagementDetails>(this.ELEMENT_DATA)


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("content") content: ElementRef;



  constructor(private customerService: UtrackService,
    private headerService: HeaderInteractorService,
    private location: Location,
    private routes: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.headerService.updateHeaderTitle('Customer Management')
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (localStorage.getItem("USER_ID") == null || localStorage.getItem("USER_ID") == "") {
      this.routes.navigate(["/login"]);
    }

    this.fetchDataFromApi()
  }
  private filterValue = "";

  applyFilter(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = this.filterValue.trim(); // Remove whitespace
      this.dataSource.filter = this.filterValue;
      this.fetchDataFromApi();
    }
  }
  refresh() {
    this.fetchDataFromApi()
  }
  search() {
    this.filterValue = this.filterValue.trim(); // Remove whitespace
    this.filterValue = (document.getElementById('search_element') as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue;
    this.fetchDataFromApi();
  }
  downloadPDF() {
    let doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFontSize(18);
    // doc.text('Customers', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);
    let customerTableColumn: string[] = ['Id', 'Full Name', 'Mobile', 'Email', 'Company Name', 'Gst Number', 'State', 'Added Date', 'Address 1', 'Address 2',];
    let data: String[][] = [];

    let i = 1;
    this.ELEMENT_DATA.forEach(function (value) {
      let row: String[] = [];
      row.push(i.toString());
      row.push(value.full_name);
      row.push(value.mobile);
      row.push(value.email);
      row.push(value.company_name);
      row.push(value.gst_number);
      row.push(value.state);
      row.push(value.added_date);
      row.push(value.address1);
      row.push(value.address2);

      data.push(row);
      i++;
    }),
      (doc as any).autoTable(customerTableColumn, data)

    doc.save('Customers.pdf');
  }

  fetchDataFromApi() {
    this.customerService.getCustomerManagementDetails().subscribe(response => {
      if (response.status) {
        this.ELEMENT_DATA = response.data
        this.dataSource.data = this.ELEMENT_DATA;
        this.ELEMENT_DATA.forEach(data => {
        })
      }
    })
  }
  back() {
    this.location.back()
  }
  add() {
    let dialogReference = this.dialog.open(AddCustomerManagementComponent, {
      height: '95%',
      width: '69%',
    })
    dialogReference.afterClosed().subscribe(result => {
      this.fetchDataFromApi();
    })

  }
  edit(model_data: CustomerManagementDetails) {
    let rowData = JSON.stringify(model_data)
    let dialogReference = this.dialog.open(AddCustomerManagementComponent, {
      height: '95%',
      width: '69%',
      position: <DialogPosition>{
        top: '1%'
      },
      data: { customer_id: rowData }
    })
    dialogReference.afterClosed().subscribe(result => {
      this.fetchDataFromApi();
    })

  }

  editCustomer(customer_id) {
    this.routes.navigate([`../customer-details`, customer_id],
      { relativeTo: this.activatedRoute })
  }

}
