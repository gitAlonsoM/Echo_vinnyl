## Nombre del Proyecto: Echo Vinyl
Descripción General
Echo Vinyl es una aplicación web diseñada para ofrecer una experiencia de compra de vinilos a través de una interfaz moderna y funcional. Los usuarios pueden explorar vinilos nuevos y usados, crear cuentas, iniciar sesión, enviar consultas a través de un formulario de contacto y eliminar mensajes resueltos. La aplicación está desarrollada con Django y Bootstrap, proporcionando una experiencia de usuario atractiva y dinámica.

# Funcionalidades Principales
Página de Inicio:

Carrusel de Imágenes: Muestra varias imágenes de vinilos para captar la atención del usuario.
Formulario de Búsqueda: Permite a los usuarios buscar vinilos por nombre de banda o título del álbum.
Tarjetas de Álbumes: Muestra una lista dinámica de álbumes cargados a través de dos APIs.
Modal para Crear Cuenta e Iniciar Sesión:

Crear Cuenta: Formulario para que los usuarios se registren en la aplicación, con validaciones de nombre de usuario, correo electrónico y contraseña.
Iniciar Sesión: Formulario para que los usuarios registrados puedan acceder a sus cuentas.
Cerrar Sesión: Opción para que los usuarios cierren sesión, con un mensaje de confirmación de cierre de sesión exitoso.
Navegación:

Barra de Navegación: Enlaces a diferentes secciones del sitio incluyendo inicio, vinilos nuevos, vinilos usados, acerca de, contacto y carrito.
Página de Contacto:

Formulario de Contacto: Permite a los usuarios enviar consultas o mensajes a la tienda con validaciones de nombre, correo electrónico, teléfono, asunto y mensaje.
Manejo de Errores: Si el correo electrónico ya está registrado, se muestra un mensaje de error sin que la aplicación se caiga.
Mensaje de Éxito: Al enviar el formulario correctamente, se muestra un mensaje de éxito en la misma página sin redirigir automáticamente.
Visualización de Datos de Contacto:

Página de Visualización: Muestra una tabla con los datos ingresados a través del formulario de contacto. Esta página es accesible solo por el administrador desde la barra de navegación.
Eliminar Mensajes: El administrador puede eliminar mensajes resueltos, permitiendo que los correos electrónicos previamente usados puedan ser reutilizados para nuevos mensajes.
Páginas Adicionales:

Vinilos Nuevos: Muestra una lista de vinilos nuevos disponibles.
Vinilos Usados: Muestra una lista de vinilos usados disponibles.
Acerca de: Información sobre la tienda y su misión.
Carrito: Permite a los usuarios ver y gestionar los artículos que han agregado a su carrito de compras.


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
└── manage.py
