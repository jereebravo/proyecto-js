let productos = [
    {nombre: "OSO BlANCO" , stock: 5 , precio:3000},
    {nombre: "OSO VIOLETA" , stock: 10 , precio:3500},
    {nombre: "OSO MARRON" , stock: 3 , precio:4500},
    {nombre: "Oso AZUL" , stock: 8 , precio:4000},
    {nombre: "Oso NEGRO" , stock: 7 , precio:6000},
    {nombre: "Oso ROJO" , stock: 6 , precio:5000}
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
    let productosStock = productos.find(oso => oso.nombre === nombreProducto);

    if( productoExistente ){

        if(productosStock.stock > productoExistente.cantidad){
            productoExistente.cantidad++;
       
        let cantidad = productoExistente.cantidad;
        let productoPrecioNumerico = parseInt(precioProducto.replace("$" , ""));
        let total = cantidad * productoPrecioNumerico;
        productoExistente.total = total;
        }

        else{
            Toastify({
                text: "No tenemos tanto stock",
                duration: 2000,
                gravity:"top",
                position: "rigth",
                backgroundColor: "red",

            }).showToast();

        }
        

        
           
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




    
let reseñas = 'data.json'
fetch(reseñas)
.then(response => response.json())
.then (data => {
    
    let divReseña = document.getElementById("reseñas");
   
    data.forEach(item => {
       let tituloReseña = document.createElement("h2");
       tituloReseña.textContent = item.nombre;
       
       let reseña = document.createElement("p");
       reseña.textContent = item.reseña;

       divReseña.appendChild(tituloReseña);
       divReseña.appendChild(reseña);
     })
    
});


let btnComprarProducto = document.querySelector("#comprarTodo");

function comprar(){
    let total = 0;
   
    for( let producto of carrito){
      total += producto.total;

    }

    if(total > 0){
        console.log("el total de la compra es: ", total);
        Swal.fire({
            title: "Total de la compra",
            text: `El total de la compra es $${total}. ¿Desea confirmar la compra?`,
            icon: "info",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar",
           
        }).then((result) => {
            if (result.isConfirmed){
                Toastify({
                    text: "Muchas gracias por su compra",
                    duration: 2000,
                    gravity:"top",
                    position: "rigth",
                    backgroundColor: "green",
    
                }).showToast();
                setTimeout( function(){
                    window.location.reload();
    
                },2000);  
            }
            
        })
        ;
    }

    else{
        Toastify({
            text: "Tiene que agregar productos al carrito",
            duration: 2000,
            gravity:"top",
            position: "rigth",
            backgroundColor: "red",

        }).showToast();

    }

   
    
   
    
}



btnComprarProducto.addEventListener("click" , comprar);




