const Producto = require('/Users/Vaneesa/Desktop/Archivos U/4 Semestre UMB/Diseño web 1/Codigos/T1 Pagina web/models/Producto');

async function insertarProductos() {
    await Producto.bulkCreate([
        { nombre: 'Bolso verde', descripcion: 'Bolso de cuero verde esmeralda', precio: 500000, imagen: '/Public/Imagenes/Bolso1.jpg' },
        { nombre: 'Bolso marrón', descripcion: 'Bolso de cuero marrón', precio: 250000, imagen: '/Public/Imagenes/Bolso2.jpg' },
        { nombre: 'Bolso azul', descripcion: 'Bolso de cuero azul', precio: 200000, imagen: '/Public/Imagenes/Bolso3.jpg' },
        { nombre: 'Bolso rojo', descripcion: 'Bolso de cuero rojo', precio: 150000, imagen: '/Public/Imagenes/Bolso4.jpg' },
        { nombre: 'Bolsos promoción', descripcion: 'Bolso y cartuchera azul', precio: 189999, imagen: '/Public/Imagenes/Bolso5.jpg' }
    ]);
    console.log('Productos insertados correctamente.');
}

insertarProductos();
