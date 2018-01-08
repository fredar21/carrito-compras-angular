import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
	@Input() cantidad;
	elementosCarrito;
	//cantidad;
	elementosMostrar;


  constructor() {

 
  		 //this.obtenerLocalStorage();
  		//this.contador();
  		//this.elementosMostrar[this.elementosCarrito];
  		//console.log(this.elementosCarrito);
  		
   }

  	obtenerLocalStorage(){
		this.elementosCarrito = JSON.parse(localStorage.getItem("carrito"));
		
}

	contador(){
		
		this.cantidad = Object.keys(this.elementosCarrito).length;
  		//console.log(this.cantidad);

		
}
	}

