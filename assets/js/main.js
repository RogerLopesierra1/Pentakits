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


for(let producto of data){

    if(producto.nivel === 1){
        productosInicial =  productosInicial +  `<div class="container-item">
                                                    <figure>
                                                        <img src="${producto.image}" alt="${producto.titulo+'/'+producto.id}">
                                                    </figure>
                                                    <div class="info-producto">
                                                        <h2 class="producto-name">${producto.titulo}</h2>
                                                        <span class="producto-precio">$${producto.precio}</span>
                                                        <h3 class="producto-description">${producto.descripcion}</h3>
                                                        <a href="detalle-producto.html" class="btn-ver-mas" >Ver más </a>
                                                    </div>
                                                </div>
                                            `;
    }


}

productosInicial += `</div>`;

for(let producto of data){
    if(producto.nivel === 2){

    productosPrimario =  productosPrimario +  `<div class="container-item">
                                                    <figure>
                                                        <img src="${producto.image}" alt="${producto.titulo+'/'+producto.id}">
                                                    </figure>
                                                    <div class="info-producto">
                                                        <h2 class="producto-name">${producto.titulo}</h2>
                                                        <span class="producto-precio">$${producto.precio}</span>
                                                        <h3 class="producto-description">${producto.descripcion}</h3>
                                                        <a href="detalle-producto.html" class="btn-ver-mas" >Ver más </a>
                                                    </div>
                                                </div>
                                            `;
    }
    
}

productosPrimario += `</div>`;


for(let producto of data){

    if(producto.nivel === 3){
        productosSecundario =  productosSecundario +  `<div class="container-item">
                                                            <figure>
                                                                <img src="${producto.image}" alt="${producto.titulo+'/'+producto.id}">
                                                            </figure>
                                                            <div class="info-producto">
                                                                <h2 class="producto-name">${producto.titulo}</h2>
                                                                <span class="producto-precio">$${producto.precio}</span>
                                                                <h3 class="producto-description">${producto.descripcion}</h3>
                                                                <a href="detalle-producto.html" class="btn-ver-mas" >Ver más </a>
                                                            </div>
                                                        </div>
                                                        `;

    }
}

productosSecundario += `</div>`;

document.querySelector(".productos-inicial").innerHTML = productosInicial;
document.querySelector(".productos-primario").innerHTML = productosPrimario;
document.querySelector(".productos-secundario").innerHTML =  productosSecundario;

