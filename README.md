# Conjunto de Herramientas Web
Coleccion de herramientas utiles para desarrolladores, TI y tareas administrativas, con interfaz moderna y uso 100% local en el navegador.

<img width="1304" height="938" alt="Captura de pantalla 2026-02-01 221204" src="https://github.com/user-attachments/assets/28c565db-181e-4223-99ca-9339cc20dafc" />

# Caracteristicas
- Interfaz moderna con Bootstrap 5
- Temas claro y oscuro intercambiables
- Sistema de favoritos para acceso rapido
- Diseno responsivo para todos los dispositivos
- Herramientas que funcionan localmente sin servidor (salvo utilidades PDF)

# Herramientas incluidas

## Seguridad y encriptacion
- Conversor Base64 el cual codifica y decodifica texto
- Decodificador JWT que muestra el contenido del token
- Generador de hashes del tipo MD5, SHA-1, SHA-256 y SHA-512
- Generador de contrasenas con opciones personalizables
- Verificador de certificados TLS con detalles de fechas, algoritmo y tamano de clave

## Documentos y PDF
- Formateador JSON para verificar valia, formatear y minificar
- Formateador SQL de estructura de consultas (MySQL/PostgreSQL)
- Conversor JSON a CSV y CSV a JSON
- Compresor de PDF el cual rasteriza (encoge) paginas en Canvas para reducir peso
- Divisor y unificador de PDF el cual une archivos o separa por rango
- Firmador visual de pdf el que permite inserta imagenes de firma (no criptografica)
- Generador de datos fake para pruebas de personas, RUT valido, correos, telefonos y direcciones

## Imagenes
- Compresor de imagenes reduce tamaño
- Conversor de imagenes en formatos JPG, PNG, WebP, AVIF

## Texto
- Contador de texto de caracteres, palabras, parrafos, lineas y mas

## Generadores
- Generador UUID v4
- Generador de RUT chileno

# Requisitos para utilidades PDF
Las herramientas de PDF requieren abrir el proyecto con un servidor local no funciona con solo abrir el index.html, debido a la seguridad de los navegadores modernos, por restricciones de seguridad (CORS) los navegadores modernos bloquean cualquier intento de un script para leer archivos desde el almacenamineto si la página se abrio con file://, esto evita que sitios maliciosos roben datos locales.

# Instalacion y uso
1. Clona este repositorio.
2. Ejecuta uno de los scripts de arranqye del servidor local (para que funcione correctamente las utilidadades para PDF):
	- Windows PowerShell: `arrancar-server.ps1`
	- Windows CMD: `arrancar-server.cmd`
	- Linux/Mac: `./arrancar-server.sh`
3. Abre `http://localhost:5500` en el navegador.

NOTA: puedes abrir directamente el index.html pero tendras problemas con las herramientas para trabajar y generar PDFs

# Capturas
<img width="1310" height="939" alt="Captura de pantalla 2026-02-01 221212" src="https://github.com/user-attachments/assets/19ea5d71-d6c5-45d1-aedf-158b5a7d0003" />
<img width="1304" height="937" alt="Captura de pantalla 2026-02-01 221219" src="https://github.com/user-attachments/assets/9f4cb4d0-ef38-4ec3-9d0f-a457969264a5" />
<img width="1313" height="944" alt="Captura de pantalla 2026-02-01 221227" src="https://github.com/user-attachments/assets/ae6576af-3a5c-496c-9085-df84c3662abe" />
<img width="1064" height="816" alt="Captura de pantalla 2026-02-01 221305" src="https://github.com/user-attachments/assets/68d02d2a-42fa-4493-a826-ac5a31b070f6" />
<img width="1053" height="622" alt="Captura de pantalla 2026-02-01 221310" src="https://github.com/user-attachments/assets/00f59424-19be-4cf6-87e6-5805c0423d89" />

# Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- PDF.js (version minima local)
- jsPDF (version minima local)

# Personalizacion
- tema claro y oscuro.
- favoritos que se pueden marcar las herramientas para acceso rapido.
