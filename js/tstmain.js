// declaramos el Fetch para la llamada de los productos

let productos = [];

async function fetchProductos() {
  try {
    const response = await fetch("./js/productos.json");
    const data = await response.json();
    productos = data;
    cargarProductos(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  } finally {
    console.log("Proceso de obtención de productos completado.");
  }
}

// declaramos nuestras constantes para traer las id y las clases sin necesidad de generar tanto código en la estructura (HTML)

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

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

// utilizamos dichas constantes anteriormente mencionadas para crear los addeventlistener y que cree la funcionalidad de los botones
// todo esto lo hacemos a través de un forEach

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", async (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      try {
        const response = await fetch("./js/categorias.json");
        const categorias = await response.json();
        const categoria = categorias.find((cat) => cat.id === e.currentTarget.id);
        tituloPrincipal.innerText = categoria.nombre;
        const productosBoton = productos.filter(
          (producto) => producto.categoria.id === e.currentTarget.id
        );
        cargarProductos(productosBoton);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

// como sabemos que el let declarado de botones agregar recién está mencionado en nuestra línea 231
// creamos esta función para cuando se carguen productos nuevos también se actualicen los botones
// Declaramos la función y utilizamos el forEach para agregar al carrito

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  try {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
  } catch (error) {
    console.error("Error al obtener los productos del carrito:", error);
  }
} else {
  productosEnCarrito = [];
}

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
    const productoAgregado = productos.find((producto) => producto.id === idBoton);

    if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
      const index = productosEnCarrito.findIndex((producto) => producto.id === idBoton);
      productosEnCarrito[index].cantidad++;
    } else {
      productoAgregado.cantidad = 1;
      productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
  }
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  numerito.innerText = nuevoNumerito;
}

(async function () {
  await fetchProductos();
})();
