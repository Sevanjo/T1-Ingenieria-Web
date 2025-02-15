document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".producto button"); // Captura todos los botones
    const carrito = document.querySelector("#carrito p"); // Captura el carrito

    let carritoItems = []; // Lista de productos en el carrito

    // Agregar evento a cada botón
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
        if (carritoItems.length === 0) {
            carrito.textContent = "Tu carrito está vacío";
        } else {
            carrito.innerHTML = carritoItems
                .map((item) => `${item.nombre} - ${item.precio}`)
                .join("<br>");
        }
    }
});
