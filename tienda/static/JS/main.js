//tienda\static\JS\main.js

//localStorage.clear();

//* Variables Globales
let cantidad = 16;    // Variable global para la cantidad de albumes a mostrar
let banda = "Michael Jackson";  // Variable global para la banda inicial de carga
let contador = 0; // usada para test en consola
let albumActual; // Objeto vacio para almacenar el álbum actual mostrado en el modal
const valorConstante = 20; // Valor constante para calcular el precio
const precioPorDefecto = 39000; // Precio por defecto si no hay fecha de lanzamiento

/* 
Segun la pagina html cargara distinto contenido por defecto
*/
function configurarBandaInicial() {
    const flagValue = document.querySelector('.flag').textContent;  // Selecciona el primer elemento con la clase 'flag'

    if (flagValue === "index"){
        banda = "Bob Marley"; 
    }else if (flagValue === "nuevos"){
        banda = "Led Zeppelin";
    }else if (flagValue === "usados"){
        banda = "Vader";
    }else{
        banda = "Michael Jackson";
    }
}

//* Evento 'DOMContentLoaded' se dispara automaticamente despues de que el html haya cargado
document.addEventListener('DOMContentLoaded', function() {

    //* Referencias a elementos del DOM
    const searchForm = document.getElementById('searchForm');
    const bandaInput = document.getElementById('bandaInput');
    const containerPrincipal = document.getElementById('albums-container');
    const modalAddToCart = document.getElementById('modalAddToCart');

    configurarBandaInicial();

    modalAddToCart.addEventListener('click', function() {
        agregarAlCarrito({
            title: albumActual.title,
            artist: albumActual.artist,
            releaseYear: albumActual.releaseYear,
            price: albumActual.price,
            cover: albumActual.cover // Añadir la carátula
        });
        alert('Álbum añadido al carrito');
    });

    //* Funcion encargada de crear dinamicamente cada card de los albumes, ademas de utilizar como img la portada del album
    function createCard(album, containerPrincipal) {

        const columnContainer = document.createElement('div'); // Cada card sera enviada a un div que tiene clases enfocadas en la responsividad
        columnContainer.className = 'col-6 col-lg-4 col-xl-3 mb-4'; // La tarjeta tomará la mitad del espacio disponible en pantallas pequeñas (col-6) un tercio en pantallas medianas (col-lg-4), y un cuarto en pantallas grandes (col-xl-3).

        const card = document.createElement('div'); // div con clase "card" para dar el comportamiento esperado
        card.className = 'card card-custom-shadow';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.alt = 'Album Cover';
        img.style.height = '300px';
        img.src = '/static/imagenes/Portada_NoFound.png'; 

        // Peticion a coverartarchive usando el "id" del album ingresado para obtener la img de portada
        fetch(`https://coverartarchive.org/release-group/${album.id}`) // Realiza solicitud HTTP a ...
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Imagen no encontrada para ID:", album.id);
                throw new Error('Imagen no encontrada');  // No interrumpe el flujo
            }
        })
        .then(coverData => { // Los datos JSON obtenidos de la respuesta
            if (coverData.images.length > 0) { // Si hay al menos 1 imagen recibida en los datos
                img.src = coverData.images[0].image; // primera imagen del array de imagenes
            }
        })
        .catch(() => {
            img.src = '/static/imagenes/Portada_NoFound.png'; 
        });

        const cardBody = document.createElement('div'); // En card-body se especifica lo que tendra cada card
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = album.title;

        const artist = document.createElement('p');
        artist.className = 'card-text';
        artist.textContent = album['artist-credit'].map(artist => artist.name).join(', ');

        let priceValue = precioPorDefecto;
        let releaseYear = 'N/A';
        if (album['first-release-date']) {
            releaseYear = album['first-release-date'].split('-')[0];
            if (releaseYear) {
                priceValue = releaseYear * valorConstante;
            }
        }

        const listGroup = document.createElement('ul');
        listGroup.className = 'list-group list-group-flush';

        const price = document.createElement('li');
        price.className = 'list-group-item';
        price.textContent = `$${priceValue}`;
        listGroup.appendChild(price);

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer'; // Espacio usado para añadir los enlaces de compra

        const detallesBtn = document.createElement('a');
        detallesBtn.href = '#';
        detallesBtn.className = 'card-link';
        detallesBtn.textContent = 'Ver detalles';
        detallesBtn.addEventListener('click', function(event) {
            event.preventDefault();
            mostrarDetalles(album, img.src); // Pasar la carátula al modal
        });

        const addCarrito = document.createElement('a');
        addCarrito.href = '#';
        addCarrito.className = 'card-link';
        addCarrito.textContent = 'Añadir al carro';
        addCarrito.addEventListener('click', function(event) {
            event.preventDefault();
            agregarAlCarrito({
                title: album.title,
                artist: album['artist-credit'].map(artist => artist.name).join(', '),
                releaseYear: releaseYear,
                price: priceValue,
                cover: img.src // Añadir la carátula
            });
            alert('Álbum añadido al carrito');
        });

        cardBody.appendChild(title);
        cardBody.appendChild(artist);
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(listGroup);
        cardFooter.appendChild(detallesBtn);
        cardFooter.appendChild(addCarrito);
        card.appendChild(cardFooter);
        columnContainer.appendChild(card);
        containerPrincipal.appendChild(columnContainer);

        test(album);
    }

    // Funcion encargada de mostrar los detalles de cada album
    function mostrarDetalles(album, cover) {
        const modalAlbumTitle = document.getElementById('modalAlbumTitle');
        const modalArtistName = document.getElementById('modalArtistName');
        const modalReleaseYear = document.getElementById('modalReleaseYear');

        let priceValue = precioPorDefecto;
        let releaseYear = 'N/A';
        if (album['first-release-date']) {
            releaseYear = album['first-release-date'].split('-')[0];
            if (releaseYear) {
                priceValue = releaseYear * valorConstante;
            }
        }

        //Añadiendole propiedades(claves) y valores al objeto "albumActual"
        albumActual = {
            title: album.title,
            artist: album['artist-credit'].map(artist => artist.name).join(', '),
            releaseYear: releaseYear,
            price: priceValue,
            cover: cover // Añadir la carátula
        };

        modalAlbumTitle.textContent = album.title;
        modalArtistName.textContent = album['artist-credit'].map(artist => artist.name).join(', ');
        modalReleaseYear.textContent = releaseYear; // Mostrar el año o N/A

        const detallesModal = new bootstrap.Modal(document.getElementById('detallesModal'));
        detallesModal.show();
    }

    //* Funcion encargada de traer via api los datos de los albumes segun el input por defecto y/o por el usuario
    /*  - Limpia el contenedor de albumes para nuevas búsquedas.
        - Recupera datos de Local Storage */
    function fetchAndDisplayAlbums() {

        containerPrincipal.innerHTML = '';
        const albumCardsContainer = document.createElement('div');
        albumCardsContainer.className = 'row'; // preparando al div para tener comportamiendo de tarjeta con boostrap
        
        contador = 0;
        console.clear();  // Limpia la consola
        
        console.log(cantidad);
        
        //* Uso de local storage
        //* Paso 1: Recuperar datos del Local Storage
        var storedAlbums = localStorage.getItem(banda);

        if (storedAlbums) {
            //* Paso 2: Si los datos existen, parsearlos y usarlos directamente
            const albums = JSON.parse(storedAlbums);
            albums.forEach(album => {
                createCard(album, albumCardsContainer);
            });
            containerPrincipal.appendChild(albumCardsContainer);
        } else {
            //* Paso 3: Si no hay datos en el Local Storage, hacer la solicitud a la API
                /* Solicitud HTTP a la API de MusicBrainz. fmt=json Se especifica que deben ser en formato JSON */
            fetch(`https://musicbrainz.org/ws/2/release-group/?query=artist:${banda} AND primarytype:album&limit=${cantidad}&fmt=json`)
            .then(response => response.json())  // &limit=100&
            .then(data => { 
                /* 
                'release-groups' contiene un array de álbumes. 
                Se recorre y en cada iteracion se le envia como parametros sus datos a createCard()
                */
                data['release-groups'].forEach(album => {
                    createCard(album, albumCardsContainer);
                });
                containerPrincipal.appendChild(albumCardsContainer);

                // Paso 4: Guardar los datos en Local Storage para uso futuro
                localStorage.setItem(banda, JSON.stringify(data['release-groups']));
            })
            .catch(error => {
                console.error('Error data:', error);
            });
        }
    }

    //* Funcion de evento de envio del input de busqueda
    /* Obtiene el valor ingresado por el usuario (nombre de la banda).
       Llama a fetchAndDisplayAlbums() para cargar y mostrar los álbumes de la banda especificada.  */
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        banda = bandaInput.value.trim(); // Actualiza la variable global 'banda' con el valor ingresado por el usuario
        fetchAndDisplayAlbums();
    });

    fetchAndDisplayAlbums();  
});

// Función para añadir al carrito desde otras páginas
function agregarAlCarrito(album) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(album);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

//____________________________

// Funcion de prueba para acceder a más elementos.
function test(album) {
    contador++;
    
    console.log(` =============  Album ${contador} ==============`);
    console.log("Album completo", album);
    console.log("___________");
    console.log("ID:", album.id);
    console.log("___________");
    console.log("Artist name:", album['artist-credit'][0].name);
    console.log("___________");
    console.log("Title album:", album.title);
    console.log("___________");
    console.log("First Release Date:", album['first-release-date']);
    console.log("___________");
    console.log("Primary Type:", album['primary-type']);
    console.log(" ");
    console.log("==================================================");
}


//____________________________________________________________________________









  

/*
*DOCUMENTACION API: 
https://musicbrainz.org/doc/MusicBrainz_API
https://musicbrainz.org/doc/Cover_Art_Archive/API
*API img de albunes: coverartarchive.org


*FILTRAR POR BANDAS
fetch('https://musicbrainz.org/ws/2/release-group/?query=artist:Beatles AND primarytype:album&limit=100&fmt=json')
fetch('https://musicbrainz.org/ws/2/release-group/?query=artist:Queen AND primarytype:EP&limit=100&fmt=json')
fetch('https://musicbrainz.org/ws/2/release-group/?query=artist:Radiohead AND date:2000&limit=100&fmt=json')
fetch('https://musicbrainz.org/ws/2/release-group/?query=artist:Coldplay AND date:2000&limit=100&fmt=json')


*FILTRAR POR GENEROS
fetch('https://musicbrainz.org/ws/2/release-group/?query=tag:rock&limit=100&fmt=json')
fetch('https://musicbrainz.org/ws/2/release-group/?query=tag:jazz&limit=100&fmt=json')
fetch('https://musicbrainz.org/ws/2/release-group/?query=tag:hip-hop&limit=100&fmt=json')
fetch('https://musicbrainz.org/ws/2/release-group/?query=tag:electronic&limit=100&fmt=json')


*/



/*
*CODIGO ESTATICO HTML BOOSTRAP PARA GENERAR 1 TARJETA 

<div class="container mt-5">
        <!-- Contenedor de la fila de tarjetas -->
        <div class="row">


            <!-- Tarjeta individual -->
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card">
                    <img src="https://via.placeholder.com/150" class="card-img-top" alt="Album Cover">
                    <div class="card-body">
                        <h5 class="card-title">Título del Álbum</h5>
                        <p class="card-text">Descripción del álbum o información del artista.</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Precio: $35.00</li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link">Comprar</a>
                            <a href="#" class="card-link">Añadir al carro</a>
                        </div>
                    </div>
                </div>
            </div>
            


            <!-- Tarjeta individual -->
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card">
                    <img src="https://via.placeholder.com/150" class="card-img-top" alt="Album Cover">
                    <div class="card-body">
                        <h5 class="card-title">Título del Álbum</h5>
                        <p class="card-text">Descripción del álbum o información del artista.</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Precio: $35.00</li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link">Comprar</a>
                            <a href="#" class="card-link">Añadir al carro</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

*/


/* 
DIFERENCIA ENTRE OBJETO Y VARRAY

Objeto (Object): Una colección de propiedades, donde cada propiedad tiene un nombre (clave) y un valor. Los objetos se utilizan para representar entidades complejas con múltiples atributos.

Arreglo (Array): Una colección ordenada de valores, donde cada valor tiene un índice numérico. Los arreglos se utilizan para almacenar listas de elementos.


Objeto:
Claves son cadenas (o símbolos) que nombran las propiedades.
Valores pueden ser cualquier tipo de dato (números, cadenas, funciones, otros objetos, etc.).
Orden de las propiedades no es garantizado.


Arreglo:
Índices son numéricos y ordenados.
Valores pueden ser cualquier tipo de dato.
Tiene métodos específicos para manipulación (push, pop, shift, etc.).

*/