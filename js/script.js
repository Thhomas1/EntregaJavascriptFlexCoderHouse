
// llamamos al JSON por medio del Fetch

let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


// declaramos nuestras constantes para traer las id y las clases sin necesidad que generar tanto codigo en la estructura(HTML)
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categorias");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Creamos la funcion para que carguen dichos productos y aparezcan en el inicio
function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = ""; // esto lo hacemos para evitar la recarga de los datos cada vez que utilizamos el metodo Filter

    productosElegidos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        // hacemos un append de este mismo div para luego llamarlo
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}

// la llamamos...

cargarProductos(productos);


// utilizamos dichas constantes anteriormente mencionadas para crear los addeventlistener y que cree la funcionalidad de los botones
// todo esto lo hacemos a traves de un forEach


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        // creamos el forEach de dicho boton para habilitar la seccion en la que estamos :)
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        // creamos el if para evitar el error de la carga de productos y formalizar nuestro metodo 
        // utilizamos el metodo filter para filtrar las distintas prendas y a traves del currentTarget traemos el id del html
        // utilizamos el metodo find   para que recorra cada producto del array y que traiga el primer producto 

        if(e.currentTarget.id != "todos") {

            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);
            
        } else {
            // array principal que tiene todos los productos
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);

        }
    })
});

// como sabemos que el let declarado de botones agregar recien esta mencionado en nuestra linea 231 
// creamos esta funcion para cuando se carguen productos nuevos tambien se actualicen los botones
// Declaramos la funcion y utilizamos el forEach para agregar al carrito

function actualizarBotonesAgregar() {
     botonesAgregar = document.querySelectorAll(".producto-agregar");
        botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


/* 
declaramos y utilizamos el metodo find para que nos devuelve nuevamente el producto 
 y por medio del metodo push cada vez que vayamos sumando productos al carrito aparece como arrays,
basicamente agregamos un producto y lo "convertimos" en un array
*/

let productosEnCarrito;

// Aca lo que hicimos es declarar la constante para el Local Storage por medio de un if declarando que el carrito quede en vacio


let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
//const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
     productosEnCarrito = JSON.parse(productosEnCarritoLS);
     actualizarNumerito(); // SI hay productos en carrito que aparezca actualizado el numerito

} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {


    // Insertamos la libreria Toastify

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();






    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    /* en este caso utilizamos el metodo some para fijarse si hay algo que coincida y devuelva a modo booleano (True o False)
        esto lo hacemos para que en el carrito no se repita el mismo array, es decir el mismo producto
        creandole un if subiendole la cantidad de dicho array sin necesidad que se repita 
    */

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++; // esto lo hacemos para ir sumando la cantidad
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    // llamamos al localstorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

// declaramos la funcion para hacer funcional la suma del carrito
// Utilizamos un reduce para agarrar dicho array y declararlo a un solo valor, en este caso lo usamos para actualizar el numerito y reducir las cantidades

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}





















/*
Arrays
Comentar las partes
Dinamico
Try Catch
Uso de Dom
JSON si o si para remplazar lo que seria lo de las apis
SweetAlert u otra libreria mas linda


async function getApiValue{
    Try

    Catch

    finally

}

getApiValue()
*/