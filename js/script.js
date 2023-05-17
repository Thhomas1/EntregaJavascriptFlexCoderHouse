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

// PRODUCTOS
const productos = [
    // Abrigos
    {
        id: "abrigo-01",
        titulo: "Abrigo 01",
        imagen: "./img/abrigos/01.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-02",
        titulo: "Abrigo 02",
        imagen: "./img/abrigos/02.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-03",
        titulo: "Abrigo 03",
        imagen: "./img/abrigos/03.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-04",
        titulo: "Abrigo 04",
        imagen: "./img/abrigos/04.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    {
        id: "abrigo-05",
        titulo: "Abrigo 05",
        imagen: "./img/abrigos/05.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 1000
    },
    // Camisetas
    {
        id: "camiseta-01",
        titulo: "Camiseta 01",
        imagen: "./img/camisetas/01.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-02",
        titulo: "Camiseta 02",
        imagen: "./img/camisetas/02.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-03",
        titulo: "Camiseta 03",
        imagen: "./img/camisetas/03.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-04",
        titulo: "Camiseta 04",
        imagen: "./img/camisetas/04.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-05",
        titulo: "Camiseta 05",
        imagen: "./img/camisetas/05.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-06",
        titulo: "Camiseta 06",
        imagen: "./img/camisetas/06.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-07",
        titulo: "Camiseta 07",
        imagen: "./img/camisetas/07.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    {
        id: "camiseta-08",
        titulo: "Camiseta 08",
        imagen: "./img/camisetas/08.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 1000
    },
    // Pantalones
    {
        id: "pantalon-01",
        titulo: "Pantalón 01",
        imagen: "./img/pantalones/01.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-02",
        titulo: "Pantalón 02",
        imagen: "./img/pantalones/02.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-03",
        titulo: "Pantalón 03",
        imagen: "./img/pantalones/03.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-04",
        titulo: "Pantalón 04",
        imagen: "./img/pantalones/04.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    },
    {
        id: "pantalon-05",
        titulo: "Pantalón 05",
        imagen: "./img/pantalones/05.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 1000
    }
];


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