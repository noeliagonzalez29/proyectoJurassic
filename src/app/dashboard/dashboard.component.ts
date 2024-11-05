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
  parque: any= {}; //mandar todo el objeto
  dino: any[]=[];
  recinto: any[]=[];
  emergencia: any[]=[];
  moneda:number =0;
  compradosDino: number[] = [];
  compradosRecinto: number[] = [];
  juegoCompleto = false;

  constructor(private ParqueService: ParqueService, private DinosauriosService: DinosauriosService, private RecintosService:RecintosService, private LocalstorageService: LocalstorageService){}

//cargar la info de parque,dinos y recintos de la api

cargaParque(){
  this.ParqueService.getParque().subscribe(data =>{
    this.parque= data;
    //si hay monedas acumuladas tb hay que cargarlas
    console.log(this.parque);
    if (data) {
      this.parque = data;
      this.moneda = this.parque.coins;
      this.compradosDino = this.parque.dinosaurIds || [];
      this.compradosRecinto = this.parque.recintosIds || [];
      this.LocalstorageService.setCoins(this.moneda); // Guarda en localStorage
    }

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
      this.verificarJuegoCompleto();

    }
  }

  comprarRecinto(recinto: any) {
    if (this.puedeComprar(recinto.cost)) {
      this.moneda -= recinto.cost;

      this.compradosRecinto.push(recinto.id);
      this.actualizarMonedas();
      this.verificarJuegoCompleto();
    }
  }
  actualizarMonedas() {
    this.parque.coins = this.moneda;
    this.parque.dinosaurIds = this.compradosDino;
    this.parque.recintosIds = this.compradosRecinto;

    this.ParqueService.actualizarParque(this.parque).subscribe(
      response => {
        console.log('Parque actualizado en el servidor:', response);
      },
      error => {
        console.error('Error al actualizar el parque:', error);
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
  verificarJuegoCompleto() {
    this.juegoCompleto =
      this.dino.length === this.compradosDino.length &&
      this.recinto.length === this.compradosRecinto.length;
  }
}
