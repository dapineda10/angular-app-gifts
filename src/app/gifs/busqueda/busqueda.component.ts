import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private GifsService: GifsService){}

  buscar():void{
    let valor = this.txtBuscar.nativeElement.value
    this.GifsService.buscarGifts(valor);

    if(valor.length>2)
      this.txtBuscar.nativeElement.value = "";
  }

}
