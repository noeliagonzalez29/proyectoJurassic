import { LocalstorageService } from './../services/localstorage.service';
import { RecintosService } from './../services/recintos.service';
import { DinosauriosService } from './../services/dinosaurios.service';
import { ParqueService } from './../services/parque.service';
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  parque: any[] =[];
  dino: any[]=[];
  recinto: any[]=[];
  emergencia: any[]=[];
  moneda:number =0;
  compradosDino: number[] = [];
  compradosRecinto: number[] = [];

  constructor(private ParqueService: ParqueService, private DinosauriosService: DinosauriosService, private RecintosService:RecintosService, private LocalstorageService: LocalstorageService){}

//cargar la info de parque,dinos y recintos de la api

cargaParque(){
  this.ParqueService.getParque().subscribe(data =>{
    this.parque= data;
    //si hay monedas acumuladas tb hay que cargarlas
    if (data && data.length > 0) {
      this.moneda = data[0].coins; // Cargar la moneda inicial desde el parque
      this.LocalstorageService.setCoins(this.moneda);
    }
    this.ParqueService.actualizarParque(this.moneda).subscribe(
      response => {
        console.log('Monedas actualizadas en el servidor:', response);
      },
      error => {
        console.error('Error al actualizar las monedas:', error);
      }
    );

  });
}
cargaDino(){
  this.DinosauriosService.getDinos().subscribe(data=>{
    this.dino= data;
  });
}
cargaRecintoa(){
  this.RecintosService.getRecintos().subscribe(data=>{
    this.recinto=data;
  });
}


  ngOnInit(): void {
      this.cargaParque();
      this.cargaDino();
      this.cargaRecintoa();
      this.moneda = this.LocalstorageService.getCoins();
  }
  //al hacer click se incrementa las monedas
  AumentoMoneda(){
    this.moneda +=50;
    this.actualizarMonedas();
  }
   // Función para verificar si se puede comprar según el costo y monedas disponibles
   puedeComprar(costo: number): boolean {
    return this.moneda >= costo;
  }

  // Función para realizar la compra, restando lo que cuesta
  comprarDino(dino: any) {
    if (this.puedeComprar(dino.cost)) {
      this.moneda -= dino.cost;

      this.compradosDino.push(dino.id);
      this.actualizarMonedas();

    }
  }

  comprarRecinto(recinto: any) {
    if (this.puedeComprar(recinto.cost)) {
      this.moneda -= recinto.cost;
      
      this.compradosRecinto.push(recinto.id);
      this.actualizarMonedas();
    }
  }
  actualizarMonedas() {
    this.ParqueService.actualizarParque(this.moneda).subscribe(
      response => {
        console.log('Monedas actualizadas en el servidor:', response);
      },
      error => {
        console.error('Error al actualizar las monedas:', error);
      }
    );
  }
  estaComprado(id: number, tipo: 'dino' | 'recinto'): boolean {
    if (tipo === 'dino') {
      return this.compradosDino.includes(id);
    } else if (tipo === 'recinto') {
      return this.compradosRecinto.includes(id);
    }
    return false; // En caso de tipo no válido
  }
}
