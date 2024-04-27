

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

let genero = "classic";
let cantidad = 50;

// JS: Asegúrate de tener un contenedor con id "albums-container" en tu HTML
fetch(`https://musicbrainz.org/ws/2/release-group/?query=tag:${genero}&limit=${cantidad}&fmt=json`)
.then(response => response.json())
.then(data => {
    const albumsContainer = document.getElementById('albums-container'); 
    albumsContainer.innerHTML = ''; // Limpiar el contenedor

    // Crear la estructura de fila que contiene todas las tarjetas
    const row = document.createElement('div');
    row.className = 'row';

    data['release-groups'].forEach(album => {
        // Contenedor para cada tarjeta, con clases de columna de Bootstrap
        const colDiv = document.createElement('div');
        colDiv.className = 'col-6 col-lg-4 col-xl-3 border mb-4';

        // Estructura de la tarjeta
        const card = document.createElement('div');
        card.className = 'card';

        // Agregamos la imagen
        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.alt = 'Album Cover';        
        img.style.height = '300px'; // Establece la altura de la imagen
        img.src = 'https://via.placeholder.com/150'; // Imagen por defecto o desde API si está disponible

        // Intento de obtener la imagen de portada del álbum
        fetch(`https://coverartarchive.org/release-group/${album.id}`)
        .then(response => response.json())
        .then(coverData => {
            if (coverData.images && coverData.images.length > 0) {
                img.src = coverData.images[0].image;
            } else {
                img.src ='https://via.placeholder.com/150'; // Imagen de relleno si no hay imagen disponible
            }
        })
        .catch(() => {
            img.src = 'https://via.placeholder.com/150'; // Imagen de relleno si ocurre un error al obtener la imagen
        });

        // Cuerpo de la tarjeta
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = album.title;

        const artist = document.createElement('p');
        artist.className = 'card-text';
        artist.textContent = album['artist-credit'].map(artist => artist.name).join(', ');

        // Lista de grupo para el precio
        const listGroup = document.createElement('ul');
        listGroup.className = 'list-group list-group-flush';
        
        const price = document.createElement('li');
        price.className = 'list-group-item';
        price.textContent = '$20.000';

        listGroup.appendChild(price);

        // Pie de la tarjeta para los botones
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

        // Construir la tarjeta
        cardBody.appendChild(title);
        cardBody.appendChild(artist);
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(listGroup);
        cardFooter.appendChild(buyButton);
        cardFooter.appendChild(addToCartButton);
        card.appendChild(cardFooter);

        // Añadir la tarjeta a la columna y luego la columna a la fila
        colDiv.appendChild(card);
        row.appendChild(colDiv);
    });

    // Añadir la fila al contenedor
    albumsContainer.appendChild(row);
})
.catch(error => {
    console.error('Error fetching data:', error);
    const errorContainer = document.createElement('div');
    errorContainer.textContent = 'Failed to load album data. Please try again later.';
    albumsContainer.appendChild(errorContainer);
});
