document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".producto button"); // Captura todos los botones de añadir
    const carrito = document.querySelector("#carrito"); // Captura la sección del carrito
    let carritoItems = []; // Lista de productos en el carrito

    // Agregar evento a cada botón de "Añadir al carrito"
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (event) => {
            const producto = event.target.parentElement; // Captura el producto contenedor
            const nombre = producto.querySelector("h3").textContent; // Nombre del producto
            const precio = producto.querySelector(".precio").textContent; // Precio del producto
            
            // Agregar producto al carrito
            carritoItems.push({ nombre, precio });
            actualizarCarrito();
        });
    });

    // Función para actualizar el carrito
    function actualizarCarrito() {
        const carritoContenido = document.querySelector("#carrito .contenido");
        if (!carritoContenido) {
            const div = document.createElement("div");
            div.classList.add("contenido");
            carrito.appendChild(div);
        } else {
            carritoContenido.innerHTML = ""; // Vaciar contenido antes de actualizar
        }

        if (carritoItems.length === 0) {
            carritoContenido.innerHTML = "<p>Tu carrito está vacío</p>";
        } else {
            carritoItems.forEach((item, index) => {
                const productoCarrito = document.createElement("div");
                productoCarrito.classList.add("producto-carrito");
                productoCarrito.innerHTML = `
                    <p>${item.nombre} - ${item.precio}</p>
                    <button class="eliminar" data-index="${index}">X</button>
                `;
                carritoContenido.appendChild(productoCarrito);
            });

            // Agregar eventos a los botones de eliminar
            document.querySelectorAll(".eliminar").forEach((boton) => {
                boton.addEventListener("click", (event) => {
                    const index = event.target.getAttribute("data-index");
                    carritoItems.splice(index, 1); // Eliminar producto del carrito
                    actualizarCarrito(); // Actualizar la vista del carrito
                });
            });
        }
    }
});
