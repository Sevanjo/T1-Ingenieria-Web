document.addEventListener("DOMContentLoaded", async () => {
    const productosContainer = document.querySelector("#productos");
    const carritoContainer = document.querySelector("#carrito");
    let carrito = [];

    // Función para actualizar el carrito en el DOM
    function actualizarCarrito() {
        let contenido = document.querySelector("#carrito .contenido");
        if (!contenido) {
            contenido = document.createElement("div");
            contenido.classList.add("contenido");
            carritoContainer.appendChild(contenido);
        }

        contenido.innerHTML = "";

        if (carrito.length === 0) {
            contenido.innerHTML = "<p>Tu carrito está vacío</p>";
        } else {
            carrito.forEach((producto, index) => {
                let div = document.createElement("div");
                div.classList.add("producto-carrito");
                div.innerHTML = `
                    <p>${producto.nombre} - ${producto.precio}</p>
                    <button class="eliminar" data-index="${index}">X</button>
                `;
                contenido.appendChild(div);
            });

            // Agregar eventos a los botones de eliminar
            document.querySelectorAll(".eliminar").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    let index = e.target.getAttribute("data-index");
                    carrito.splice(index, 1);
                    actualizarCarrito();
                });
            });
        }
    }

    // Cargar productos desde la API
    try {
        const response = await fetch("http://localhost:3000/productos");
        const productos = await response.json();

        productosContainer.innerHTML = "<h2>Lista de Productos</h2>";

        productos.forEach(producto => {
            let div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p class="precio">$${producto.precio}</p>
                <button class="agregar" data-id="${producto.id}">Añadir al carrito</button>
            `;
            productosContainer.appendChild(div);
        });

        // Agregar eventos a los botones de "Añadir al carrito"
        document.querySelectorAll(".agregar").forEach(btn => {
            btn.addEventListener("click", (e) => {
                let productoElemento = e.target.parentElement;
                let nombre = productoElemento.querySelector("h3").textContent;
                let precio = productoElemento.querySelector(".precio").textContent;
                carrito.push({ nombre, precio });
                actualizarCarrito();
            });
        });

    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
    }

    // Pruebas de funcionalidad
    function testAgregarProducto() {
        carrito = [];
        carrito.push({ nombre: "Mochila", precio: "$20" });
        console.assert(carrito.length === 1, "❌ Error: No se agregó el producto al carrito");
        console.assert(carrito[0].nombre === "Mochila", "❌ Error: Nombre del producto incorrecto");
        console.assert(carrito[0].precio === "$20", "❌ Error: Precio del producto incorrecto");
        console.log("✅ Prueba testAgregarProducto pasada");
    }

    function testEliminarProducto() {
        carrito = [{ nombre: "Bolso", precio: "$30" }];
        carrito.splice(0, 1);
        console.assert(carrito.length === 0, "❌ Error: No se eliminó el producto del carrito");
        console.log("✅ Prueba testEliminarProducto pasada");
    }

    function testVaciarCarrito() {
        carrito = [{ nombre: "Zapato", precio: "$50" }, { nombre: "Reloj", precio: "$100" }];
        carrito = [];
        console.assert(carrito.length === 0, "❌ Error: No se vació el carrito correctamente");
        console.log("✅ Prueba testVaciarCarrito pasada");
    }

    // Ejecutar pruebas
    testAgregarProducto();
    testEliminarProducto();
    testVaciarCarrito();
});
