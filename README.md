## Nombre del Proyecto: Echo Vinyl
Descripción General
Echo Vinyl es una aplicación web que ofrece una experiencia de compra de vinilos, tanto nuevos como usados, a través de una interfaz moderna y fácil de usar. Los usuarios pueden explorar una amplia colección de vinilos, crear cuentas, iniciar sesión, enviar consultas mediante un formulario de contacto y gestionar sus mensajes. La aplicación está desarrollada con el framework Django y utiliza SQLite para la gestión de cuentas de usuario y almacenamiento de mensajes. Además, emplea templates que integran JavaScript, junto con estilos CSS y Bootstrap, para proporcionar una experiencia de usuario atractiva y dinámica.


# Funcionalidades Principales

* Funciones Generales:

Carrusel de Imágenes: En la página de inicio, se presenta un carrusel que muestra una rotación de imágenes de vinilos, diseñado para captar la atención del usuario desde el primer momento.

Formulario de Búsqueda: Facilita a los usuarios la búsqueda de vinilos específicos, permitiéndoles filtrar por el nombre de la banda o el título del álbum.

Tarjetas de Álbumes: Muestra una lista dinámica de álbumes obtenidos a través de dos APIs externas. Cada tarjeta incluye el nombre del álbum, el nombre de la banda, el precio, el año de lanzamiento, y ofrece botones para ver detalles del álbum o añadirlo al carrito.


* Gestión de Cuentas:

Crear Cuenta: Proporciona un formulario para que los usuarios puedan registrarse en la plataforma. Incluye validaciones de nombre de usuario, correo electrónico y contraseña, asegurando que cada dirección de correo electrónico sea única por cuenta y que se cumplan restricciones de seguridad en el nombre de usuario y la contraseña.

Iniciar Sesión: Permite a los usuarios registrados acceder a sus cuentas mediante un formulario de inicio de sesión.

Cerrar Sesión: Ofrece una opción para que los usuarios puedan cerrar sesión, con un mensaje de confirmación que asegura que el proceso se ha completado exitosamente.


* Navegación:

Barra de Navegación: Enlaces a diferentes secciones del sitio, incluyendo inicio, vinilos nuevos, vinilos usados, acerca de, contacto y carrito.


* Página de Contacto:

Formulario de Contacto: Permite a los usuarios enviar consultas a la tienda con validaciones de nombre, correo electrónico, teléfono, asunto y mensaje.

Manejo de Errores: Si el correo electrónico ya está registrado, se muestra un mensaje de error sin que la aplicación se caiga.

Mensaje de Éxito: Al enviar el formulario correctamente, se muestra un mensaje de éxito en la misma página.


* Administración de Mensajes:

Visualización de Datos de Contacto: Muestra una tabla con los datos ingresados a través del formulario de contacto, accesible solo por el administrador.

Eliminar Mensajes: El administrador puede eliminar mensajes resueltos, permitiendo que los correos electrónicos previamente usados puedan ser reutilizados.


* Páginas Adicionales:

Vinilos Nuevos: Presenta una lista de vinilos nuevos disponibles para la venta, permitiendo a los usuarios explorar las últimas incorporaciones.

Vinilos Usados: Muestra una selección de vinilos usados en buen estado, ofreciendo a los usuarios opciones más asequibles.

Acerca de: Proporciona información detallada sobre la tienda, incluyendo su historia, compromiso con la música en vinilo y detalles de cómo visitarnos.

Carrito: Permite a los usuarios ver y gestionar los artículos que han agregado a su carrito de compras. Los discos agregados se muestran en una tabla que incluye su carátula, nombre del álbum, año de lanzamiento, nombre del artista y precio. Además, el carrito ofrece opciones para eliminar discos individuales, ver el total de la compra y un botón para proceder con la compra (funcionalidad aún por implementar).


# Requisitos del Sistema
Python 3.x
Django 3.x o superior
Base de datos SQLite (incluida por defecto en Django)
Bootstrap 4.x o superior
JavaScript habilitado en el navegador


# Estructura del Proyecto

├── proyecto_web_django/
│   ├── __pycache__/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── tienda/
│   ├── __pycache__/
│   ├── migrations/
│   │   ├── 0001_initial.py
│   │   ├── 0002_create_admin.py
│   │   └── __init__.py
│   ├── static/
│   │   ├── CSS/
│   │   │   └── style.css
│   │   ├── imagenes/
│   │   │   ├── disco1.jpg
│   │   │   ├── disco2.jpg
│   │   │   ├── disco3.jpg
│   │   │   ├── disco4.jpg
│   │   │   ├── logo.png
│   │   │   ├── patron.png
│   │   │   └── Portada_NoFound.png
│   │   └── JS/
│   │       └── main.js
│   ├── templates/
│   │   └── tienda/
│   │       ├── _modals.html
│   │       ├── acerca.html
│   │       ├── carrito.html
│   │       ├── contacto.html
│   │       ├── index.html
│   │       ├── nuevos.html
│   │       ├── usados.html
│   │       └── visualizacion.html
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── venv/
│   ├── Include/
│   ├── Lib/
│   ├── Scripts/
│   └── pyvenv.cfg
│
├── db.sqlite3
├── manage.py
├── readme.md
└── usuarios.txt


# Iniciar el Servidor de Desarrollo
python manage.py runserver



# Uso
Registro e Inicio de Sesión: Los usuarios deben registrarse y/o iniciar sesión para agregar productos al carrito(funcion a implementar) o enviar mensajes a través del formulario de contacto.

Explorar Vinilos: Navega por las secciones de vinilos nuevos y usados para explorar las opciones disponibles.

Carrito de Compras: Agrega vinilos al carrito y procede a la compra (funcionalidad a implementar).

Administración de Mensajes: Si eres administrador, puedes revisar y gestionar los mensajes de contacto enviados por los usuarios.



