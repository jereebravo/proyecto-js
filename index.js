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

btnComprar.addEventListener("click" , agregarCarrito)

function agregarCarrito(producto){
    

}

