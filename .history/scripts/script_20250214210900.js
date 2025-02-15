document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".producto button"); // Captura todos los botones
    const carrito = document.querySelector("#carrito"); // Captura el contenedor del carrito

    let carritoItems = []; // Lista de productos en el carrito

    // Agregar evento a cada botón
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (event) => {
            const producto = event.target.closest(".producto"); // Captura el producto contenedor
            const nombre = producto.querySelector("h3").textContent; // Nombre del producto
            const precio = producto.querySelector(".precio").textContent; // Precio del producto

            // Agregar producto al carrito
            carritoItems.push({ nombre, precio });
            actualizarCarrito();
        });
    });

    // Función para actualizar el carrito
    function actualizarCarrito() {
        carrito.innerHTML = "<h2>Carrito de Compras</h2>"; // Limpia el contenido previo
        if (carritoItems.length === 0) {
            carrito.innerHTML += "<p>Tu carrito está vacío</p>";
        } else {
            carritoItems.forEach((item) => {
                const itemHTML = `<p>${item.nombre} - ${item.precio}</p>`;
                carrito.innerHTML += itemHTML;
            });
        }
    }
});

