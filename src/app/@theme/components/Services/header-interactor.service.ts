import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderInteractorService {

  constructor() { }
  invokeHeaderFunction = new EventEmitter();    
  invokeShowBackButton = new EventEmitter();   
  invokeShowAddButton = new EventEmitter();    
  subsVar: Subscription;
  addButtonSubs:Subscription;
  backButtonSubs:Subscription;
  updateHeaderTitle(headerName : String) {  
    this.invokeHeaderFunction.emit(headerName);    
  }   
  showBackButton(val : boolean){
this.invokeShowBackButton.emit(val);
  }
  showAddButton(val : boolean){
    this.invokeShowAddButton.emit(val);
  }
}
