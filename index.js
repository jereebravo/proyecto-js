let productos = [
    {nombre: "Oso Blanco" , stock: 5 , precio:3000},
    {nombre: "Oso Violeta" , stock: 10 , precio:3500},
    {nombre: "Oso Marron" , stock: 3 , precio:4500},
    {nombre: "Oso Azul" , stock: 8 , precio:4000},
    {nombre: "Oso Negro" , stock: 7 , precio:6000},
    {nombre: "Oso Rojo" , stock: 6 , precio:5000}
]

let productosJson = JSON.stringify( productos);
localStorage.setItem("productos" , productosJson);

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


    let producto = {
        nombre: nombreProducto,
        precio: precioProducto,
        img: imgProducto,
        cantidad: 1

    };

    carrito.push(producto);
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
        <td>${producto.precio}</td>`;
        tabla.append(fila);
    }

}

