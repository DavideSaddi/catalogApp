import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from '../model/device';

@Component({
  selector: 'app-catalog-form',
  template: `
<form #f="ngForm" 
  (submit)="save.emit(f)">
  <!-- Model sincronizza il one-way data binding -->
    <input type="text" 
      [ngModel]="active?.label" 
      name="label"    
      required 
      class="form-control"
      placeholder="Modello">

    <input type="number" 
      [ngModel]="active?.price" 
      name="price" 
      class="form-control"
      placeholder="Prezzo">
      
      <div class="btn-group">
  <button type="button" (click)="save.emit(f)" class="btn btn-warning">{{active ? 'EDIT' : 'ADD'}}</button>
  <button type="button" (click)="reset.emit(f)" class="btn btn-warning" *ngIf="active">RESET</button>
</div>
      
  </form>
  `,
  styles: [
  ]
})
export class CatalogFormComponent  {
  @Input() active? : Device | null;
  @Output() save : EventEmitter<any> = new EventEmitter<any>();
  @Output() reset : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  
}
