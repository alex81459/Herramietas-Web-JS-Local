# Conjunto de Herramientas Web
Coleccion de herramientas utiles para desarrolladores, profesionales de TI y tareas administrativas, todas las herramientas funcionan localmente en el navegador con interfaz moderna y responsive, garantizando privacidad y seguridad de datos en local.

<img width="1304" height="938" alt="Captura de pantalla 2026-02-01 221204" src="https://github.com/user-attachments/assets/28c565db-181e-4223-99ca-9339cc20dafc" />

# Caracteristicas principales

 - Interfaz moderna diseño basado en Bootstrap 5 con componentes responsivos  
 - Temas intercambiables modo claro y oscuro para mayor comodidad visual  
 - Sistema de favoritos marca herramientas frecuentes para acceso rapido  
 - Diseño responsive compatible con dispositivos moviles, tablets y escritorio  
 - Privacidad total procesamiento 100% local, sin envio de datos a servidores  
 - Sin instalacion funciona directamente desde el navegador  
 - 23+ herramientas amplia coleccion organizada por categorías

# Herramientas incluidas
## Seguridad y encriptacion
- Conversor Base64 codifica y decodifica texto en formato Base64 para transferir datos binarios.
- Decodificador JWT analiza y decodifica tokens JWT mostrando headers, payload y verificando la estructura.
- Generador de hashes genera hashes MD5, SHA-1, SHA-256 y SHA-512 para verificación de integridad de datos.
- Generador de contraseñas crea contraseñas seguras con opciones personalizables de longitud, caracteres especiales, numeros y mayúsculas.
- Verificador de certificados TLS analiza certificados SSL/TLS mostrando fechas de validez, algoritmo de cifrado, tamaño de clave y cadena de confianza.

## Documentos, archivos y PDF
- Formateador JSON valida, formatea y minifica archivos JSON con detección de errores de sintaxis.
- Formateador SQL estructura y embellece consultas SQL para MySQL y PostgreSQL con indentacion automatica.
- Conversor JSON a CSV convierte bidireccional entre formatos JSON y CSV preservando la estructura de datos.
- Compresor de PDF reduce el tamaño de archivos PDF rasterizando paginas en canvas para optimizar el peso.
- Divisor y unificador de PDF une multiples archivos PDF o separa paginas especificas por rangos.
- Firmador visual de PDF inserta imagenes de firma digital en documentos PDF (firma visual pero no criptografica).
- Conversor imagen a PDF convierte multiples imágenes a un solo documento PDF con opciones de formato y calidad.

## Imagenes y multimedia
- Compresor de imagenes reduce el tamaño de archivos de imagen manteniendo calidad visual aceptable.
- Conversor de imagenes convierte entre formatos JPG, PNG, WebP y AVIF con control de calidad.
- Extractor de colores extrae paletas de colores de imágenes con valores hexadecimales, RGB y HSL.
- Redactor de imagenes censura o redacta areas específicas de imágenes para ocultar información sensible.

## Texto y análisis
- Contador de texto analiza texto contando caracteres, palabras, párrafos, lineas y espacios en blanco.

## Calculadoras especializadas
- Calculadora de impresión calcula costos de impresión considerando tipo de impresora, consumo eléctrico, tinta/tóner y desgaste.
- Calculadora de UPS dimensiona sistemas de alimentacion ininterrumpida calculando autonomía, baterías necesarias y tiempo de respaldo.

## Generadores de datos
- Generador UUID v4 crea identificadores unicos universales versión 4 para bases de datos y aplicaciones.
- Generador de RUT chileno genera números de RUT válidos con dígito verificador correcto para pruebas.
- Generador de datos fake crea datos de prueba realistas: nombres, RUTs válidos, emails, teléfonos y direcciones chilenas.

## Sistema y diagnóstico
- Inspector de navegador analiza capacidades del navegador, resolución, idiomas, conexión, hardware y APIs disponibles.

# Instalación y uso

## Opcion 1: Uso directo (Recomendado para herramientas básicas)
Simplemente abre el archivo index.html en tu navegador. 

Limitación: Las herramientas de PDF no funcionarán debido a restricciones CORS de los navegadores modernos.

## Opcion 2: Servidor local (Funcionalidad completa)
Para usar todas las herramientas incluidas las de PDF:

1. descarga este repositorio
2. ejecuta el servidor local usando uno de estos scripts:
   - Windows PowerShell: `.\arrancar-server.ps1`
   - Windows CMD: `arrancar-server.cmd`
   - Linux/Mac: `./arrancar-server.sh`
   - Manualmente: `python -m http.server 5500`
3. Abre `http://localhost:5500` en el navegador

### ¿Por qué necesito servidor para PDF?
Las herramientas de PDF requieren cargar archivos locales lo cual los navegadores modernos bloquean por seguridad cuando se accede via `file://`. El servidor local (`http://`) permite que estas funciones trabajen correctamente sin comprometer la seguridad y bloqueos del navegador.

# Capturas
<img width="1310" height="939" alt="Captura de pantalla 2026-02-01 221212" src="https://github.com/user-attachments/assets/19ea5d71-d6c5-45d1-aedf-158b5a7d0003" />
<img width="1304" height="937" alt="Captura de pantalla 2026-02-01 221219" src="https://github.com/user-attachments/assets/9f4cb4d0-ef38-4ec3-9d0f-a457969264a5" />
<img width="1313" height="944" alt="Captura de pantalla 2026-02-01 221227" src="https://github.com/user-attachments/assets/ae6576af-3a5c-496c-9085-df84c3662abe" />
<img width="1064" height="816" alt="Captura de pantalla 2026-02-01 221305" src="https://github.com/user-attachments/assets/68d02d2a-42fa-4493-a826-ac5a31b070f6" />
<img width="1053" height="622" alt="Captura de pantalla 2026-02-01 221310" src="https://github.com/user-attachments/assets/00f59424-19be-4cf6-87e6-5805c0423d89" />

# Tecnologias utilizadas
- Frontend HTML5, CSS3, JavaScript ES6+
- Framework CSS Bootstrap 5 con Bootstrap Icons
- Librerías PDF PDF.js y jsPDF (versiones locales minificadas)
- Arquitectura Single Page Application (SPA) con módulos JS
- Compatibilidad Navegadores modernos (Chrome, Firefox, Safari, Edge)

# Personalizacion y caracteristicas
- Temas visuales alterna entre modo claro y oscuro con un clic
- Sistema de favoritos marca herramientas frecuentes para crear un acceso rápido personalizado
- Navegación intuitiva menú lateral organizado por categorías con iconos descriptivos
- Responsive design se adapta automáticamente a pantallas de móvil, tablet y desktop
- Preservación de estado las preferencias y favoritos se guardan localmente

# Estructura del proyecto

Herramientas Web/
   index.html              Pagina principal
   arrancar-server       Scripts de inicio del servidor
   css/                    Estilos personalizados
   js/                     Logica principal de la aplicación
   lib/                    Librerias externas
