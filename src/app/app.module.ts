import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { CatalogListComponent } from './features/catalog/components/catalog-list.components';
import { CatalogFormComponent } from './features/catalog/components/catalog-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    CatalogListComponent,
    CatalogFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
