import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SelectHeroComponent } from './components/select-hero/select-hero.component';
import { SelectVillainComponent } from './components/select-villain/select-villain.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, SelectHeroComponent, SelectVillainComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
