import { CommonModule } from '@angular/common';
import { JuegoService } from './../services/juego.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  parque: any;
  dino: any[]=[];
  recinto: any[]=[];
  emergencia: any[]=[];
  moneda:number =0;

  constructor(private JuegoService:JuegoService){}

//cargar la info de parque,dinos y recintos de la api

cargaParque(){
  this.JuegoService.getParque().subscribe(data =>{
    this.parque= data;
    //si hay monedas acumuladas tb hay que cargarlas
    this.moneda= data.moneda;
  });
}
cargaDino(){
  this.JuegoService.getDinos().subscribe(data=>{
    this.dino= data;
  });
}
cargaRecintoa(){
  this.JuegoService.getRecintos().subscribe(data=>{
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
    this.parque.moneda= this.moneda;
  }
}
