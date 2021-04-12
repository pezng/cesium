import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobeComponent } from './components/globe/globe.component';
import { CesiumDirective } from './directives/cesium.directive';


@NgModule({
  declarations: [GlobeComponent, CesiumDirective],
  exports: [GlobeComponent, CesiumDirective],
  imports: [
    CommonModule
  ]
})
export class GlobeModule { }
