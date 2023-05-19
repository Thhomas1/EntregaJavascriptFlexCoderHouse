
// Javascript Entrega Final Romero Thomas
// :D

/*
declaramos el Fetch para la llamada de los productos. Dejamos de utilizar el fetch
y pasamos a la funcionalidad de Async Await justamente para no estar utilizando el .then a cada rato.

Por medio de la funcion asincronica y con nuestra nueva funcionalidad mucho mas moderna
de try / catch / finally que nos permite fijar el error producido
*/
let productos = [];

async function fetchProductos() {
  try {
    const response = await fetch("./js/productos.json");
    const data = await response.json(); // para parsearlo...
    productos = data;
    cargarProductos(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  } finally {
    console.log("Proceso de obtención de productos completado.");
  }
}

// declaramos nuestras constantes para traer las idy las clases sin necesidad de generar tanto código en la estructura (HTML)

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
const aside = document.querySelector("aside");

botonesCategorias.forEach((boton) =>
  boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
  })
);
// Creamos la funcion para que carguen dichos productos y aparezcan en el inicio

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach((producto) => {
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

    contenedorProductos.append(div);
  });

  actualizarBotonesAgregar();
}

// utilizamos dichas constantes anteriormente mencionadas para crear los addeventlistener y que cree la funcionalidad de los botones.
// todo esto lo hacemos a través de un forEach 

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
}); // *Explicacion de esta parte abajo de todo!



// creamos esta función para cuando se carguen productos nuevos también se actualicen los botones
// Declaramos la función y utilizamos el forEach para agregar al carrito

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

// declaramos los let...

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  try {
    productosEnCarrito = JSON.parse(productosEnCarritoLS); // y hacemos lo mismo como antes para el local storage
    actualizarNumerito();
  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);
  }
} else {
  productosEnCarrito = [];
}


// Utilizamos la libreria por medio de una funcion asincrona justamente para no andar con el .then por todos lados y utilizamos Try catch para implementarla
async function agregarAlCarrito(e) {
  try { 
    Toastify({
      text: "Se agrego al carrito",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to bottom, #2d2c31, #ececec)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem",
      },
      offset: {
        x: "1.5rem",
        y: "1.5rem",
      },
      onClick: function () {},
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find((producto) => producto.id === idBoton);  //  Se busca el producto correspondiente por medio del .find y se guarda en la variable productoAgregado.

    if (productosEnCarrito.some((producto) => producto.id === idBoton)) { // Se verifica si el producto ya está en el carrito por medio del metodo .some. Si el producto ya está en el carrito, se ejecuta el bloque de código dentro de esta condición.
      const index = productosEnCarrito.findIndex((producto) => producto.id === idBoton); //  Si el producto ya está en el carrito, se busca su índice dentro del array productosEnCarrito utilizando el método findIndex()
      productosEnCarrito[index].cantidad++; // Se incrementa la cantidad del producto por medio de ++
    } else {
      productoAgregado.cantidad = 1;
      productosEnCarrito.push(productoAgregado); // Se establece la cantidad del producto agregado como 1.
    }
    // llamamos a la funcion de actualizar...
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
  }
}

// utilizamos dicha funcion justamente con el reduce para incrementar por medio del acumulador la cantidad del carrito :D

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numerito.innerText = nuevoNumerito;
}

(async function () {
  await fetchProductos();
})();
















/*
Arrays
Comentar las partes
Dinamico
Try Catch
Uso de Dom
JSON si o si para remplazar lo que seria lo de las apis
SweetAlert u otra libreria mas linda

*/

/*

! Desconozco porque pero no me andaba el try catch de esta parte, estuve varios dias y tuve que volver al if else porque para la navegacion del mismo

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", async (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active")); // eliminamos la clase active de todos los botones para permitir el distinto estilo visual
    e.currentTarget.classList.add("active"); // se agrega la clase "active" al botón en el que se hizo clic

    if (e.currentTarget.id != "todos") {
      try {
        const response = await fetch("./js/productos.json"); // lo mismo que arriba de todo creando la solicitud para obtener los arrays del JSON 
        const categorias = await response.json(); // convierte la rpta...
        const categoria = categorias.find((cat) => cat.id === e.currentTarget.id); // se busca la categoría correspondiente al id del botón en el que se hizo clic en el array de categorías obtenido anteriormente
        tituloPrincipal.innerText = categoria.nombre; // Se actualiza el contenido...
        const productosBoton = productos.filter(
          (producto) => producto.categoria.id === e.currentTarget.id // Se filtran los productos para obtener solo aquellos cuya categoría coincide con el id del botón en el que se hizo clic.
        );
        cargarProductos(productosBoton); // Se llama a la función pasando como argumento los productos filtrados 
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});
*/
