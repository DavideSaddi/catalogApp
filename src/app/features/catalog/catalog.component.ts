import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from './model/device';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-catalog',
  template: `
    <app-catalog-form
      [active]="active"
      (save)="save($event)"
      (reset)="reset($event)">
    </app-catalog-form>
  <hr>
  <!-- Elenco dei device, esportato su catalog-list con binding in input degli elementi-->
  <app-catalog-list 
    [devices]="devices"
    [active]="active"
    (setActive)="setActive($event)"
    (delete)="deleteHandler($event)">
  </app-catalog-list> 

  `,
  styles: [
  ]
})
export class CatalogComponent {
  devices!: Device[];
  active!: Device;

  constructor(private http: HttpClient) {
    this.getAll();
  }
  getAll() {
    this.http.get<Device[]>('http://localhost:3000/devices')
      .subscribe(
        res => {
          this.devices = res;
          // console.log(res);
        }
      )
  }

  deleteHandler(device: Device) {
    this.http.delete<Device>(`http://localhost:3000/devices/${device.id}`)
      .subscribe(
        res => {
          const index = this.devices.findIndex(i => i.id === device.id);
          this.devices.splice(index, 1);
          console.log(`Element removed at position #${device.id}!`);
        }

      )
  }
  //Switch per il salvataggio o la modifica degli elementi
  save(form: NgForm) {
    console.log(form.value);
    if (this.active) {
      this.edit(form);
    } else {
      this.add(form);
    }
  }

  add(form: NgForm) {
    this.http.post<Device>(`http://localhost:3000/devices/`, form.value)
      .subscribe(res => {
        this.devices.push(res);
        form.reset(); //per resettare il form dopo l'inserimento del valore
      }
      )
  }
  //Metodo che seleziona una cella e visualizza il contenuto nel form previa modifica
  setActive(device: Device) {
    this.active = device;
  }

  edit(form: NgForm) {
    this.http.patch<Device>(`http://localhost:3000/devices/${this.active?.id}`, form.value)
      .subscribe(res => {
        const index = this.devices.findIndex(i => i.id === this.active?.id);
        this.devices[index] = res;
      }
      )
  }

  reset(form: NgForm) {
    //this.active = null;
    form.reset();
  }
  
}
