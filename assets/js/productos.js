
// PRODUCTOS DINAMICA 

let productosInicial = `<div class="container-titulos">
                            <h2 class="section-title">Kits de Nivel Inicial</h2>
                            <span class="section-subtitle">¡La introducción perfecta al mundo de la robótica educativa para los más pequeños!</span>
                        </div>
                        <div class="containers-items"> 
                        `;

let productosPrimario = `<div class="container-titulos">
                        <h2 class="section-title">Kits de Nivel Primario</h2>
                        <span class="section-subtitle">La herramienta ideal para que los niños de primaria exploren la tecnología y la robótica de manera divertida y educativa.</span>
                        </div>
                        <div class="containers-items"> 
                        `;


let productosSecundario = `<div class="container-titulos">
                            <h2 class="section-title">Kits de Nivel Secundario</h2>
                            <span class="section-subtitle">Una emocionante puerta de entrada al mundo de la tecnología y la robótica, diseñados para desafiar y cautivar a estudiantes de secundaria mientras desarrollan habilidades esenciales.</span>
                        </div>
                        <div class="containers-items"> 
                        `;


// OBTENEMOS EL VALOR DEL DOLAR POR MEDIO DE LA API 

const URL_GET_DOLAR  =  "https://dolarapi.com/v1/dolares/blue";


fetch(URL_GET_DOLAR)
  .then(response => response.json())
  .then(dataDolar => {
    //console.log(dataDolar.venta)

    // Recorrer el array de productos y convertir los precios a dólares
    data.map(producto => {

        let precioEnDolares = producto.precio / dataDolar.venta;
        //verificamos el nivel de cada producto
        if(producto.nivel == 1){

            
            //console.log(producto.titulo + ' USD ' + precioEnDolares);
            productosInicial = productosInicial + `<div class="container-item">
                                                        <figure>
                                                            <img src="${producto.image}" alt="${producto.titulo+'/'+producto.id}">
                                                        </figure>
                                                        <div class="info-producto">
                                                            <h2 class="producto-name">${producto.titulo}</h2>
                                                            <span class="producto-precio">$ ${producto.precio}</span>
                                                            <span class="producto-precio">USD ${Math.round(precioEnDolares)}</span>
                                                            <h3 class="producto-description">${producto.descripcion}</h3>
                                                            <a href="detalle-producto.html" class="btn-ver-mas" >Ver más </a>
                                                        </div>
                                                    </div>`
                                    
        }

        if(producto.nivel == 2){

        
            //console.log(producto.titulo + ' USD ' + precioEnDolares);
            productosPrimario = productosPrimario + `<div class="container-item">
                                                        <figure>
                                                            <img src="${producto.image}" alt="${producto.titulo+'/'+producto.id}">
                                                        </figure>
                                                        <div class="info-producto">
                                                            <h2 class="producto-name">${producto.titulo}</h2>
                                                            <span class="producto-precio">$ ${producto.precio}</span>
                                                            <span class="producto-precio">USD ${Math.round(precioEnDolares)}</span>
                                                            <h3 class="producto-description">${producto.descripcion}</h3>
                                                            <a href="detalle-producto.html" class="btn-ver-mas" >Ver más </a>
                                                        </div>
                                                    </div>`
        }

        

        if(producto.nivel == 3){

        
            //console.log(producto.titulo + ' USD ' + precioEnDolares);
            productosSecundario = productosSecundario + `<div class="container-item">
                                                            <figure>
                                                                <img src="${producto.image}" alt="${producto.titulo+'/'+producto.id}">
                                                            </figure>
                                                            <div class="info-producto">
                                                                <h2 class="producto-name">${producto.titulo}</h2>
                                                                <span class="producto-precio">$ ${producto.precio}</span>
                                                                <span class="producto-precio">USD ${Math.round(precioEnDolares)}</span>
                                                                <h3 class="producto-description">${producto.descripcion}</h3>
                                                                <a href="detalle-producto.html" class="btn-ver-mas" >Ver más </a>
                                                            </div>
                                                        </div>`
        }

                      
    }).join('');

    productosInicial += `</div>`;
    productosPrimario += `</div>`;
    productosSecundario += `</div>`;

    // Agregar el HTML generado al elemento con el id de cada nivel de los productos
    document.querySelector(".productos-inicial").innerHTML = productosInicial;
    document.querySelector(".productos-primario").innerHTML = productosPrimario;
    document.querySelector(".productos-secundario").innerHTML = productosSecundario;

 
}).catch(error => alert('Ha ocurrido un error al obtener el valor del dólar', error));
 



