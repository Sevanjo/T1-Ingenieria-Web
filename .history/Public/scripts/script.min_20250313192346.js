document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll(".producto button"),r=document.querySelector("#carrito"),t=[];function o(){let e=document.querySelector("#carrito .contenido");e||((e=document.createElement("div")).classList.add("contenido"),r.appendChild(e)),e.innerHTML="",0===t.length?e.innerHTML="<p>Tu carrito est\xe1 vac\xedo</p>":(t.forEach((r,t)=>{let o=document.createElement("div");o.classList.add("producto-carrito"),o.innerHTML=`
    <p>${r.nombre} - ${r.precio}</p>
    <button class="eliminar" data-index="${t}">X</button>
`,e.appendChild(o)}),document.querySelectorAll(".eliminar").forEach(e=>{e.addEventListener("click",e=>{let r=e.target.getAttribute("data-index");t.splice(r,1),o()})}))}function a(){(t=[]).push({nombre:"Mochila",precio:"$20"}),console.assert(1===t.length,"❌ Error: No se agreg\xf3 el producto al carrito"),console.assert("Mochila"===t[0].nombre,"❌ Error: Nombre del producto incorrecto"),console.assert("$20"===t[0].precio,"❌ Error: Precio del producto incorrecto"),console.log("✅ Prueba testAgregarProducto pasada")}function c(){(t=[{nombre:"Bolso",precio:"$30"}]).splice(0,1),console.assert(0===t.length,"❌ Error: No se elimin\xf3 el producto del carrito"),console.log("✅ Prueba testEliminarProducto pasada")}function n(){t=[{nombre:"Zapato",precio:"$50"},{nombre:"Reloj",precio:"$100"}],t=[],console.assert(0===t.length,"❌ Error: No se vaci\xf3 el carrito correctamente"),console.log("✅ Prueba testVaciarCarrito pasada")}e.forEach(e=>{e.addEventListener("click",e=>{let r=e.target.parentElement,a=r.querySelector("h3").textContent,c=r.querySelector(".precio").textContent;t.push({nombre:a,precio:c}),o()})}),a(),c(),n()});

document.addEventListener("DOMContentLoaded", async () => {
    const productosContainer = document.querySelector("#productos");

    try {
        const response = await fetch("http://localhost:3000/productos"); // Llamada a la API
        const productos = await response.json();

        productosContainer.innerHTML = "<h2>Lista de Productos</h2>";

        productos.forEach(producto => {
            let div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p class="precio">$${producto.precio}</p>
                <button data-id="${producto.id}">Añadir al carrito</button>
            `;
            productosContainer.appendChild(div);
        });

    } catch (error) {
        console.error("❌ Error al obtener productos:", error);
    }
});

