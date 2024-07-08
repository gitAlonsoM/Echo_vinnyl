// tienda\static\JS\carrito.js
document.addEventListener('DOMContentLoaded', function() {
    const carritoItems = document.getElementById('carrito-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Cargar carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Funcion encargada de calcular el precio total de los álbumes en el carrito y actualizar la visualización del precio total.
    function actualizarTotal() {
        totalPrice = carrito.reduce((sum, album) => sum + album.price, 0);
        totalPriceElement.textContent = totalPrice;
    }

    function agregarItemAlCarrito(album) {
        const row = document.createElement('tr');
        const coverCell = document.createElement('td');
        coverCell.className = 'caratula-col';
        const coverImg = document.createElement('img');
        coverImg.src = album.cover || '../imagenes/Portada_NoFound.png';
        coverImg.alt = 'Album Cover';
        coverImg.style.width = '80px';
        coverCell.appendChild(coverImg);
        row.appendChild(coverCell);

        const albumCell = document.createElement('td');
        albumCell.textContent = album.title;
        row.appendChild(albumCell);

        const añoCell = document.createElement('td');
        añoCell.textContent = album.releaseYear;
        row.appendChild(añoCell);

        const artistCell = document.createElement('td');
        artistCell.textContent = album.artist;
        row.appendChild(artistCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${album.price}`;
        row.appendChild(priceCell);

        const actionsCell = document.createElement('td');
        actionsCell.className = 'acciones-col';
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger';
        removeButton.innerHTML = '<span class="long-text">Eliminar</span><span class="short-text">X</span>';
        removeButton.addEventListener('click', function() {
            const index = carrito.indexOf(album);
            if (index > -1) {
                carrito.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                carritoItems.removeChild(row);
                actualizarTotal();
            }
        });
        actionsCell.appendChild(removeButton);
        row.appendChild(actionsCell);

        carritoItems.appendChild(row);
    }

    carrito.forEach(album => agregarItemAlCarrito(album));
    actualizarTotal();
});

// Función para añadir al carrito desde otras páginas
function agregarAlCarrito(album) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(album);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
