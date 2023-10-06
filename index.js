let productos = [
    {nombre: "Oso Blanco" , stock: 5 , precio:3000},
    {nombre: "Oso Violeta" , stock: 10 , precio:3500},
    {nombre: "Oso Marron" , stock: 3 , precio:4500},
    {nombre: "Oso Azul" , stock: 8 , precio:4000},
    {nombre: "Oso Negro" , stock: 7 , precio:6000},
    {nombre: "Oso Rojo" , stock: 6 , precio:5000}
]



let btnComprar = document.getElementsByClassName("btnComprar");

for(let boton of btnComprar){
    boton.addEventListener("click" , agregarCarrito);
}

let carrito = [];


function agregarCarrito(e){

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombreProducto = padre.querySelector("h2").innerText;
    let precioProducto = padre.querySelector("p").innerText;
    let imgProducto = abuelo.querySelector("img").src;

  


    

    let productoExistente = carrito.find( oso => oso.nombre === nombreProducto);

    if( productoExistente ){
        productoExistente.cantidad++;
       
        let cantidad = productoExistente.cantidad;
        let productoPrecioNumerico = parseInt(precioProducto.replace("$" , ""));
        let total = cantidad * productoPrecioNumerico;
        productoExistente.total = total;

        
           
    }

    else{
       
        let producto = {
            nombre: nombreProducto,
            precio: precioProducto,
            img: imgProducto,
            total: parseInt(precioProducto.replace("$" , "")),
            cantidad: 1
        };
        carrito.push(producto);
    }

   carritoStorage();
   mostrarCarrito();
    
}

function mostrarCarrito(){

    let tabla = document.getElementById("tbody");
    tabla.innerHTML = "";

    for( let producto of carrito ){

        let fila = document.createElement("tr");
        fila.innerHTML = 
       `<td><img src="${producto.img}" class="producto_imagen"></td>
        <td><p>${producto.nombre}</p></td>
        <td>${producto.cantidad}</td>
        <td>${producto.precio}<td>
        <td>${"$"+producto.total}<td>
        <td><button class="btnBorrarProducto">Borrar</button></td>`;
        tabla.append(fila);
    }

    let btnBorrar = document.querySelectorAll(".btnBorrarProducto");

    for( let btn of btnBorrar){
        btn.addEventListener("click" , borrarProducto);

    }

}

function borrarProducto(e){
    console.log("BORRAR ESTE ELEMENTO: ", e.target );

    let abuelo = e.target.parentNode.parentNode;
    let nombreProducto = abuelo.querySelector("p").innerText;
    
    abuelo.remove();
     
    carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
    carritoStorage();
}

function carritoStorage(){
    let carritoStorage = JSON.stringify(carrito);
    sessionStorage.setItem( "productosCarrito" , carritoStorage);
}

let compraCarrito = document.getElementById("compraCarrito");
compraCarrito.addEventListener("click" , compraCarrito);
