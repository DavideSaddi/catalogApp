import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Device } from "../model/device";

@Component ({
    selector: 'app-catalog-list',
    template: `
    <ul class="list-group">
    <li class="list-group-item" 
    *ngFor="let device of devices"
    (click)="setActive.emit(device)"
    [ngClass]="{'active' : device?.id === active?.id}">
    {{device.label}}
  <div class="pull-right">
  <i class="fa fa-trash" (click)="deleteHandler($event, device)"></i>
  </div>
  </li>
  </ul>
    `
})
export class CatalogListComponent {
    @Input() devices?: Device[] | null;
    @Input() active? : Device | null;
    @Output() setActive : EventEmitter<Device> = new EventEmitter<Device>();
    @Output() delete : EventEmitter<Device> = new EventEmitter<Device>();

    deleteHandler(event : MouseEvent, device : Device) {
        event?.stopPropagation();
        this.delete.emit(device)
        
    }
}