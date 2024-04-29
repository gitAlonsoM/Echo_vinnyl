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
DISEÑO ARREGLADO
VALIDACIONES de los FORM POR JS
MAMEJO DE HTML POR JQERY
CONSUMO DE 2 APIS
USO DE LOCAL STORAGE
*/
 

let genero = "rock";  // Variable global para el genero
let cantidad = 20;    // Variable global para la cantidad de albumes a mostrar

let banda = "pink floyd"; 


document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const generoInput = document.getElementById('genreInput');
    const bandaInput = document.getElementById('bandaInput');
    const albumsContainer = document.getElementById('albums-container');

    function createCard(album, albumsContainer) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-6 col-lg-4 col-xl-3 border mb-4';

        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.alt = 'Album Cover';
        img.style.height = '300px';
        img.src = 'imagenes/Portada_NoFound.png';

        fetch(`https://coverartarchive.org/release-group/${album.id}`)
        .then(response => response.json())
        .then(coverData => {
            if (coverData.images.length > 0) {
                img.src = coverData.images[0].image;
            } else {
                img.src = 'imagenes/Portada_NoFound.png';
            }        })
        .catch(() => {
            img.src = 'imagenes/Portada_NoFound.png';
        });

        const cardBody = document.createElement('div');
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
        cardFooter.className = 'card-body';

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
        colDiv.appendChild(card);
        albumsContainer.appendChild(colDiv);
    }

    function fetchAndDisplayAlbums(genre) {
        albumsContainer.innerHTML = '';
        const row = document.createElement('div');
        row.className = 'row';

        /* agregar local storage */
        //fetch(`https://musicbrainz.org/ws/2/release-group/?query=artist:${banda} AND primarytype:album&limit=${cantidad}&fmt=json`)
        fetch(`https://musicbrainz.org/ws/2/release-group/?query=tag:${genre}&limit=${cantidad}&fmt=json`)
        .then(response => response.json())
        .then(data => {
            data['release-groups'].forEach(album => {
                createCard(album, row);
            });
            albumsContainer.appendChild(row);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const errorContainer = document.createElement('div');
            errorContainer.textContent = 'Failed to load album data. Please try again later.';
            albumsContainer.appendChild(errorContainer);
        });
    }

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        genero = generoInput.value.trim();  // Actualizar la variable global 'genero' con el valor ingresado por el usuario
        
        //banda = bandaInput.value.trim();  // Actualizar la variable global 'BANDA' con el valor ingresado por el usuario

        if (genero) {
            fetchAndDisplayAlbums(genero);
        }

        /* if (banda) {
            fetchAndDisplayAlbums(banda);
        }
        */
    });

    fetchAndDisplayAlbums(genero);  // Cargar albumes del genero inicial usando la variable global 'genero'
});



//______________________________________

//VALIDACION FORMULARIO CREAR CUENTA

let userName  = document.getElementById('username');
let pass1 = document.getElementById('password');
let pass2 = document.getElementById('confirm-password');
   
function btn_crear_cuenta(){
    
    console.log(userName.value)
    console.log(userName.value.length)

    console.log(pass1.value)
    console.log(pass2.value)

    let acc = 0;

    //validar nombre
    if (userName.value.length < 6 ){
            alert("Debe contener al menos 6 caracteres");
    }else{
        //alert("Formato correcto");
        acc+=1;
    }


    //validar pass
    if (pass1.value.length < 6 ){
        alert("Debe contener al menos 6 caracteres la pass");
    }else{
        //alert("Formato correcto");
        if (pass1.value === pass2.value ){
            alert("Las contraseñas son iguales");
            acc+=1;
        }else{
            alert("Las contraseñas son diferentes");
        }
    }
   


    //validar email
    // Get our input reference.
    var emailField = document.getElementById('user-email');       
    // Define our regular expression.
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;  
  
    // Using test we can check if the text match the pattern
    if( validEmail.test(emailField.value) ){
          //alert('Email is valid, continue with form submission');
          acc+=1;
    }else{
          alert('Email es invalido, ingrese un email correcto');
    }


    if (acc === 3){
        alert("La cuenta a sido creada satisfactoriamente")
        
    }else{
        alert("la cuenta no ha sido creada")
    }
    

}




  

