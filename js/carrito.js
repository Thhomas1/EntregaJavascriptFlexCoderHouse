// llamamo al localStorage
const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));
productosEnCarrito = JSON.parse(productosEnCarrito);

// creamos todas las constantes con sus querySelectors 

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprando = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar"); 
// este let lo usamos para eliminar y agarramos el querySelectorAll para justamente poder eliminar ALL
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");


function cargarProductosCarrito() {
    // si hay productos en carrito los mostramos y sino mostramos el mensaje

if (productosEnCarrito && productosEnCarrito.length > 0) {
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprando.classList.add("disabled");


    // esto lo hacemos para que quede el carrito productos totalmente vacio
    contenedorCarritoProductos.innerHTML = "";

// Creamos un forEach para que por cada producto creamos un div con la class CarritoProducto
// y el InnerHtml para poner todo lo que queremos en cada producto

    productosEnCarrito.forEach(producto => {
        div.classList.add("carrito-producto");
        div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            // todo esto queremos que se haga un append en contenedorCarritoProductos

            contenedorCarritoProductos.append(div);
    })

    actualizarBotonesEliminar();

}else{
    // esto lo hacemos ya que queremos tambien que si borramos productos que tambien esto pase 

    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprando.classList.add("disabled");

    }
    
}



cargarProductosCarrito();


// Creamos las distintas funcioens para eliminar del carrito y actualizar del carrito 

function actualizarBotonesEliminar() {
     botonesEliminar = document.querySelectorAll(".producto-eliminar");

        botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}



function eliminarDelCarrito(){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}



// le agregamos un addEventListener para llamar a la funcion de vaciar 

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}