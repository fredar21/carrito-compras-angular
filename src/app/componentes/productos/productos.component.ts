import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
		
	public productos=[];
	public carrito=[];
	public productosStorage=[];
	public cantidad;
	public precio;
	public elementosCarritoStorage;
	closeResult: string;

	
	constructor(private modalService: NgbModal) {

	this.productos = [
	{"id":1,"nombre": "producto 01", "precio": 2000,"inventario": "5", "imagen":"https://www.milo.com.co/site/wp-content/uploads/2017/07/milo-lata-4-210x300.png"},
	{"id":2,"nombre": "producto 02", "precio": 2000,"inventario": "5", "imagen": "http://cdn.glamour.mx/uploads/images/thumbs/mx/glam/2/s/2017/02/productos_ganadores_de_premios_belleza_glamour_mexico_2016_579534630_413x620.jpg"	},
	{"id":3,"nombre": "producto 03", "precio": 2000,"inventario": "5"	},
	{"id":4,"nombre": "producto 04", "precio": 2000,"inventario": "5"	},
	{"id":5,"nombre": "producto 05", "precio": 2000,"inventario": "5" },
	{"id":6,"nombre": "producto 06", "precio": 2000,"inventario": "5"	},
	{"id":7,"nombre": "producto 07", "precio": 2000,"inventario": "5" },
	{"id":8,"nombre": "producto 08", "precio": 2000,"inventario": "5" },
	{"id":9,"nombre": "producto 09", "precio":2000,"inventario": "5" },
	{"id":10,"nombre": "producto 10", "precio":2000,"inventario": "5" },
	{"id":11,"nombre": "producto 11", "precio":2000,"inventario": "5" },
	{"id":12,"nombre": "producto 12", "precio":2000,"inventario": "5" },
	{"id":13,"nombre": "producto 13", "precio":2000,"inventario": "5" },
	{"id":14,"nombre": "producto 14", "precio":2000,"inventario": "5" },
	{"id":15,"nombre": "producto 15", "precio":2000,"inventario": "5" },
	{"id":16,"nombre": "producto 16", "precio":2000,"inventario": "5" },
	{"id":17,"nombre": "producto 17", "precio":2000,"inventario": "5" },
	{"id":18,"nombre": "producto 18", "precio":2000,"inventario": "5" },
	{"id":19,"nombre": "producto 19", "precio":2000,"inventario": "5" },
	{"id":20,"nombre": "producto 20", "precio":2000,"inventario": "5" }

	];

	this.obtenerLocalStorage();

	let comprobarStorageCarrito= JSON.parse(localStorage.getItem("carrito"));
	if(comprobarStorageCarrito == null){
		this.cantidad = 0;
		this.precio = 0;
	}else{
		this.cantidad = JSON.parse(localStorage.getItem("carrito")).length;
	}


	//comprueba si el array de productos esta guardado en el local storage
	let comprobarStorageProductos = JSON.parse(localStorage.getItem("productos"));

	if(comprobarStorageProductos == null){
		localStorage.setItem("productos", JSON.stringify(this.productos));
	}
	  this.productosStorage = JSON.parse(localStorage.getItem("productos"));
	}

	eliminar(i){
		this.agregar(i);
		//this.productos.splice(i,1);
		this.actualizarInventariosAgregarCarrito(i);
		this.elementosCarrito();
		this.obtenerLocalStorage();


	}

	eliminarProductoCarrito(i){
		let carrito= this.obtenerLocalStorage();
		this.actualizarInventariosEliminarCarrito(i);
		carrito.splice(i,1);
		console.log(carrito);
		console.log(i);
		this.cantidad= carrito.length;
		localStorage.setItem("carrito", JSON.stringify(carrito));
		this.sumar(0);
		
	}

	elementosCarrito(){
		this.cantidad = JSON.parse(localStorage.getItem("carrito")).length;
	}

	agregar(i){
		let agregar = this.productosStorage[i];
		let comprobarStorageCarrito= JSON.parse(localStorage.getItem("carrito"));
		if(comprobarStorageCarrito == null){
			this.carrito.push(agregar);
			this.guardarLocalStorage();
		}else{
			this.carrito = JSON.parse(localStorage.getItem("carrito"));
			this.carrito.push(agregar);
			this.guardarLocalStorage();
		}
		
		this.sumar(1);
	}
	
	sumar(valor){
		let cantidadProductosCarrito = this.cantidad+valor;
		let carrito= this.obtenerLocalStorage();
		let suma = 0;
		for (var i = 0; i < cantidadProductosCarrito; i++){		
				suma += carrito[i].precio; 
			}
		this.precio = suma;

	}

	/*
	agregar(i){
		let agregar = this.productos[i];
		console.log(agregar);
		this.carrito.push(agregar);
		this.guardarLocalStorage();
		//this.sumar();

	}
*/
	guardarLocalStorage(){
		localStorage.setItem("carrito", JSON.stringify(this.carrito));
	}

	obtenerLocalStorage(){
		this.elementosCarritoStorage = JSON.parse(localStorage.getItem("carrito"));
		return this.elementosCarritoStorage;
		
}


  //Aqui esta el error
  /*
	guardarLocalStorage(){
		this.elementosCarrito = JSON.parse(localStorage.getItem("carrito"));

		if(this.elementosCarrito==null){
			localStorage.setItem("carrito", JSON.stringify(this.carrito));
		}else{
		//JSON.stringify(this.elementosCarrito);	
		this.elementosCarrito.push(this.carrito);
		localStorage.setItem("carrito", JSON.stringify(this.elementosCarrito));
		console.log(this.elementosCarrito);
		}
	}
  */

	actualizarInventariosAgregarCarrito(i){
		let inputId= i+1;
		let tamano = this.productosStorage.length;
		for (var j = 0; j < tamano; j++) {
   			if(inputId == this.productosStorage[j].id){ 
       			this.productosStorage[j].inventario -= 1; 
       		break; 
   			}
		}
		localStorage.setItem("productos", JSON.stringify(this.productosStorage));
	}

	actualizarInventariosEliminarCarrito(i){
		let inputId= this.elementosCarritoStorage[i].id;
		console.log(inputId);
		let tamano = this.productosStorage.length;
		for (var j = 0; j <= tamano; j++) {
   			if(inputId == this.productosStorage[j].id){ 
       			this.productosStorage[j].inventario += 1; 
       		break; 
   			}
		}
		localStorage.setItem("productos", JSON.stringify(this.productosStorage));
	}



	open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }


  }

}
