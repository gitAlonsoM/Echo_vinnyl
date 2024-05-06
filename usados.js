

/* 
DISEÑO ARREGLADO
VALIDACIONES de los FORM POR JS
MANEJO DE HTML POR JQERY
CONSUMO DE 2 APIS
USO DE LOCAL STORAGE
*/
 


//*Variables Globales
//let genero = "pop";  
const cantidad = 15;    // Variable global para la cantidad de albumes a mostrar
let banda = "Michael Jackson";  // Variable global para la banda inicial de carga

let contador = 0; //usada para test en consola

//*Evento 'DOMContentLoaded'se dispara automaticamente 
document.addEventListener('DOMContentLoaded', function() {

    //*Referencias a elementos del DOM
    const searchForm = document.getElementById('searchForm');
    const bandaInput = document.getElementById('bandaInput');
    const containerPrincipal = document.getElementById('albums-container');


    //*Funcion encargada de crear dinamicamente cada card de los albumes, ademas de utilizar como img la portada del album
    function createCard(album, containerPrincipal) {

        const columnContainer = document.createElement('div'); //Cada card sera enviada a un div que tiene clases enfocadas en la responsividad
        columnContainer.className = 'col-6 col-lg-4 col-xl-3 border mb-4'; //La tarjeta tomará la mitad del espacio disponible en pantallas pequeñas (col-6) un tercio en pantallas medianas (col-lg-4), y un cuarto en pantallas grandes (col-xl-3).

        const card = document.createElement('div'); //div con clase "card" para dar el comportamiento esperado
        card.className = 'card card-custom-shadow';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.alt = 'Album Cover';
        img.style.height = '300px';
        img.src = 'imagenes/Portada_NoFound.png';  // Imagen predeterminada
        

        //Peticion a coverartarchive usando el "id" del album ingresado para obtener la img de portada
        fetch(`https://coverartarchive.org/release-group/${album.id}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Imagen no encontrada para ID:", album.id);
                throw new Error('Imagen no encontrada');  // No interrumpe el flujo
            }
        })
        .then(coverData => {
            if (coverData.images.length > 0) {
                img.src = coverData.images[0].image;
            }
        })
        .catch(() => {
            img.src = 'imagenes/Portada_NoFound.png';  // Mantiene la imagen predeterminada en caso de error
        });


        const cardBody = document.createElement('div'); //En card-body se especifica lo que tendra cada card
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = album.title;

        const artist = document.createElement('p');
        artist.className = 'card-text';
        artist.textContent = album['artist-credit'].map(artist => artist.name).join(', ');

        const listGroup = document.createElement('ul');
        listGroup.className = 'list-group list-group-flush';

        const price = document.createElement('li');
        price.className = 'list-group-item';
        price.textContent = `$${35000}`;
        listGroup.appendChild(price);

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer'; // Espacio usado para añadir los enlaces de compra


        const buyButton = document.createElement('a');
        buyButton.href = '#';
        buyButton.className = 'card-link';
        buyButton.textContent = 'Comprar';

        const addToCartButton = document.createElement('a');
        addToCartButton.href = '#';
        addToCartButton.className = 'card-link';
        addToCartButton.textContent = 'Añadir al carro';

        cardBody.appendChild(title);
        cardBody.appendChild(artist);
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(listGroup);
        cardFooter.appendChild(buyButton);
        cardFooter.appendChild(addToCartButton);
        card.appendChild(cardFooter);
        columnContainer.appendChild(card);
        containerPrincipal.appendChild(columnContainer);


        
        test(album);
      
   
    }


    //*Funcion encargada de traer via api los datos de los albumes segun el input usado
    /* Limpia el contenedor de albumes para nuevas búsquedas.
        Recupera datos de Local Storage*/
    function fetchAndDisplayAlbums(genre) {

        containerPrincipal.innerHTML = '';
        const albumCardsContainer = document.createElement('div');
        albumCardsContainer.className = 'row'; //preparando al div para tener comportamiendo de tarjeta con boostrap
        
        contador = 0;
        console.clear();  // Limpia la consola



        //*Uso de local storage
        //*Paso 1: Recuperar datos del Local Storage
        var storedAlbums = localStorage.getItem(banda);

        if(storedAlbums){
            //* Paso 2: Si los datos existen, parsearlos y usarlos directamente
            const albums = JSON.parse(storedAlbums);
            albums.forEach(album => {
                createCard(album, albumCardsContainer);
            });
         containerPrincipal.appendChild(albumCardsContainer);
     
        }
        else{
        // *Paso 3: Si no hay datos en el Local Storage, hacer la solicitud a la API
            /*Solicitud HTTP a la API de MusicBrainz. fmt=json Se especifica que deben ser en formato JSON*/
        fetch(`https://musicbrainz.org/ws/2/release-group/?query=artist:${banda} AND primarytype:album&limit=${cantidad}&fmt=json`)
        .then(response => response.json())
        .then(data => { 

            /* 
            'release-groups' contiene un array de álbumes. 
            Se recorre y en cada iteracion se le envia como parametros sus datos a createCard()
            */
            data['release-groups'].forEach(album => {
                //console.log(album);
                createCard(album, albumCardsContainer);
            });
         containerPrincipal.appendChild(albumCardsContainer);

            // Paso 4: Guardar los datos en Local Storage para uso futuro
            localStorage.setItem(banda, JSON.stringify(data['release-groups']));
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const errorContainer = document.createElement('div');
            errorContainer.textContent = 'Failed to load album data. Please try again later.';
         containerPrincipal.appendChild(errorContainer);
        });
        }
 
    }


    //*Funcion de evento de envio del input de busqueda
    /* Obtiene el valor ingresado por el usuario (nombre de la banda).
       Llama a fetchAndDisplayAlbums() para cargar y mostrar los álbumes de la banda especificada.  */
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); //previene la accion de recarga por defecto
        banda = bandaInput.value.trim();  // Actualizar la variable global 'banda' con el valor ingresado por el usuario
    
        if (banda) {
            fetchAndDisplayAlbums(banda);
        }

    });

    //*Carga inicial por defecto de los albumes
    fetchAndDisplayAlbums(banda);  // Cargar albumes de la banda inicial usando la variable global 'banda'
});




//Funcion de prueba para acceder a más elementos.
function test(album){
    contador++;
    
    console.log(` ======  Album ${contador} =========`)
    console.log("Album completo", album)
    console.log("ID:", album.id);
    //);
    console.log("Artist name:", album['artist-credit'][0].name);
    console.log("Title album:", album.title);
    console.log("First Release Date:", album['first-release-date']);
    console.log("Primary Type:", album['primary-type']);

   
    console.log("========================================================")
}



//____________________________________________________________________________



function formCrearCuenta() {
    const form = document.querySelector('#formularioCrearCuenta');  //Selecciona el formulario por su ID
    const userName = document.getElementById('username');
    const userEmail = document.getElementById('user-email');
    const pass1 = document.getElementById('password');
    const pass2 = document.getElementById('confirm-password');

    console.log("Validando formulario...");

    // Validar nombre de usuario
    if (userName.value.length < 6) {
        alert("El nombre de usuario debe contener al menos 6 caracteres");
        return;
    }

    // Validar contraseña
    if (pass1.value.length < 6) {
        alert("La contraseña debe contener al menos 6 caracteres");
        return;
    }
    if (pass1.value !== pass2.value) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Validar email usando expresión regular
    const validEmailPattern = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmailPattern.test(userEmail.value)) {
        alert('El email es inválido, por favor ingresa un email correcto');
        return;
    }

    // Si todas las validaciones son exitosas, enviar el formulario al futuro backend
    form.submit();
    alert("La cuenta ha sido creada satisfactoriamente");
}












  

/*
*DOCUMENTACION API: https://musicbrainz.org/doc/MusicBrainz_API
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
*CODIGO HTML BOOSTRAP PARA GENERAR 1 TARJETA 

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
            <!-- Repetir el bloque de arriba para mas tarjetas -->
        </div>
    </div>

*/